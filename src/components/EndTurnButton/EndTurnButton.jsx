import Button from '../Button/Button';
import { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { endTurn } from '../../service/EndTurnService';
import { useParams } from 'react-router-dom';
import usePlayerTurn from '../../hooks/usePlayerTurn';
import useDisableButton from '../../hooks/useDisableButton';
import { PlayCardLogicContext } from '../../contexts/PlayCardLogicProvider';

const EndTurnButton = () => {
  const { playerID } = useContext(PlayerContext);
  const { gameId } = useParams();
  const { isCurrentPlayerTurn } = usePlayerTurn();
  const { resetAllCards } = useContext(PlayCardLogicContext);

  const [isDisabled, handleEndTurnClick] = useDisableButton(async () => {
    resetAllCards();
    try {
      await endTurn(gameId, playerID);
    } catch (error) {
      window.alert('Error al terminar el turno. Intente nuevamente.');
      console.error('Error al terminar el turno', error);
    }
  });

  return (
    <>
      {isCurrentPlayerTurn() && (
        <Button
          text={'Pasar turno'}
          style={'gameButton_endTurn'}
          onPress={handleEndTurnClick}
          isDisabled={isDisabled}
        />
      )}
    </>
  );
};

export default EndTurnButton;
