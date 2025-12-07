-- 创建聊天记录表
-- 使用 quanzhan_demo 数据库

-- 设置字符编码
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

USE quanzhan_demo;

-- 删除旧表（如果存在）
DROP TABLE IF EXISTS qa_conversations;

-- 创建聊天记录表
CREATE TABLE qa_conversations (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    session_id VARCHAR(100) DEFAULT 'default' COMMENT '会话ID，用于区分不同会话',
    user_id VARCHAR(100) DEFAULT NULL COMMENT '用户ID（可选）',
    role ENUM('user', 'assistant', 'system') NOT NULL COMMENT '角色：user=用户, assistant=AI助手, system=系统',
    content TEXT NOT NULL COMMENT '消息内容',
    model_name VARCHAR(100) DEFAULT 'deepseek-r1:32b' COMMENT '使用的模型名称',
    tokens_used INT DEFAULT 0 COMMENT '使用的token数量（可选）',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

    INDEX idx_session_id (session_id),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='问答聊天记录表';

-- 插入系统欢迎消息
INSERT INTO qa_conversations (session_id, role, content, model_name)
VALUES ('default', 'assistant', '你好！我是小王，由DeepSeek-R1模型驱动。有什么可以帮助你的吗？', 'deepseek-r1:32b');

-- 查看表结构
DESCRIBE qa_conversations;

-- 查看数据
SELECT * FROM qa_conversations ORDER BY created_at DESC LIMIT 10;
