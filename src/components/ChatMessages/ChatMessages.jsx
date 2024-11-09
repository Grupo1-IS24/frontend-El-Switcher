import useChatMessages from '../../hooks/useChatMessages';
import useScrollToBottom from '../../hooks/useScrollToBottom';
import MessageList from '../MessageList/MessageList';

const ChatMessages = () => {
  const { chatMessages, handleInputMessage } = useChatMessages();
  const messagesContainerRef = useScrollToBottom(chatMessages.length);

  return (
    <div className='p-4'>
      <MessageList
        ref={messagesContainerRef}
        messages={chatMessages}
        renderMessage={({ writtenBy, message }, index) => (
          <p key={index}>
            {writtenBy}: {message}
          </p>
        )}
      />
      <input
        type='text'
        placeholder='Escribe un mensaje...'
        className='mt-2 w-full bg-gray-800 bg-opacity-50 text-white p-2 rounded-md focus:outline-none'
        onKeyUp={handleInputMessage}
        autoFocus
      />
    </div>
  );
};

export default ChatMessages;
