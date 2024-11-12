import BgOverlay from '../components/BgOverlay/BgOverlay';
import LobbyCard from '../components/LobbyCard/LobbyCard';
import TitleText from '../components/TitleText/TitleText';

const LobbyPage = () => {
  return (
    <div className='pc:w-screen pc:h-screen pc:flex pc:flex-col pc:justify-center'>
      <BgOverlay />
      <div className='relative flex flex-col pc:gap-6'>
        <TitleText />
        <LobbyCard />
      </div>
    </div>
  );
};

export default LobbyPage;
