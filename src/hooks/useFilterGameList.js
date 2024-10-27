import { useContext } from 'react';
import { FilterGameListContext } from '../contexts/FilterGameListProvider';

const useFilterGameList = () => {
  const {
    searchGameName,
    setSearchGameName,
    searchMinPlayers,
    setSearchMinPlayers,
    searchMaxPlayers,
    setSearchMaxPlayers,
    resetFilter,
  } = useContext(FilterGameListContext);

  const handleSearchGameName = (event) => {
    setSearchGameName(event.target.value);
  };

  const filterGameList = (gameList) => {
    return gameList.filter(
      (game) =>
        game.connectedPlayers < game.maxPlayers &&
        game.gameName.toLowerCase().startsWith(searchGameName.toLowerCase())
    );
  };

  return { searchGameName, handleSearchGameName, filterGameList, resetFilter };
};

export default useFilterGameList;
