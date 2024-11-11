import BgOverlay from '../components/BgOverlay/BgOverlay';
import LobbyCard from '../components/LobbyCard/LobbyCard';
import TitleText from '../components/TitleText/TitleText';

const LobbyPage = () => {
  return (
    <div className='w-screen h-screen flex flex-col justify-center'>
      <BgOverlay />
      <div className='relative flex flex-col '>
        <TitleText />
        <LobbyCard />
      </div>
    </div>
  );
};

export default LobbyPage;
