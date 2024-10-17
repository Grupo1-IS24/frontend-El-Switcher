import Button from '../Button/Button';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { cancelMovement } from '../../service/CancelMovementService';
import usePlayMovementLogic from '../../hooks/usePlayMovementLogic';

const CancelMovementButton = () => {
  const { gameId } = useParams();
  const { playerID } = useContext(PlayerContext);
  const { canCancelMovement, resetMovementCards } = usePlayMovementLogic();

  const handleCancelMovement = async () => {
    try {
      await cancelMovement(Number(gameId), playerID);
      resetMovementCards();
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
