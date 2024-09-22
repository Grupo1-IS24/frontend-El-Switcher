import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import GameGrid from '../components/GameGrid/GameGrid';
import useGetGameList from '../hooks/useGetGameList';
import TitleText from '../components/TitleText/TitleText';
import BackgroundOverlay from '../components/BgOverlay/BgOverlay';
import RefeshButton from '../components/RefeshButton/RefeshButton';
import JoinGameForm from '../components/JoinGameForm/JoinGameForm';
import useSelectedGame from '../hooks/useSelectedGame';

const GameListPage = () => {
  const { gameList, isLoading, error, refreshGameList } = useGetGameList();
  const { selectedGame, selectGame, clearSelectedGame } = useSelectedGame();

  return (
    <div>
      <BackgroundOverlay />
      <div className='relative'>
        <TitleText />
        <RefeshButton isVisible={!isLoading} onPress={refreshGameList} />

        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage error={error} />
        ) : (
          <>
            <GameGrid gameList={gameList} selectGame={selectGame} />
            <JoinGameForm
              selectedGame={selectedGame}
              onClose={clearSelectedGame}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default GameListPage;
