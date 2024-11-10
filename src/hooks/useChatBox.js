import { useCallback, useContext, useEffect, useState } from 'react';
import { CHAT_MESSAGES, CHAT_LOGS } from '../constants/typeOfChats';
import { GameContext } from '../contexts/GameProvider';

/**
 * This hook toggles the chat box.
 *
 * @returns {Object} The state of the chat box.
 * - isOpen: A boolean that indicates whether the chat box is open.
 * - isChatMessageActive: A boolean that indicates whether the chat messages tab is active.
 * - isChatLogsActive: A boolean that indicates whether the chat logs tab is active.
 * - activeTabChatMessages: A function that sets the chat messages tab as active.
 * - activeTabChatLogs: A function that sets the chat logs tab as active.
 * - handleToggleChat: A function that toggles the chat box.
 * - hasNewMessages: A boolean that indicates whether there are new messages.
 **/
const useChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(CHAT_MESSAGES);
  const { hasNewMessages, setHasNewMessages, setIsChatOpen } =
    useContext(GameContext);

  const toggleChat = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const activeTabChatMessages = () => {
    setActiveTab(CHAT_MESSAGES);
  };

  const activeTabChatLogs = () => {
    setActiveTab(CHAT_LOGS);
  };

  const isChatMessageActive = activeTab === CHAT_MESSAGES;

  const isChatLogsActive = activeTab === CHAT_LOGS;

  const handleToggleChat = useCallback(() => {
    setHasNewMessages(false);
    toggleChat();
  }, [setHasNewMessages, toggleChat]);

  useEffect(() => {
    setIsChatOpen(isOpen);
  }, [isOpen, setIsChatOpen]);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessages(false);
    }
  }, [isOpen, setHasNewMessages]);

  return {
    isOpen,
    isChatMessageActive,
    isChatLogsActive,
    activeTabChatMessages,
    activeTabChatLogs,
    handleToggleChat,
    hasNewMessages,
  };
};

export default useChatBox;
