import useWebsocketLobby from '../../hooks/useWebsocketLobby';
import LeaveButton from '../LeaveButton/LeaveButton';
import StartGameButton from '../StartGameButton/StartGameButton';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { useContext } from 'react';
import useGetGame from '../../hooks/useGetGame';
import { useParams } from 'react-router-dom';
import LoadingLobby from '../LoadingLobby/LoadingLobby';

const PlayerInfo = ({ listOfPlayers, minPlayers, maxPlayers }) => (
  <div className='flex flex-col gap-0'>
    <p className='lekton-bold text-4xl'>
      Jugadores conectados: {listOfPlayers.length}
    </p>
    <p className='lekton-bold text-4xl'>Mín. jugadores: {minPlayers}</p>
    <p className='lekton-bold text-4xl'>Max. jugadores: {maxPlayers}</p>
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
    <div className='bg-[#0c0c0c] rounded-xl text-[#f1f1f1] text-center flex flex-col gap-16 px-8 py-12 max-w-3xl m-auto'>
      <h2 className='lekton-bold text-6xl underline'>{game.gameName}</h2>
      <PlayerInfo
        listOfPlayers={listOfPlayers}
        minPlayers={game.minPlayers}
        maxPlayers={game.maxPlayers}
      />
      {isOwner ? (
        <OwnerActions canStartGame={canStartGame} />
      ) : (
        <NonOwnerActions />
      )}
    </div>
  );
};

export default LobbyCard;
