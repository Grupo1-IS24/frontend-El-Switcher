import { useContext } from 'react';
import useScrollToBottom from '../../hooks/useScrollToBottom';
import MessageList from '../MessageList/MessageList';
import { GameContext } from '../../contexts/GameProvider';

const ChatLogs = () => {
  const { logMessages } = useContext(GameContext);
  const messagesContainerRef = useScrollToBottom(logMessages.length);

  return (
    <div className='p-4'>
      <MessageList
        ref={messagesContainerRef}
        messages={logMessages}
        renderMessage={({ message }, index) => (
          <p key={index}>INFO: {message}</p>
        )}
      />
    </div>
  );
};

export default ChatLogs;
