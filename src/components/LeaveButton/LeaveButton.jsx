import Button from "../Button/Button";
import useRouteNavigation from '../../hooks/useRouteNavigation';
import { leaveGame } from '../../service/LeaveGame';
import { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerProvider';

const LeaveButton = ({ gameID, type }) => {
  const { redirectToHomePage } = useRouteNavigation();
  const { playerID } = useContext(PlayerContext);

  const manageLeaveLobby = async () => {
    if (gameID == null || playerID == null) {
      console.error('gameID o playerID no están definidos.');
      return;
    }

    await leaveGame(gameID, playerID);
    redirectToHomePage();
  };

  return (
    type === 'lobby' ?
      (<Button
        text={'Abandonar lobby'}
        onPress={() => manageLeaveLobby(gameID, playerID)}
        style={'lobbyButton_leave'}
      />)
      :
      (<Button
        text={'Abandonar'}
        onPress={() => manageLeaveLobby(gameID, playerID)}
        style={'gameButton_leave'}
      />)
  );
}

export default LeaveButton;
