import { useContext, useCallback } from 'react';
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

  const handleByConnectedPlayers = useCallback(
    (event, setFunction, comparisonFn, comparisonErrorMessage) => {
      const value = parseInt(event.target.value);

      if (isNaN(value)) {
        setFunction('');
        return;
      }

      if (value < 1 || value > 4) {
        showToast({
          type: 'error',
          message: `El valor debe estar entre 1 y 4.`,
        });
        return;
      }

      if (comparisonFn(value)) {
        showToast({
          type: 'error',
          message: comparisonErrorMessage,
        });
        return;
      }

      setFunction(value);
    },
    []
  );

  const handleSearchGameName = useCallback(
    (event) => {
      setSearchGameName(event.target.value);
    },
    [setSearchGameName]
  );

  const handleSearchMinPlayers = useCallback(
    (event) => {
      handleByConnectedPlayers(
        event,
        setSearchMinPlayers,
        (value) => searchMaxPlayers !== '' && value > searchMaxPlayers,
        'El número mínimo de jugadores conectados no puede ser mayor al máximo de jugadores conectados.'
      );
    },
    [handleByConnectedPlayers, searchMaxPlayers, setSearchMinPlayers]
  );

  const handleSearchMaxPlayers = useCallback(
    (event) => {
      handleByConnectedPlayers(
        event,
        setSearchMaxPlayers,
        (value) => searchMinPlayers !== '' && value < searchMinPlayers,
        'El número máximo de jugadores conectados no puede ser menor al mínimo de jugadores conectados.'
      );
    },
    [handleByConnectedPlayers, searchMinPlayers, setSearchMaxPlayers]
  );

  const filterGameList = useCallback(
    (gameList) => {
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
    },
    [searchGameName, searchMinPlayers, searchMaxPlayers]
  );

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
