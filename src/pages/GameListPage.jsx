import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import GameGrid from '../components/GameGrid/GameGrid';
import useGetGameList from '../hooks/useGetGameList';
import Button from '../components/Button/Button';

const GameListPage = () => {
  const { gameList, isLoading, error, refreshGameList } = useGetGameList();

  return (
    <div className='relative'>
      {!isLoading && (
        <div className='absolute top-4 left-4'>
          <Button text='🗘' onPress={refreshGameList} />
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
  );
};

export default GameListPage;
