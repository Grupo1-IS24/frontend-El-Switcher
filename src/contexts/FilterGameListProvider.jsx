import { createContext, useState } from 'react';

export const FilterGameListContext = createContext();

const FilterGameListProvider = ({ children }) => {
  const [searchGame, setSearchGame] = useState('');

  const resetFilter = () => {
    setSearchGame('');
  };

  const providedState = {
    searchGame,
    setSearchGame,
    resetFilter,
  };

  return (
    <FilterGameListContext.Provider value={providedState}>
      {children}
    </FilterGameListContext.Provider>
  );
};

export default FilterGameListProvider;
