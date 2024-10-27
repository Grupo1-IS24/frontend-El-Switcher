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

  const handleSearchMinPlayers = (event) => {
    const minPlayers = parseInt(event.target.value);

    if (
      isNaN(minPlayers) ||
      minPlayers < 1 ||
      minPlayers > 4 ||
      minPlayers > searchMaxPlayers
    ) {
      return;
    }

    setSearchMinPlayers(minPlayers);
  };

  const handleSearchMaxPlayers = (event) => {
    const maxPlayers = parseInt(event.target.value);

    if (
      isNaN(maxPlayers) ||
      maxPlayers < 1 ||
      maxPlayers > 4 ||
      maxPlayers < searchMinPlayers
    ) {
      return;
    }

    setSearchMaxPlayers(maxPlayers);
  };

  const filterGameList = (gameList) => {
    return gameList.filter(
      (game) =>
        game.connectedPlayers >= searchMinPlayers &&
        game.connectedPlayers <= searchMaxPlayers &&
        game.gameName.toLowerCase().startsWith(searchGameName.toLowerCase())
    );
  };

  return {
    searchGameName,
    searchMinPlayers,
    searchMaxPlayers,
    handleSearchGameName,
    handleSearchMinPlayers,
    handleSearchMaxPlayers,
    filterGameList,
    resetFilter,
  };
};

export default useFilterGameList;
