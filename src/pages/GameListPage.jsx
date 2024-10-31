import MessageCard from '../components/MessageCard/MessageCard';
import GameGrid from '../components/GameGrid/GameGrid';
import TitleText from '../components/TitleText/TitleText';
import BackgroundOverlay from '../components/BgOverlay/BgOverlay';
import GameForm from '../components/GameForm/GameForm';
import useSelectedGame from '../hooks/useSelectedGame';
import useWebsocketGameList from '../hooks/useWebsocketGameList';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import FilterGameListProvider from '../contexts/FilterGameListProvider';
import FilterGameInfo from '../components/FilterGameInfo/FilterGameInfo';
import LeaveGameListButton from '../components/LeaveGameListButton/LeaveGameListButton';

const GameListPage = () => {
  const { gameList, isLoading, error } = useWebsocketGameList();
  const { selectedGame, selectGame, clearSelectedGame } = useSelectedGame();

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <MessageCard type={'error'} message={error} />;
    }

    if (gameList.length === 0) {
      return (
        <>
          <LeaveGameListButton />
          <MessageCard type={'info'} message='No hay partidas disponibles.' />
        </>
      );
    }

    return (
      <>
        <FilterGameListProvider>
          <FilterGameInfo />
          <LeaveGameListButton />
          <GameGrid gameList={gameList} selectGame={selectGame} />
        </FilterGameListProvider>
        <GameForm
          type='join'
          selectedGame={selectedGame}
          onClose={clearSelectedGame}
        />
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
