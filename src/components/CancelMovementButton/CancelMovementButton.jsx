import Button from '../Button/Button';
import usePlayMovementLogic from '../../hooks/usePlayMovementLogic';

const CancelMovementButton = () => {
  const { canCancelMovement } = usePlayMovementLogic();

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
