import Button from "../Button/Button";
import useRouteNavigation from '../../hooks/useRouteNavigation';
import { leaveLobby } from '../../service/LeaveLobby';

const LeaveLobbyButton = ({ gameID, playerID }) => {
  const { redirectToHomePage } = useRouteNavigation(); // hook for redirect

  const manageLeaveLobby = async () => {
    if (!gameID || !playerID) {
      console.error("gameID o playerID no están definidos.");
      return;
    }

    const response = await leaveLobby(gameID, playerID);
    {/* TODO: verificar que la respuesta este ok cuando terminen el servicio */}
    redirectToHomePage();
  };

  return (
    <Button
      text={'Abandonar lobby'}
      onPress={manageLeaveLobby}
      style={'lobbyButton_leave'}
    />
  );
}

export default LeaveLobbyButton;
