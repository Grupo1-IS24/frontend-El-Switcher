import useWebsocketLobby from '../../hooks/useWebsocketLobby';
import LeaveButton from '../LeaveButton/LeaveButton';
import StartGameButton from '../StartGameButton/StartGameButton';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { useContext } from 'react';
import useGetGame from '../../hooks/useGetGame';
import { useParams, Navigate } from 'react-router-dom';
import LoadingLobby from '../LoadingLobby/LoadingLobby';

const ConnectedPlayersInfo = ({ listOfPlayers, currentPlayerID }) => (
  <div className='flex flex-col gap-4'>
    <p className='lekton-bold text-3xl'>
      Jugadores conectados: {listOfPlayers.length}
    </p>
    <div className='border-2 border-gray-600 rounded-lg p-4'>
      <div className='grid grid-cols-2 gap-4 justify-items-center'>
        {listOfPlayers.map((player, index) => (
          <span
            key={index}
            className={`bg-gray-700 px-3 py-1 text-xl lekton-bold w-full text-center ${
              player.playerId === currentPlayerID
                ? 'bg-white text-black'
                : 'text-white'
            }`}
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
  const { isOwner, playerID: currentPlayerID } = useContext(PlayerContext);
  const { game, gameError } = useGetGame(gameId);

  if (!!gameError || (!!game && game.status === 'Ingame')) {
    return <Navigate to='/*' />;
  }

  if (!game) {
    return <LoadingLobby />;
  }

  return (
    <div className='bg-[#0c0c0c] rounded-xl text-[#f1f1f1] text-center flex flex-col pc:gap-10 pc:px-8 pc:py-12 max-w-3xl m-auto gap-6 px-6 py-6'>
      <h2 className='lekton-bold pc:text-6xl underline text-4xl'>
        {game.gameName}
      </h2>
      <ConnectedPlayersInfo
        listOfPlayers={listOfPlayers}
        currentPlayerID={currentPlayerID}
      />
      <div className='flex justify-between text-2xl lekton-bold pc:mx-0 pc:w-full'>
        <p>Mín. jugadores: {game.minPlayers}</p>
        <p>Máx. jugadores: {game.maxPlayers}</p>
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
