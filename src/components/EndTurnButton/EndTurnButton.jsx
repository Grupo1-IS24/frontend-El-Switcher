import Button from '../Button/Button';
import { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { endTurn } from '../../service/EndTurnService';

const EndTurnButton = (isTurn = true) => {
  const { playerID } = useContext(PlayerContext);

  const manageEndTurn = async (playerID) => {
    try {
      await endTurn(playerID);
    } catch (error) {
      window.alert('Error al terminar el turno. Intente nuevamente.');
    }
  };

  return (
    <Button
      text={'Pasar turno'}
      style={'gameButton_endTurn'}
      onPress={() => manageEndTurn(playerID)}
    />
  );
};

export default EndTurnButton;
