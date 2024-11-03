import { useState } from 'react';

/**
 * This hook toggles the chat box.
 * 
 * @returns {Object} The state of the chat box.
 * - isOpen: A boolean that indicates whether the chat box is open.
 * - toggleChat: A function to toggle the chat box.
 */
const useChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    toggleChat,
  };
};

export default useChatBox;
