import Button from '../Button/Button';
import useRouteNavigation from '../../hooks/useRouteNavigation';
import { startGame } from '../../service/StartGameService';
import { useParams } from 'react-router-dom';
import showToast from '../../utils/toastUtil';

const StartGameButton = ({ isDisabled = true }) => {
  const { redirectToGamePage } = useRouteNavigation();
  const { gameId } = useParams();

  const style = isDisabled ? 'disabled' : 'init';
  const manageStartGame = async () => {
    try {
      const response = await startGame(gameId);
      redirectToGamePage(response);
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Error al iniciar la partida. Intente nuevamente.',
        autoClose: 3000,
      });
      console.error('Error al iniciar la partida', error);
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
