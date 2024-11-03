import useChatMessages from '../../hooks/useChatMessages';
import useScrollToBottom from '../../hooks/useScrollToBottom';
import './ChatMessages.css';

const ChatMessages = () => {
  const { chatMessages, handleInputMessage } = useChatMessages();
  const messagesContainerRef = useScrollToBottom(chatMessages.length);

  return (
    <div className='p-4'>
      <div
        ref={messagesContainerRef}
        className='chat-messages-scrollbar flex flex-col h-64 overflow-y-auto space-y-2 break-words'
      >
        {chatMessages.map(({ writtenBy, message }, index) => (
          <p key={index}>
            {writtenBy}: {message}
          </p>
        ))}
      </div>
      <input
        type='text'
        placeholder='Escribe un mensaje...'
        className='mt-2 w-full bg-gray-800 bg-opacity-50 text-white p-2 rounded-md focus:outline-none'
        onKeyUp={handleInputMessage}
      />
    </div>
  );
};

export default ChatMessages;
