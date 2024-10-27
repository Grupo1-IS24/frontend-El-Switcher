import MessageCard from '../components/MessageCard/MessageCard';
import GameGrid from '../components/GameGrid/GameGrid';
import TitleText from '../components/TitleText/TitleText';
import BackgroundOverlay from '../components/BgOverlay/BgOverlay';
import GameForm from '../components/GameForm/GameForm';
import useSelectedGame from '../hooks/useSelectedGame';
import useWebsocketGameList from '../hooks/useWebsocketGameList';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import FilterGamePerName from '../components/FilterGamePerName/FilterGamePerName';
import { useState } from 'react';

const GameListPage = () => {
  const { gameList, isLoading, error } = useWebsocketGameList();
  const { selectedGame, selectGame, clearSelectedGame } = useSelectedGame();
  const [searchGame, setSearchGame] = useState('');

  const handleSearch = (value) => {
    setSearchGame(value);
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <MessageCard type={'error'} message={error} />;
    }

    if (gameList.length === 0) {
      return (
        <MessageCard type={'info'} message='No hay partidas disponibles.' />
      );
    }

    return (
      <>
        <FilterGamePerName onSearch={handleSearch} />
        <GameGrid
          gameList={gameList}
          selectGame={selectGame}
          searchGame={searchGame}
        />
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
