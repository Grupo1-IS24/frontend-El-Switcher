import { useContext } from 'react';
import Button from '../Button/Button';
import { PlayMovementLogicContext } from '../../contexts/PlayMovementLogicProvider';

const CancelMovementButton = () => {
  const { canCancelMovement } = useContext(PlayMovementLogicContext);

  return (
    <>
      {canCancelMovement() && (
        <Button
          text={'Cancelar movimiento'}
          style={'gameButton_cancelMovement'}
          onPress={() => {
            console.log('Movimiento cancelado');
          }}
        />
      )}
    </>
  );
};

export default CancelMovementButton;
