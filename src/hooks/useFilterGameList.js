import { useContext } from 'react';
import { FilterGameListContext } from '../contexts/FilterGameListProvider';

const useFilterGameList = () => {
  const { searchGame, setSearchGame, resetFilter } = useContext(
    FilterGameListContext
  );

  const filterGameList = (gameList) => {
    return gameList.filter(
      (game) =>
        game.connectedPlayers < game.maxPlayers &&
        game.gameName.toLowerCase().startsWith(searchGame.toLowerCase())
    );
  };

  return { searchGame, setSearchGame, filterGameList, resetFilter };
};

export default useFilterGameList;
