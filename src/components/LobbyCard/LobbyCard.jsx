import useRouteNavigation from '../../hooks/useRouteNavigation';
import { leaveLobby } from '../../service/LeaveLobby';
import Button from '../Button/Button';

const LobbyCard = ({ gameID, playerID, isOwner }) => {
  const { redirectToHomePage } = useRouteNavigation(); // hook for redirect

  const manageInitGame = () => {
    console.log('iniciar juego');
  };

  const manageLeaveLobby = () => {
    const response = leaveLobby(gameID, playerID);
    if (response) redirectToHomePage();
  };

  return (
    <div className='bg-[#0c0c0c] rounded-xl text-[#f1f1f1] text-center flex flex-col gap-16 px-8 py-12 max-w-3xl m-auto'>
      <h2 className='lekton-bold text-6xl underline'>Partida 1</h2>
      <div className='flex flex-col gap-0'>
        <p className='lekton-bold text-4xl'>Jugadores conectados: 3</p>
        <p className='lekton-bold text-4xl'>Max. jugadores: 4</p>
      </div>
      {isOwner ? (
        <div className='flex flex-row gap-5 justify-center'>
          <Button
            text={'Iniciar partida'}
            onPress={manageInitGame}
            style={'lobbyButton_init'}
          />
          <Button
            text={'Abandonar lobby'}
            onPress={manageLeaveLobby}
            style={'lobbyButton_leave'}
          />
        </div>
      ) : (
        <div className='flex flex-col gap-3'>
          <p className='lekton-bold text-2xl text-[#60d394]'>
            Esperando que el owner comience la partida...
          </p>
          <div className='flex justify-center'>
            <Button
              text={'Abandonar lobby'}
              onPress={manageLeaveLobby}
              style={'lobbyButton_leave'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LobbyCard;
