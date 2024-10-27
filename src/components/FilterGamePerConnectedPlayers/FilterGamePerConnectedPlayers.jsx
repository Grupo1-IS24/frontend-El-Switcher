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
        max={4}
        placeholder='Mínimo de jugadores conectados'
        value={searchMinPlayers}
        onChange={handleSearchMinPlayers}
      />
      <NumberInput
        name='maxPlayers'
        min={1}
        max={4}
        placeholder='Máximo de jugadores conectados'
        value={searchMaxPlayers}
        onChange={handleSearchMaxPlayers}
      />
    </>
  );
};

export default FilterGamePerConnectedPlayers;
