import { useState } from 'react';

const useSelectedGame = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const selectGame = (game) => {
    setSelectedGame(game);
  };

  const clearSelectedGame = () => {
    setSelectedGame(null);
  };

  return {
    selectedGame,
    selectGame,
    clearSelectedGame,
  };
};

export default useSelectedGame;
