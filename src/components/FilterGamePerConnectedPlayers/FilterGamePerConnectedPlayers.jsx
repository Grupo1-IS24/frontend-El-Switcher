import useFilterGameList from '../../hooks/useFilterGameList';
import NumberInput from '../NumberInput/NumberInput';

const FilterGamePerConnectedPlayers = () => {
  const {
    searchMaxPlayers,
    handleSearchMaxPlayers,
    searchMinPlayers,
    handleSearchMinPlayers,
  } = useFilterGameList();

  return (
    <>
      <NumberInput
        name='minPlayers'
        min={1}
        max={searchMaxPlayers || 4}
        placeholder='Mín. conectados'
        value={searchMinPlayers}
        onChange={handleSearchMinPlayers}
      />
      <NumberInput
        name='maxPlayers'
        min={searchMinPlayers || 1}
        max={4}
        placeholder='Máx. conectados'
        value={searchMaxPlayers}
        onChange={handleSearchMaxPlayers}
      />
    </>
  );
};

export default FilterGamePerConnectedPlayers;
