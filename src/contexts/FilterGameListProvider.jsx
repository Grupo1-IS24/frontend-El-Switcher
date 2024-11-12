import { createContext, useState } from 'react';

export const FilterGameListContext = createContext();

const FilterGameListProvider = ({ children }) => {
  // State to manage the search by game name.
  const [searchGameName, setSearchGameName] = useState('');

  // State to manage the search by minimum players. Must be a number between 1 and 4 or an empty string.
  const [searchMinPlayers, setSearchMinPlayers] = useState('');

  // State to manage the search by maximum players. Must be a number between 1 and 4 or an empty string.
  const [searchMaxPlayers, setSearchMaxPlayers] = useState('');

  /**
   * Resets the search parameters to their default values.
   *
   * @returns {void}
   */
  const resetFilter = () => {
    setSearchGameName('');
    setSearchMinPlayers('');
    setSearchMaxPlayers('');
  };

  const providedState = {
    searchGameName,
    setSearchGameName,
    searchMinPlayers,
    setSearchMinPlayers,
    searchMaxPlayers,
    setSearchMaxPlayers,
    resetFilter,
  };

  return (
    <FilterGameListContext.Provider value={providedState}>
      {children}
    </FilterGameListContext.Provider>
  );
};

export default FilterGameListProvider;
