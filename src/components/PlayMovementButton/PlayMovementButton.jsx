import { useContext } from 'react';
import Button from '../Button/Button';
import { playMovementCard } from '../../service/PlayMovementCardService';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { useParams } from 'react-router-dom';
import usePlayMovementLogic from '../../hooks/usePlayMovementLogic';
import showToast from '../../utils/toastUtil';

const PlayMovementButton = () => {
  const { gameId } = useParams();
  const { playerID } = useContext(PlayerContext);
  const {
    canPlayMovement,
    selectedMovementCard,
    selectedColorCards,
    resetMovementCards,
  } = usePlayMovementLogic();

  const handleOnPress = async () => {
    try {
      await playMovementCard(
        gameId,
        playerID,
        selectedMovementCard.movementcardId,
        selectedColorCards[0].squarePieceId,
        selectedColorCards[1].squarePieceId
      );

      resetMovementCards();
    } catch (error) {
      showToast({
        type: 'error',
        message: `Error jugando carta de movimiento: ${error.message}`,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {canPlayMovement() && (
        <Button
          text={'Jugar movimiento'}
          style={'gameButton_play'}
          onPress={handleOnPress}
        />
      )}
    </>
  );
};

export default PlayMovementButton;
