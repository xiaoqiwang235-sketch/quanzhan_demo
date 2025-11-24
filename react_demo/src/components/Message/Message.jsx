import React from 'react';

export const Message = ({ message, messageType, theme }) => {
  if (!message) return null;

  return (
    <div className={`border-l-4 p-4 mx-6 mt-6 text-sm font-mono animate-pulse ${
      messageType === 'success'
        ? theme === 'hacker'
          ? 'bg-black border-emerald-500 text-emerald-300'
          : theme === 'light'
          ? 'bg-green-50 border-green-500 text-green-800'
          : 'bg-green-950 border-green-500 text-green-300'
        : theme === 'hacker'
          ? 'bg-black border-red-500 text-red-300'
          : theme === 'light'
          ? 'bg-red-50 border-red-500 text-red-800'
          : 'bg-red-950 border-red-500 text-red-300'
    }`}>
      {theme === 'hacker' && <span className="text-emerald-600">$</span>} {message}
    </div>
  );
};
