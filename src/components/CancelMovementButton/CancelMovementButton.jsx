import Button from '../Button/Button';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { cancelMovement } from '../../service/CancelMovementService';
import usePlayMovementLogic from '../../hooks/usePlayMovementLogic';
import { PlayCardLogicContext } from '../../contexts/PlayCardLogicProvider';

const CancelMovementButton = () => {
  const { gameId } = useParams();
  const { playerID } = useContext(PlayerContext);
  const { canCancelMovement } = usePlayMovementLogic();
  const { resetAllCards } = useContext(PlayCardLogicContext);

  const handleCancelMovement = async () => {
    resetAllCards();
    try {
      await cancelMovement(Number(gameId), playerID);
    } catch (error) {
      console.error('Error cancelando movimiento:', error);
    }
  };

  return (
    <>
      {canCancelMovement() && (
        <Button
          text={'Cancelar movimiento'}
          style={'gameButton_cancelMovement'}
          onPress={handleCancelMovement}
        />
      )}
    </>
  );
};

export default CancelMovementButton;
