const NumberInput = ({ name, min, max, placeholder = '' }) => {
  return (
    <input
      type='number'
      name={name}
      min={min}
      max={max}
      placeholder={placeholder}
      className='w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500'
    />
  );
};

export default NumberInput;
