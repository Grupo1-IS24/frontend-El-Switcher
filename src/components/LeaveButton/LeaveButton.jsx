import Button from '../Button/Button';
import useRouteNavigation from '../../hooks/useRouteNavigation';
import { leaveGame } from '../../service/LeaveGame';
import { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { useParams } from 'react-router-dom';

const LeaveButton = ({ type }) => {
  const { redirectToHomePage } = useRouteNavigation();
  const { playerID } = useContext(PlayerContext);
  const { gameId } = useParams();

  const manageLeave = async () => {
    if (gameId == null || playerID == null) {
      console.error('gameId o playerID no están definidos.');
      return;
    }

    try {
      await leaveGame(gameId, playerID); // service for leave lobby and a started game
      redirectToHomePage();
    } catch (error) {
      window.alert('Error al abandonar el juego. Intente nuevamente.');
      console.error('Error al abandonar el juego', error);
    }
  };

  return type === 'lobby' ? (
    <Button
      text={'Abandonar lobby'}
      onPress={() => manageLeave()}
      style={'lobbyButton_leave'}
    />
  ) : (
    <Button
      text={'Abandonar'}
      onPress={() => manageLeave()}
      style={'gameButton_leave'}
    />
  );
};

export default LeaveButton;
