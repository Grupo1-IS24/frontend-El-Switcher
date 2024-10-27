import useFilterGameList from '../../hooks/useFilterGameList';
import TextInput from '../TextInput/TextInput';

const FilterGamePerName = () => {
  const { searchGameName, handleSearchGameName } = useFilterGameList();

  return (
    <div className='flex justify-center'>
      <div className='w-64'>
        <TextInput
          name='gameName'
          placeholder='Buscar partidas por su nombre'
          value={searchGameName}
          onChange={handleSearchGameName}
        />
      </div>
    </div>
  );
};

export default FilterGamePerName;
