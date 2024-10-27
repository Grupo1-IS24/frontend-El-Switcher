import { createContext, useState } from 'react';

export const FilterGameListContext = createContext();

const FilterGameListProvider = ({ children }) => {
  const [searchGameName, setSearchGameName] = useState('');
  const [searchMinPlayers, setSearchMinPlayers] = useState("");
  const [searchMaxPlayers, setSearchMaxPlayers] = useState("");

  const resetFilter = () => {
    setSearchGameName('');
    setSearchMinPlayers("");
    setSearchMaxPlayers("");
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
