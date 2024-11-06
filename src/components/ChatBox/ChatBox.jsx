import useChatBox from '../../hooks/useChatBox';
import ChatMessages from '../ChatMessages/ChatMessages';

const ChatBox = () => {
  const { isOpen, toggleChat } = useChatBox();

  return (
    <div className='fixed bottom-0 inset-x-0 mx-auto w-80 p-4 z-50'>
      {!isOpen && (
        <div
          onClick={toggleChat}
          className='bg-black bg-opacity-85 text-white text-center p-2 cursor-pointer rounded-lg shadow-lg'
        >
          <p>Hacer clic para abrir el chat</p>
        </div>
      )}

      {isOpen && (
        <div className='bg-black bg-opacity-85 text-white rounded-lg shadow-lg transition-all ease-in-out'>
          <div className='flex justify-between items-center px-4 py-2'>
            <span className='text-lg font-bold'>Chat</span>
            <button
              onClick={toggleChat}
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
