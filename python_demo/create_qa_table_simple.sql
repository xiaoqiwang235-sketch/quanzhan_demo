-- 简化版创建表脚本（只创建表，不插入数据）
-- 设置字符编码
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

USE quanzhan_demo;

-- 删除旧表（如果存在）
DROP TABLE IF EXISTS qa_conversations;

-- 创建聊天记录表
CREATE TABLE qa_conversations (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '记录ID',
    session_id VARCHAR(100) DEFAULT 'default' COMMENT '会话ID',
    user_id VARCHAR(100) DEFAULT NULL COMMENT '用户ID',
    role ENUM('user', 'assistant', 'system') NOT NULL COMMENT '角色',
    content TEXT NOT NULL COMMENT '消息内容',
    model_name VARCHAR(100) DEFAULT 'deepseek-r1:32b' COMMENT '模型名称',
    tokens_used INT DEFAULT 0 COMMENT 'token数量',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',

    INDEX idx_session_id (session_id),
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='问答聊天记录表';

-- 显示表结构
DESCRIBE qa_conversations;

SELECT 'Table qa_conversations created successfully!' AS message;
