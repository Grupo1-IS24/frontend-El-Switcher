import Button from '../Button/Button';
import useRouteNavigation from '../../hooks/useRouteNavigation';
import { leaveGame } from '../../service/LeaveGameService';

const LeaveGameButton = () => {
  const { redirectToHomePage } = useRouteNavigation();

  const manageLeave = async (gameID, playerID) => {
    if (!gameID || !playerID) {
      console.error('gameID o playerID no están definidos.');
      return;
    }

    await leaveGame(gameID, playerID);
    redirectToHomePage();
  };

  return (
    <Button
      text={'Abandonar'}
      onPress={manageLeave}
      style={'gameButton_leave'}
    />
  );
};

export default LeaveGameButton;
