import { useContext, useCallback } from 'react';
import { FilterGameListContext } from '../contexts/FilterGameListProvider';
import showToast from '../utils/toastUtil';

/**
 * Custom hook to manage game filtering logic by game name, minimum players, and maximum players.
 * This hook utilizes the FilterGameListContext to control search parameters and provides
 * handlers for interacting with those parameters.
 *
 * @returns {{
 *  searchGameName: string,
 *  searchMinPlayers: string | number,
 *  searchMaxPlayers: string | number,
 *  handleSearchGameName: function,
 *  handleSearchMinPlayers: function,
 *  handleSearchMaxPlayers: function,
 *  filterGameList: function,
 *  resetFilter: function,
 * }}
 */
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

  /**
   * Generalized handler for updating search parameters based on connected players.
   *
   * @param {Event} event - The event object from the input field.
   * @param {function} setFunction - The function to update the search parameter.
   * @param {function} comparisonFn - The function to compare the new value with the other connected players parameter.
   * @param {string} comparisonErrorMessage - The error message to display if the comparison fails.
   * @returns {void}
   */
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

  /**
   * Handler to update the search game name parameter.
   *
   * @param {Event} event - The event object from the input field.
   * @returns {void}
   */
  const handleSearchGameName = useCallback(
    (event) => {
      setSearchGameName(event.target.value);
    },
    [setSearchGameName]
  );

  /**
   * Handler to update the search minimum players parameter.
   *
   * @param {Event} event - The event object from the input field.
   * @returns {void}
   *
   */
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

  /**
   * Handler to update the search maximum players parameter.
   *
   * @param {Event} event - The event object from the input field.
   * @returns {void}
   */
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

  /**
   * Filters the game list based on the search parameters.
   *
   * @param {Array} gameList - The list of games to filter.
   * @returns {Array} The filtered list of games.
   */
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
