import { useContext } from 'react';
import { FilterGameListContext } from '../contexts/FilterGameListProvider';
import showToast from '../utils/toastUtil';

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

    if (isNaN(minPlayers)) {
      setSearchMinPlayers('');
      return;
    }

    if (minPlayers < 1 || minPlayers > 4) {
      showToast({
        type: 'error',
        message:
          'El número mínimo de jugadores conectados debe estar entre 1 y 4.',
      });
      return;
    }

    if (searchMaxPlayers !== '' && minPlayers > searchMaxPlayers) {
      showToast({
        type: 'error',
        message:
          'El número mínimo de jugadores conectados no puede ser mayor al máximo de jugadores conectados.',
      });
      return;
    }

    setSearchMinPlayers(minPlayers);
  };

  const handleSearchMaxPlayers = (event) => {
    const maxPlayers = parseInt(event.target.value);

    if (isNaN(maxPlayers)) {
      setSearchMaxPlayers('');
      return;
    }

    if (maxPlayers < 1 || maxPlayers > 4) {
      showToast({
        type: 'error',
        message:
          'El número máximo de jugadores conectados debe estar entre 1 y 4.',
      });
      return;
    }

    if (searchMinPlayers !== '' && maxPlayers < searchMinPlayers) {
      showToast({
        type: 'error',
        message:
          'El número máximo de jugadores conectados no puede ser menor al mínimo de jugadores conectados.',
      });
      return;
    }

    setSearchMaxPlayers(maxPlayers);
  };

  const filterGameList = (gameList) => {
    return gameList.filter((game) => {
      const minPlayersCondition =
        searchMinPlayers === '' || game.connectedPlayers >= searchMinPlayers;

      const maxPlayersCondition =
        searchMaxPlayers === '' || game.connectedPlayers <= searchMaxPlayers;

      const nameCondition = game.gameName
        .toLowerCase()
        .startsWith(searchGameName.toLowerCase());

      return minPlayersCondition && maxPlayersCondition && nameCondition;
    });
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
