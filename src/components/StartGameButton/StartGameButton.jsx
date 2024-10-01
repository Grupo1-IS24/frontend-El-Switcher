import Button from '../Button/Button';
import useRouteNavigation from '../../hooks/useRouteNavigation';
import { startGame } from '../../service/StartGameService';
import { useParams } from 'react-router-dom';

const StartGameButton = ({ isDisabled = true }) => {
  const { redirectToGamePage } = useRouteNavigation();
  const { gameId } = useParams();

  const style = isDisabled ? 'disabled' : 'init';
  const manageStartGame = async () => {
    try {
      const response = await startGame(gameId);
      redirectToGamePage(response);
    } catch (error) {
      window.alert('Error al iniciar la partida. Intente nuevamente.');
    }
  };

  return (
    <Button
      text={'Iniciar partida'}
      style={`lobbyButton_${style}`}
      isDisabled={isDisabled}
      onPress={() => manageStartGame()}
    />
  );
};

export default StartGameButton;