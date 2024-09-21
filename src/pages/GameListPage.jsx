import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import GameGrid from '../components/GameGrid/GameGrid';
import useGetGameList from '../hooks/useGetGameList';
import TitleText from '../components/TitleText/TitleText';
import BackgroundOverlay from '../components/BgOverlay/BgOverlay';
import RefeshButton from '../components/RefeshButton/RefeshButton';

const GameListPage = () => {
  const { gameList, isLoading, error, refreshGameList } = useGetGameList();

  return (
    <div>
      <BackgroundOverlay />
      <div className='relative'>
        <TitleText />
        <RefeshButton isVisible={!isLoading} onPress={refreshGameList} />

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
