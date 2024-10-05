import MessageCard from '../components/MessageCard/MessageCard';
import GameGrid from '../components/GameGrid/GameGrid';
import TitleText from '../components/TitleText/TitleText';
import BackgroundOverlay from '../components/BgOverlay/BgOverlay';
import JoinGameForm from '../components/JoinGameForm/JoinGameForm';
import useSelectedGame from '../hooks/useSelectedGame';
import useWebsocketGameList from '../hooks/useWebsocketGameList';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const GameListPage = () => {
  const { gameList, isLoading } = useWebsocketGameList();
  const { selectedGame, selectGame, clearSelectedGame } = useSelectedGame();

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
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
        {renderContent()}
      </div>
    </div>
  );
};

export default GameListPage;
