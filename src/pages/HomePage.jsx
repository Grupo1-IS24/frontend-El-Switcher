import CreateGameButton from '../components/CreateGameButton/CreateGameButton';
import JoinGameButton from '../components/JoinGameButton/JoinGameButton';

const HomePage = () => {
  return (
    <div className='bg-gray-950 w-screen h-screen flex flex-col gap-10'>
      <h1 className='text-white text-9xl text-center mt-10'>El switcher</h1>
      <div className='flex flex-row align-center justify-center gap-10'>
        <CreateGameButton />
        <JoinGameButton />
      </div>
    </div>
  );
};

export default HomePage;
