import useFilterGameList from '../../hooks/useFilterGameList';
import TextInput from '../TextInput/TextInput';

const FilterGamePerName = () => {
  const { searchGame, setSearchGame } = useFilterGameList();

  const handleInputChange = (event) => {
    setSearchGame(event.target.value);
  };

  return (
    <div className='flex justify-center'>
      <div className='w-64'>
        <TextInput
          name='gameName'
          placeholder='Buscar partidas por su nombre'
          value={searchGame}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default FilterGamePerName;
