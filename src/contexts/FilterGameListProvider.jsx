import { createContext, useState } from 'react';

export const FilterGameListContext = createContext();

const FilterGameListProvider = ({ children }) => {
  const [searchGameName, setSearchGameName] = useState('');
  const [searchMinPlayers, setSearchMinPlayers] = useState(1);
  const [searchMaxPlayers, setSearchMaxPlayers] = useState(4);

  const resetFilter = () => {
    setSearchGameName('');
    setSearchMinPlayers(1);
    setSearchMaxPlayers(4);
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
