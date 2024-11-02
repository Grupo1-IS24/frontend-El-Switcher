import { useState } from 'react';

const useChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    toggleChat,
  };
};

export default useChat;
