import { useContext } from 'react';
import { GameContext } from '../contexts/GameProvider';

const useChatMessages = () => {
  const { chatMessages } = useContext(GameContext);

  const handleInputMessage = (event) => {
    if (event.key === 'Enter') {
      const message = event.target.value.trim();
      if (message === '') return;

      console.log('Message:', message);

      event.target.value = ''; // Clear the input field
    }
  };

  return {
    chatMessages,
    handleInputMessage,
  };
};

export default useChatMessages;
