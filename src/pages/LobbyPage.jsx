import { useContext } from 'react';
import BgOverlay from '../components/BgOverlay/BgOverlay';
import LobbyCard from '../components/LobbyCard/LobbyCard';
import TitleText from '../components/TitleText/TitleText';
import { PlayerContext } from '../contexts/PlayerProvider';
import { useParams } from 'react-router-dom';

const LobbyPage = () => {
  const { gameId } = useParams();
  const { playerID, isOwner } = useContext(PlayerContext);

  return (
    <>
      <BgOverlay />
      <div className='relative flex flex-col gap-6'>
        <TitleText />
        <LobbyCard gameID={gameId} playerID={playerID} isOwner={isOwner} />
      </div>
    </>
  );
};

export default LobbyPage;
