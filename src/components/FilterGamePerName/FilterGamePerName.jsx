import useFilterGameList from '../../hooks/useFilterGameList';
import TextInput from '../TextInput/TextInput';

const FilterGamePerName = () => {
  const { searchGameName, handleSearchGameName } = useFilterGameList();

  return (
    <TextInput
      name='gameName'
      placeholder='Buscar partidas por su nombre'
      value={searchGameName}
      onChange={handleSearchGameName}
    />
  );
};

export default FilterGamePerName;
