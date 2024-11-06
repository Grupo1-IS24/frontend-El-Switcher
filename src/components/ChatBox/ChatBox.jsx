import useChatBox from '../../hooks/useChatBox';
import ChatMessages from '../ChatMessages/ChatMessages';
import { useContext, useEffect, useCallback } from 'react';
import { GameContext } from '../../contexts/GameProvider';

const ChatBox = () => {
  const { isOpen, toggleChat } = useChatBox();
  const { hasNewMessages, setHasNewMessages, setIsChatOpen } =
    useContext(GameContext);

  useEffect(() => {
    setIsChatOpen(isOpen);
  }, [isOpen, setIsChatOpen]);

  const handleToggleChat = useCallback(() => {
    setHasNewMessages(false);
    toggleChat();
  }, [setHasNewMessages, toggleChat]);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessages(false);
    }
  }, [isOpen, setHasNewMessages]);

  return (
    <div className='fixed bottom-0 inset-x-0 mx-auto w-80 p-4 z-50'>
      {!isOpen && (
        <div
          onClick={handleToggleChat}
          className='bg-black bg-opacity-85 text-white text-center p-2 cursor-pointer rounded-lg shadow-lg relative'
        >
          <p>Hacer clic para abrir el chat</p>
          {hasNewMessages && (
            <span
              className='absolute top-[-5px] right-[-5px] w-5 h-5 bg-orange-500 rounded-full animate-pulse'
              data-testid='new-message-indicator'
            ></span>
          )}
        </div>
      )}

      {isOpen && (
        <div className='bg-black bg-opacity-85 text-white rounded-lg shadow-lg transition-all ease-in-out'>
          <div className='flex justify-between items-center px-4 py-2'>
            <span className='text-lg font-bold'>Chat</span>
            <button
              onClick={handleToggleChat}
              className='text-red-500 text-xl font-bold focus:outline-none'
            >
              ✕
            </button>
          </div>
          <ChatMessages />
        </div>
      )}
    </div>
  );
};

export default ChatBox;
