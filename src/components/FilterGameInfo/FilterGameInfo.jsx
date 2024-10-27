import useFilterGameList from '../../hooks/useFilterGameList';
import Button from '../Button/Button';
import FilterGamePerConnectedPlayers from '../FilterGamePerConnectedPlayers/FilterGamePerConnectedPlayers';
import FilterGamePerName from '../FilterGamePerName/FilterGamePerName';

const FilterGameInfo = () => {
  const { resetFilter } = useFilterGameList();

  return (
    <div className='flex justify-center items-center p-4'>
      <div className='grid grid-cols-4 gap-4 max-w-2xl w-full z-10 p-6'>
        <FilterGamePerName style={'col-span-2'} />
        <FilterGamePerConnectedPlayers />
      </div>
      <Button text='Reset filtro' style='reset_filter' onPress={resetFilter} />
    </div>
  );
};

export default FilterGameInfo;
