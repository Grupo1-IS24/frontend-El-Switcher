import useChatBox from '../../hooks/useChatBox';
import ChatMessages from '../ChatMessages/ChatMessages';
import ChatLogs from '../ChatLogs/ChatLogs';

const TabButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex-1 text-center p-2 mx-1 rounded-lg hover:text-orange-500 focus:outline-none transition-colors duration-150 transform hover:scale-105 active:scale-95 ${
      isActive ? 'text-orange-500' : ''
    }`}
  >
    {label}
  </button>
);

const ChatBox = () => {
  const {
    isOpen,
    isChatMessageActive,
    isChatLogsActive,
    activeTabChatMessages,
    activeTabChatLogs,
    handleToggleChat,
    hasNewMessages,
  } = useChatBox();

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
            <TabButton
              label='Chat'
              isActive={isChatMessageActive}
              onClick={activeTabChatMessages}
            />
            <TabButton
              label='Logs'
              isActive={isChatLogsActive}
              onClick={activeTabChatLogs}
            />
            <button
              onClick={handleToggleChat}
              className='text-red-500 text-xl font-bold focus:outline-none transition-transform duration-150 hover:scale-110 active:scale-95'
            >
              ✕
            </button>
          </div>
          {isChatMessageActive && <ChatMessages />}
          {isChatLogsActive && <ChatLogs />}
        </div>
      )}
    </div>
  );
};

export default ChatBox;
