import Button from '../Button/Button';
import usePlayerTurn from '../../hooks/usePlayerTurn';

const CancelMovementButton = () => {
  const { isCurrentPlayerTurn } = usePlayerTurn();

  return (
    <>
      {isCurrentPlayerTurn() && (
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
