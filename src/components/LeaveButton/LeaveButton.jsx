import Button from '../Button/Button';
import useRouteNavigation from '../../hooks/useRouteNavigation';
import { leaveGame } from '../../service/LeaveGame';
import { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { useParams } from 'react-router-dom';
import useDisableButton from '../../hooks/useDisableButton';
import showToast from '../../utils/toastUtil';

const LeaveButton = ({ type }) => {
  const { redirectToHomePage } = useRouteNavigation();
  const { playerID } = useContext(PlayerContext);
  const { gameId } = useParams();

  const [isDisabled, handleLeaveClick] = useDisableButton(async () => {
    if (gameId == null || playerID == null) {
      console.error('gameId o playerID no están definidos.');
      return;
    }

    try {
      await leaveGame(gameId, playerID);
      redirectToHomePage();
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Error al abandonar el juego. Intente nuevamente.',
        autoClose: 3000,
      });
      console.error('Error al abandonar el juego', error);
    }
  });

  return type === 'lobby' ? (
    <Button
      text={'Abandonar lobby'}
      onPress={handleLeaveClick}
      isDisabled={isDisabled}
      style={'lobbyButton_leave'}
    />
  ) : (
    <Button
      text={'x'}
      onPress={handleLeaveClick}
      isDisabled={isDisabled}
      style={'gameButton_leave'}
    />
  );
};

export default LeaveButton;
