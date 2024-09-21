import BackgroundOverlay from '../components/BgOverlay/BgOverlay';
import CreateGameButton from '../components/CreateGameButton/CreateGameButton';
import JoinGameButton from '../components/JoinGameButton/JoinGameButton';
import TitleText from '../components/TitleText/TitleText';

const HomePage = () => {
  return (
    <div className='w-screen h-screen'>
      <BackgroundOverlay />
      <div className='absolute inset-0 flex flex-col items-center justify-center gap-10'>
        <TitleText />
        <div className='flex flex-row items-center justify-center gap-10 mb-20'>
          <CreateGameButton />
          <JoinGameButton />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
