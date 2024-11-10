import { forwardRef } from 'react';

const MessageList = forwardRef(({ messages, renderMessage }, ref) => {
  return (
    <div
      ref={ref}
      className='chat-scrollbar flex flex-col h-64 overflow-y-auto space-y-2 break-words'
    >
      {messages.map(renderMessage)}
    </div>
  );
});

MessageList.displayName = 'MessageList';

export default MessageList;
