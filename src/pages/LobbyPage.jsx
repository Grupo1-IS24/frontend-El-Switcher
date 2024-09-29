import BgOverlay from '../components/BgOverlay/BgOverlay';
import LobbyCard from '../components/LobbyCard/LobbyCard';
import TitleText from '../components/TitleText/TitleText';

const LobbyPage = () => {
  return (
    <>
      <BgOverlay />
      <div className='relative flex flex-col gap-6'>
        <TitleText />
        <LobbyCard />
      </div>
    </>
  );
};

export default LobbyPage;
