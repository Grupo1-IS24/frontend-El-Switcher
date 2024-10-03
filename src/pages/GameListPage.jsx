import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import MessageCard from '../components/MessageCard/MessageCard';
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

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return (
        <MessageCard
          type={'error'}
          message={`Error en el servidor: ${error}`}
        />
      );
    }

    if (gameList.length === 0) {
      return (
        <MessageCard type={'info'} message='No hay partidas disponibles.' />
      );
    }

    return (
      <>
        <GameGrid gameList={gameList} selectGame={selectGame} />
        <JoinGameForm selectedGame={selectedGame} onClose={clearSelectedGame} />
      </>
    );
  };

  return (
    <div>
      <BackgroundOverlay />
      <div className='relative'>
        <TitleText />
        <RefeshButton isVisible={!isLoading} onPress={refreshGameList} />
        {renderContent()}
      </div>
    </div>
  );
};

export default GameListPage;
