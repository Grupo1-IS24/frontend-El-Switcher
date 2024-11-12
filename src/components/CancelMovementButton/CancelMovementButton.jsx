import Button from '../Button/Button';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { cancelMovement } from '../../service/CancelMovementService';
import usePlayMovementLogic from '../../hooks/usePlayMovementLogic';
import { PlayCardLogicContext } from '../../contexts/PlayCardLogicProvider';
import useDisableButton from '../../hooks/useDisableButton';

const CancelMovementButton = () => {
  const { gameId } = useParams();
  const { playerID } = useContext(PlayerContext);
  const { canCancelMovement } = usePlayMovementLogic();
  const { resetAllCards } = useContext(PlayCardLogicContext);
  const [isButtonDisabled, handleCancelMovement] = useDisableButton(
    async () => {
      resetAllCards();
      try {
        await cancelMovement(Number(gameId), playerID);
      } catch (error) {
        console.error('Error cancelando movimiento:', error);
      }
    }
  );

  return (
    <>
      {canCancelMovement() && (
        <Button
          text={'Cancelar movimiento'}
          style={'gameButton_cancelMovement'}
          onPress={handleCancelMovement}
          isDisabled={isButtonDisabled}
        />
      )}
    </>
  );
};

export default CancelMovementButton;
