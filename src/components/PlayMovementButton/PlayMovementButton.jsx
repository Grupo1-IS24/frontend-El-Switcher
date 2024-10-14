import { useContext } from 'react';
import { PlayMovementLogicContext } from '../../contexts/PlayMovementLogicProvider';
import Button from '../Button/Button';
import { playMovementCard } from '../../service/PlayMovementCardService';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { useParams } from 'react-router-dom';

const PlayMovementButton = () => {
  const { gameId } = useParams();
  const { playerID } = useContext(PlayerContext);
  const {
    canPlayMovement,
    selectedMovementCard,
    selectedColorCards,
    resetSelectedCards,
  } = useContext(PlayMovementLogicContext);

  const handleOnPress = async () => {
    try {
      await playMovementCard(
        gameId,
        playerID,
        selectedMovementCard.movementcardId,
        selectedColorCards[0].squarePieceId,
        selectedColorCards[1].squarePieceId
      );

      resetSelectedCards();
    } catch (error) {
      alert(`Error jugando carta de movimiento: ${error.message}`);
    }
  };

  return (
    <>
      {canPlayMovement() && (
        <Button
          text={'Jugar movimiento'}
          style={'gameButton_playMovement'}
          onPress={handleOnPress}
        />
      )}
    </>
  );
};

export default PlayMovementButton;
