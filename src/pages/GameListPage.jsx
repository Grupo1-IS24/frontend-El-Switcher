import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import GameGrid from '../components/GameGrid/GameGrid';
import useGetGameList from '../hooks/useGetGameList';
import Button from '../components/Button/Button';
import TitleText from '../components/TitleText/TitleText';
import BackgroundOverlay from '../components/BgOverlay/BgOverlay';

const GameListPage = () => {
  const { gameList, isLoading, error, refreshGameList } = useGetGameList();

  return (
    <div>
      <BackgroundOverlay />
      <div className='relative'>
        <TitleText />
        {!isLoading && (
          <div className='absolute top-4 left-4'>
            <Button text='🗘' onPress={refreshGameList} style={'formButton'} />
          </div>
        )}

        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage error={error} onRetry={refreshGameList} />
        ) : (
          <GameGrid gameList={gameList} />
        )}
      </div>
    </div>
  );
};

export default GameListPage;
