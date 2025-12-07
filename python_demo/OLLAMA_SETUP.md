# Ollama + DeepSeek-R1 集成说明

## 📋 功能概述

本系统已集成 Ollama 本地大模型，使用 **DeepSeek-R1:32b** 模型作为小王问答助手的AI引擎。
所有聊天记录会自动保存到 MySQL 数据库的 `qa_conversations` 表中。

---

## 🚀 快速开始

### 1. 安装 Ollama

#### Windows:
```bash
# 下载并安装 Ollama
# 访问: https://ollama.ai/download/windows
```

#### macOS:
```bash
# 使用 Homebrew
brew install ollama
```

#### Linux:
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### 2. 下载 DeepSeek-R1:32b 模型

```bash
# 拉取模型（大约 19GB）
ollama pull deepseek-r1:32b

# 验证模型已安装
ollama list
```

### 3. 启动 Ollama 服务

```bash
# 启动 Ollama 服务（默认端口 11434）
ollama serve
```

**注意**: Ollama 服务需要一直运行，不要关闭这个终端窗口。

### 4. 创建数据库表

```bash
# 在 python_demo 目录下
mysql -u root -p quanzhan_demo < create_qa_table.sql
```

或者手动执行SQL：
```sql
USE quanzhan_demo;

CREATE TABLE qa_conversations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(100) DEFAULT 'default',
    user_id VARCHAR(100) DEFAULT NULL,
    role ENUM('user', 'assistant', 'system') NOT NULL,
    content TEXT NOT NULL,
    model_name VARCHAR(100) DEFAULT 'deepseek-r1:32b',
    tokens_used INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_session_id (session_id),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 5. 安装 Python 依赖

```bash
cd python_demo
pip install -r requirements.txt
```

新增依赖：
- `requests==2.31.0` - 用于调用 Ollama API

### 6. 启动后端服务

```bash
python main.py
```

---

## 🧪 测试连接

### 测试 Ollama 连接

访问测试接口：
```bash
curl http://127.0.0.1:8899/qa/test-ollama
```

成功响应：
```json
{
  "success": true,
  "message": "Ollama连接成功",
  "available_models": ["deepseek-r1:32b", ...],
  "target_model": "deepseek-r1:32b",
  "model_exists": true
}
```

### 测试问答功能

```bash
curl -X POST http://127.0.0.1:8899/qa/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "你好，请介绍一下你自己"}'
```

---

## 📊 数据库表结构

### qa_conversations 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT | 主键 |
| session_id | VARCHAR(100) | 会话ID（默认：default） |
| user_id | VARCHAR(100) | 用户ID（可选） |
| role | ENUM | 角色：user/assistant/system |
| content | TEXT | 消息内容 |
| model_name | VARCHAR(100) | 使用的模型名称 |
| tokens_used | INT | token使用量（预留字段） |
| created_at | TIMESTAMP | 创建时间 |
| updated_at | TIMESTAMP | 更新时间 |

### 查询聊天记录

```sql
-- 查看最近10条聊天记录
SELECT * FROM qa_conversations
ORDER BY created_at DESC
LIMIT 10;

-- 查看特定会话的聊天记录
SELECT role, content, created_at
FROM qa_conversations
WHERE session_id = 'default'
ORDER BY created_at ASC;

-- 统计总消息数
SELECT COUNT(*) as total_messages FROM qa_conversations;

-- 按角色统计
SELECT role, COUNT(*) as count
FROM qa_conversations
GROUP BY role;
```

---

## 🔧 配置说明

### qa_handler.py 配置项

```python
# Ollama 配置
self.ollama_base_url = "http://localhost:11434"  # Ollama API 地址
self.model_name = "deepseek-r1:32b"              # 使用的模型
self.session_id = "default"                      # 默认会话ID

# AI 参数
"temperature": 0.7,  # 温度（0-1，越高越随机）
"top_p": 0.9,        # 核采样参数
```

### 修改模型

如果想使用其他 Ollama 模型，修改 `qa_handler.py` 第30行：

```python
self.model_name = "llama2"  # 或其他已安装的模型
```

可用模型列表：
```bash
ollama list
```

---

## 🛠️ API 接口

### POST /qa/ask
提问接口

**请求**:
```json
{
  "question": "用户的问题",
  "user_id": "可选的用户ID"
}
```

**响应**:
```json
{
  "success": true,
  "answer": "AI的回答",
  "question": "用户的问题",
  "timestamp": "2025-01-01T12:00:00",
  "model": "deepseek-r1:32b"
}
```

### GET /qa/history
获取对话历史

**参数**: `limit=10` (可选，默认10条)

**响应**:
```json
{
  "success": true,
  "history": [
    {
      "role": "user",
      "content": "问题",
      "timestamp": "2025-01-01T12:00:00"
    }
  ],
  "count": 10
}
```

### POST /qa/clear
清空对话历史

**响应**:
```json
{
  "success": true,
  "message": "对话历史已清空"
}
```

### GET /qa/test-ollama
测试 Ollama 连接

**响应**:
```json
{
  "success": true,
  "message": "Ollama连接成功",
  "available_models": ["deepseek-r1:32b"],
  "target_model": "deepseek-r1:32b",
  "model_exists": true
}
```

---

## 🎯 核心特性

✅ **本地部署** - 无需API密钥，数据完全本地化
✅ **上下文记忆** - 自动获取最近10条对话作为上下文
✅ **数据持久化** - 所有对话自动保存到MySQL
✅ **会话管理** - 支持多会话隔离（通过session_id）
✅ **错误处理** - 完善的错误提示和降级方案
✅ **系统提示词** - 预设专业的电站数据管理助手角色

---

## ⚠️ 常见问题

### 1. 无法连接到 Ollama 服务

**错误**: "无法连接到Ollama服务"

**解决**:
```bash
# 确保 Ollama 服务正在运行
ollama serve

# 检查端口是否被占用
netstat -ano | findstr :11434  # Windows
lsof -i :11434                 # macOS/Linux
```

### 2. 模型不存在

**错误**: "model_exists": false

**解决**:
```bash
# 重新拉取模型
ollama pull deepseek-r1:32b

# 验证模型
ollama list
```

### 3. AI 响应超时

**原因**: DeepSeek-R1:32b 是大模型，首次加载较慢

**解决**:
- 第一次调用会加载模型到内存（可能需要1-2分钟）
- 后续调用会很快
- 可以调整 `qa_handler.py` 中的 timeout 参数（默认60秒）

### 4. 数据库连接失败

**检查**:
```bash
# 确保 .env 文件包含正确的密码
mysql_password=你的密码

# 测试数据库连接
mysql -u root -p quanzhan_demo
```

---

## 📈 性能优化

### 1. 模型选择

| 模型 | 大小 | 速度 | 质量 |
|------|------|------|------|
| deepseek-r1:32b | ~19GB | 慢 | 极高 |
| deepseek-r1:14b | ~8GB | 中 | 高 |
| llama2 | ~4GB | 快 | 中 |

### 2. 上下文长度

修改 `qa_handler.py` 第189行：
```python
context = self.get_conversation_context(limit=10)  # 调整数量
```

更多上下文 = 更好的连贯性，但速度更慢

### 3. 生成参数

```python
"temperature": 0.7,  # 降低可获得更确定的回答
"top_p": 0.9,        # 降低可提高生成速度
```

---

## 📚 扩展功能建议

- [ ] 多用户会话管理（通过user_id和session_id）
- [ ] 对话导出功能（导出为JSON/TXT）
- [ ] Token使用量统计
- [ ] 流式输出（Server-Sent Events）
- [ ] 多模型切换界面
- [ ] RAG（检索增强生成）集成电站数据

---

## 🔗 相关链接

- Ollama 官网: https://ollama.ai
- DeepSeek 官网: https://www.deepseek.com
- Ollama API 文档: https://github.com/ollama/ollama/blob/main/docs/api.md
- PyMySQL 文档: https://pymysql.readthedocs.io

---

## 🆘 获取帮助

如遇问题，请检查：
1. Ollama 服务是否运行: `ollama list`
2. 数据库连接是否正常: `GET /test-connection`
3. Ollama 连接是否正常: `GET /qa/test-ollama`
4. 查看后端日志输出

---

**更新时间**: 2025-12-07
**版本**: 1.0.0
**维护者**: Python Demo Team
