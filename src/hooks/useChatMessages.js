import { useContext } from 'react';
import { GameContext } from '../contexts/GameProvider';
import { PlayerContext } from '../contexts/PlayerProvider';
import { sendChatMessage } from '../service/SendChatMessage';
import { useParams } from 'react-router-dom';
import showToast from '../utils/toastUtil';

const useChatMessages = () => {
  const { chatMessages } = useContext(GameContext);
  const { playerID } = useContext(PlayerContext);
  const { gameId } = useParams();

  const handleInputMessage = async (event) => {
    if (event.key === 'Enter') {
      const message = event.target.value.trim();
      if (message === '') return;

      try {
        await sendChatMessage(playerID, gameId, message);
      } catch (error) {
        showToast({
          type: 'error',
          message: error.message,
          autoClose: 3000,
        });
      }

      event.target.value = ''; // Clear the input field
    }
  };

  return {
    chatMessages,
    handleInputMessage,
  };
};

export default useChatMessages;
