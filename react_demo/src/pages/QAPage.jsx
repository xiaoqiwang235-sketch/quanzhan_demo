import React, { useState } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';

const API_URL = 'http://127.0.0.1:8899';

export const QAPage = ({ theme, c }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '你好！我是小王，有什么可以帮助你的吗？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userQuestion = input.trim();

    // 添加用户消息
    const userMessage = { role: 'user', content: userQuestion };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 调用后端API
      const response = await fetch(`${API_URL}/qa/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userQuestion
        })
      });

      const data = await response.json();

      if (data.success) {
        // 添加AI回复
        const botResponse = {
          role: 'assistant',
          content: data.answer
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        // 错误处理
        const errorMessage = {
          role: 'assistant',
          content: `抱歉，出现了一些问题：${data.message || '未知错误'}`
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('问答请求失败:', error);
      const errorMessage = {
        role: 'assistant',
        content: '抱歉，连接服务器失败。请确保后端服务正在运行。'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 relative z-10">
      <div className={`${c.cardBg} border-2 ${c.border} rounded-lg shadow-2xl overflow-hidden flex flex-col h-[calc(100vh-200px)]`}>
        {/* 标题栏 */}
        <div className={`px-6 py-4 border-b-2 ${c.border} flex items-center gap-3`}>
          <Bot className={`w-6 h-6 ${c.primaryText}`} />
          <h2 className={`text-xl font-bold ${c.text}`}>小王问答助手</h2>
        </div>

        {/* 消息区域 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className={`w-8 h-8 rounded-full ${c.primary} flex items-center justify-center flex-shrink-0`}>
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}

              <div
                className={`max-w-[70%] px-4 py-3 rounded-lg ${
                  msg.role === 'user'
                    ? `${c.primary} text-white`
                    : `${c.secondary} ${c.text}`
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{msg.content}</p>
              </div>

              {msg.role === 'user' && (
                <div className={`w-8 h-8 rounded-full ${c.border} border-2 flex items-center justify-center flex-shrink-0`}>
                  <User className={`w-5 h-5 ${c.text}`} />
                </div>
              )}
            </div>
          ))}

          {/* 加载状态 */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className={`w-8 h-8 rounded-full ${c.primary} flex items-center justify-center flex-shrink-0`}>
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className={`px-4 py-3 rounded-lg ${c.secondary} ${c.text} flex items-center gap-2`}>
                <Loader className="w-4 h-4 animate-spin" />
                <span>小王正在思考...</span>
              </div>
            </div>
          )}
        </div>

        {/* 输入区域 */}
        <div className={`px-6 py-4 border-t-2 ${c.border}`}>
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入你的问题..."
              className={`flex-1 px-4 py-3 ${c.inputBg} border-2 ${c.inputBorder} rounded-lg ${c.text} placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={`px-6 py-3 ${c.primary} text-white rounded-lg font-medium transition-all ${
                input.trim() && !isLoading
                  ? `${c.primaryHover} shadow-lg`
                  : 'opacity-50 cursor-not-allowed'
              } flex items-center gap-2`}
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  发送中...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  发送
                </>
              )}
            </button>
          </div>
          <p className={`text-xs ${c.textSecondary} mt-2`}>
            按 Enter 发送，Shift + Enter 换行
          </p>
        </div>
      </div>
    </div>
  );
};
