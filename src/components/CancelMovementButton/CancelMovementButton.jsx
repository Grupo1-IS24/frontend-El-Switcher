import { useContext } from 'react';
import Button from '../Button/Button';
import { PlayCardLogicContext } from '../../contexts/PlayCardLogicProvider';

const CancelMovementButton = () => {
  const { canCancelMovement } = useContext(PlayCardLogicContext);

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
