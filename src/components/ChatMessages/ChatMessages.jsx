import './ChatMessages.css';

const ChatMessages = () => {
  return (
    <div className='p-4'>
      <div className='chat-messages-container flex flex-col h-64 overflow-y-auto space-y-2 break-words'>
        <p className='text-sm'>Mensaje de ejemplo.</p>
      </div>
      <input
        type='text'
        placeholder='Escribe un mensaje...'
        className='mt-2 w-full bg-gray-800 bg-opacity-50 text-white p-2 rounded-md focus:outline-none'
      />
    </div>
  );
};

export default ChatMessages;
