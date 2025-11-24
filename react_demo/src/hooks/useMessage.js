import { useState } from 'react';

export const useMessage = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const showMessage = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 2500);
  };

  return {
    message,
    messageType,
    showMessage
  };
};
