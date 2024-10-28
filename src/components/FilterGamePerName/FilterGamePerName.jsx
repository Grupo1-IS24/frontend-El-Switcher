import useFilterGameList from '../../hooks/useFilterGameList';
import TextInput from '../TextInput/TextInput';

const FilterGamePerName = ({ style }) => {
  const { searchGameName, handleSearchGameName } = useFilterGameList();

  return (
    <div className={style}>
      <TextInput
        name='gameName'
        placeholder='Buscar partidas por su nombre'
        value={searchGameName}
        onChange={handleSearchGameName}
      />
    </div>
  );
};

export default FilterGamePerName;
