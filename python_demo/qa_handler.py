"""
问答处理模块
处理用户的问答请求，集成Ollama本地模型
使用MySQL存储聊天记录
"""

import requests
import json
import pymysql
import pymysql.cursors
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()


class QAHandler:
    """问答处理器 - 集成Ollama DeepSeek-R1模型"""

    def __init__(self, db_config=None):
        """
        初始化问答处理器

        Args:
            db_config (dict): 数据库配置，如果为None则使用默认配置
        """
        # Ollama配置
        self.ollama_base_url = "http://localhost:11434"  # Ollama默认地址
        self.model_name = "deepseek-r1:32b"
        self.session_id = "default"  # 默认会话ID

        # 数据库配置
        if db_config is None:
            self.db_config = {
                'host': 'localhost',
                'user': 'root',
                'password': os.getenv("mysql_password"),
                'database': 'quanzhan_demo',
                'charset': 'utf8mb4',
                'cursorclass': pymysql.cursors.DictCursor
            }
        else:
            self.db_config = db_config

        # 系统提示词
        self.system_prompt = """你是小王，一个专业的电站数据管理系统AI助手。
你的职责是：
1. 帮助用户查询和理解电站数据（系统有5000+条全球电站记录）
2. 解答关于系统功能的问题（数据展示、增删改查、主题切换等）
3. 提供专业、友好、准确的回答
4. 用简洁清晰的语言解释复杂概念

请用中文回答问题，保持专业且友好的语气。"""

    def get_db_connection(self):
        """获取数据库连接"""
        try:
            connection = pymysql.connect(**self.db_config)
            return connection
        except Exception as e:
            print(f"数据库连接失败: {e}")
            return None

    def save_message_to_db(self, role, content, user_id=None):
        """
        保存消息到数据库

        Args:
            role (str): 角色 (user/assistant/system)
            content (str): 消息内容
            user_id (str): 用户ID（可选）

        Returns:
            bool: 是否保存成功
        """
        conn = self.get_db_connection()
        if not conn:
            return False

        try:
            with conn.cursor() as cursor:
                sql = """
                    INSERT INTO qa_conversations
                    (session_id, user_id, role, content, model_name, created_at)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (
                    self.session_id,
                    user_id,
                    role,
                    content,
                    self.model_name,
                    datetime.now()
                ))
            conn.commit()
            return True
        except Exception as e:
            print(f"保存消息到数据库失败: {e}")
            return False
        finally:
            conn.close()

    def get_conversation_context(self, limit=10):
        """
        从数据库获取最近的对话上下文

        Args:
            limit (int): 获取的消息数量

        Returns:
            list: 对话历史列表
        """
        conn = self.get_db_connection()
        if not conn:
            return []

        try:
            with conn.cursor() as cursor:
                sql = """
                    SELECT role, content, created_at
                    FROM qa_conversations
                    WHERE session_id = %s
                    ORDER BY created_at DESC
                    LIMIT %s
                """
                cursor.execute(sql, (self.session_id, limit))
                results = cursor.fetchall()
                # 反转顺序，使其按时间正序排列
                return list(reversed(results))
        except Exception as e:
            print(f"获取对话历史失败: {e}")
            return []
        finally:
            conn.close()

    def process_question(self, question, user_id=None):
        """
        处理用户问题

        Args:
            question (str): 用户提出的问题
            user_id (str, optional): 用户ID，用于区分不同用户

        Returns:
            dict: 包含回答和相关信息的字典
        """
        try:
            # 1. 保存用户问题到数据库
            self.save_message_to_db('user', question, user_id)

            # 2. 调用Ollama生成回答
            answer = self._generate_answer_with_ollama(question)

            # 3. 保存AI回答到数据库
            self.save_message_to_db('assistant', answer, user_id)

            return {
                'success': True,
                'answer': answer,
                'question': question,
                'timestamp': datetime.now().isoformat(),
                'model': self.model_name
            }

        except Exception as e:
            error_msg = f"处理问题时出错: {str(e)}"
            print(error_msg)
            return {
                'success': False,
                'error': error_msg,
                'answer': '抱歉，我遇到了一些技术问题。请稍后再试。',
                'question': question,
                'timestamp': datetime.now().isoformat()
            }

    def _generate_answer_with_ollama(self, question):
        """
        使用Ollama生成回答

        Args:
            question (str): 用户问题

        Returns:
            str: AI生成的回答
        """
        try:
            # 获取历史对话上下文（最近5轮）
            context = self.get_conversation_context(limit=10)

            # 构建消息列表
            messages = []

            # 添加系统提示
            messages.append({
                "role": "system",
                "content": self.system_prompt
            })

            # 添加历史对话（排除当前问题）
            for msg in context:
                if msg['role'] in ['user', 'assistant']:
                    messages.append({
                        "role": msg['role'],
                        "content": msg['content']
                    })

            # 添加当前问题
            messages.append({
                "role": "user",
                "content": question
            })

            # 调用Ollama API
            response = requests.post(
                f"{self.ollama_base_url}/api/chat",
                json={
                    "model": self.model_name,
                    "messages": messages,
                    "stream": False,
                    "options": {
                        "temperature": 0.7,
                        "top_p": 0.9,
                    }
                },
                timeout=60  # 60秒超时
            )

            if response.status_code == 200:
                result = response.json()
                answer = result.get('message', {}).get('content', '')

                if answer:
                    return answer
                else:
                    return "抱歉，我没有生成有效的回答。请重试。"
            else:
                error_msg = f"Ollama API错误 (状态码: {response.status_code})"
                print(error_msg)
                return f"抱歉，调用AI模型时出现错误。{error_msg}"

        except requests.exceptions.ConnectionError:
            return "无法连接到Ollama服务。请确保Ollama正在运行（默认端口11434）。\n\n启动命令：ollama serve"
        except requests.exceptions.Timeout:
            return "AI模型响应超时。请稍后重试。"
        except Exception as e:
            error_msg = f"生成回答时出错: {str(e)}"
            print(error_msg)
            return f"抱歉，发生了意外错误：{error_msg}"

    def get_conversation_history(self, limit=10):
        """
        获取对话历史（从数据库）

        Args:
            limit (int): 返回的历史记录数量

        Returns:
            list: 对话历史列表，格式：[{role, content, timestamp}, ...]
        """
        conn = self.get_db_connection()
        if not conn:
            return []

        try:
            with conn.cursor() as cursor:
                sql = """
                    SELECT role, content, created_at as timestamp
                    FROM qa_conversations
                    WHERE session_id = %s
                    ORDER BY created_at DESC
                    LIMIT %s
                """
                cursor.execute(sql, (self.session_id, limit))
                results = cursor.fetchall()

                # 反转列表使其按时间正序
                history = []
                for row in reversed(results):
                    history.append({
                        'role': row['role'],
                        'content': row['content'],
                        'timestamp': row['timestamp'].isoformat() if row['timestamp'] else None
                    })

                return history
        except Exception as e:
            print(f"获取对话历史失败: {e}")
            return []
        finally:
            conn.close()

    def clear_history(self):
        """清空当前会话的对话历史"""
        conn = self.get_db_connection()
        if not conn:
            return {'success': False, 'message': '数据库连接失败'}

        try:
            with conn.cursor() as cursor:
                sql = "DELETE FROM qa_conversations WHERE session_id = %s"
                cursor.execute(sql, (self.session_id,))
            conn.commit()
            return {'success': True, 'message': '对话历史已清空'}
        except Exception as e:
            print(f"清空对话历史失败: {e}")
            return {'success': False, 'message': f'清空失败: {str(e)}'}
        finally:
            conn.close()

    def test_ollama_connection(self):
        """
        测试Ollama连接

        Returns:
            dict: 测试结果
        """
        try:
            response = requests.get(f"{self.ollama_base_url}/api/tags", timeout=5)
            if response.status_code == 200:
                models = response.json().get('models', [])
                model_names = [m.get('name', '') for m in models]

                return {
                    'success': True,
                    'message': 'Ollama连接成功',
                    'available_models': model_names,
                    'target_model': self.model_name,
                    'model_exists': self.model_name in model_names
                }
            else:
                return {
                    'success': False,
                    'message': f'Ollama API返回错误状态码: {response.status_code}'
                }
        except requests.exceptions.ConnectionError:
            return {
                'success': False,
                'message': '无法连接到Ollama服务',
                'hint': '请确保Ollama正在运行：ollama serve'
            }
        except Exception as e:
            return {
                'success': False,
                'message': f'测试连接失败: {str(e)}'
            }


# 创建全局问答处理器实例
qa_handler = QAHandler()
