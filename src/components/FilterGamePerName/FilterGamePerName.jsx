import TextInput from '../TextInput/TextInput';
import { useState } from 'react';

const FilterGamePerName = ({ onSearch }) => {
  const [search, setsearch] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setsearch(value);
    onSearch(value);
  };

  return (
    <div className='flex justify-center'>
      <div className='w-64'>
        <TextInput
          name='gameName'
          placeholder='Buscar partidas por su nombre'
          value={search}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default FilterGamePerName;
