import useWebsocketLobby from '../../hooks/useWebsocketLobby';
import LeaveButton from '../LeaveButton/LeaveButton';
import StartGameButton from '../StartGameButton/StartGameButton';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { useContext } from 'react';
import useGetGame from '../../hooks/useGetGame';
import { useParams } from 'react-router-dom';
import LoadingLobby from '../LoadingLobby/LoadingLobby';

const ConnectedPlayersInfo = ({ listOfPlayers }) => (
  <div className='flex flex-col gap-4'>
    <p className='lekton-bold text-3xl'>
      Jugadores conectados: {listOfPlayers.length}
    </p>
    <div className='border-2 border-gray-600 rounded-lg p-4'>
      <div className='grid grid-cols-2 gap-4 justify-items-center'>
        {listOfPlayers.map((player, index) => (
          <span
            key={index}
            className='bg-gray-700 text-white px-3 py-1 text-xl lekton-bold w-full text-center'
          >
            {player.playerName}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const OwnerActions = ({ canStartGame }) => (
  <div className='flex flex-row gap-5 justify-center'>
    <StartGameButton isDisabled={!canStartGame} />
    <LeaveButton type={'lobby'} />
  </div>
);

const NonOwnerActions = () => (
  <div className='flex flex-col gap-3'>
    <p className='lekton-bold text-2xl text-[#60d394]'>
      Esperando que el owner comience la partida...
    </p>
    <div className='flex justify-center'>
      <LeaveButton type={'lobby'} />
    </div>
  </div>
);

const LobbyCard = () => {
  const { gameId } = useParams();
  const { listOfPlayers, canStartGame } = useWebsocketLobby();
  const { isOwner } = useContext(PlayerContext);
  const { game } = useGetGame(gameId);

  if (!game) {
    return <LoadingLobby />;
  }

  return (
    <div className='bg-[#0c0c0c] rounded-xl text-[#f1f1f1] text-center flex flex-col gap-10 px-8 py-12 max-w-3xl m-auto'>
      <h2 className='lekton-bold text-6xl underline'>{game.gameName}</h2>
      <ConnectedPlayersInfo listOfPlayers={listOfPlayers} />
      <div className='flex justify-between mx-10 text-2xl lekton-bold'>
        <p>Mín. jugadores: {game.minPlayers}</p>
        <p>Max. jugadores: {game.maxPlayers}</p>
      </div>
      {isOwner ? (
        <OwnerActions canStartGame={canStartGame} />
      ) : (
        <NonOwnerActions />
      )}
    </div>
  );
};

export default LobbyCard;
