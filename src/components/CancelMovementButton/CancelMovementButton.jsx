import { useContext } from 'react';
import { PlayMovementLogicContext } from '../../contexts/PlayMovementLogicProvider';
import Button from '../Button/Button';

const CancelMovementButton = () => {
  const { canPlayMovement, resetSelectedCards } = useContext(
    PlayMovementLogicContext
  );

  return (
    <>
      {canPlayMovement() && (
        <Button
          text={'Cancelar movimiento'}
          style={'gameButton_cancelMovement'}
          onPress={() => {
            console.log('Movimiento cancelado');
            resetSelectedCards();
          }}
        />
      )}
    </>
  );
};

export default CancelMovementButton;
