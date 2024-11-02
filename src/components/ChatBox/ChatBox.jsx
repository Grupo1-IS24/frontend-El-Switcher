import useChat from '../../hooks/useChat';

const ChatBox = () => {
  const { isOpen, toggleChat } = useChat();

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
          <div className='p-4'>
            <div className='flex flex-col h-64 overflow-y-auto space-y-2'>
              <p className='text-sm'>Mensaje de ejemplo.</p>
            </div>
            <input
              type='text'
              placeholder='Escribe un mensaje...'
              className='mt-2 w-full bg-gray-800 bg-opacity-50 text-white p-2 rounded-md focus:outline-none'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
