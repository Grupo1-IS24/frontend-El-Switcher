const ColorCard = ({
  color = null,
  disabled = true,
  isSelected = false,
  onClick = null,
}) => {
  const colorStyle = {
    RED: 'bg-red-500',
    BLUE: 'bg-blue-500',
    GREEN: 'bg-green-500',
    YELLOW: 'bg-yellow-500',
  };

  return (
    <button
      className={`w-28 h-28 
        ${colorStyle[color] ?? 'bg-gray-500'} border border-black 
        ${disabled ? 'cursor-not-allowed' : ''}
        ${isSelected ? 'transform scale-95 shadow-inner transition-all duration-200' : 'scale-100 transition-all duration-200'}`}
      disabled={disabled}
      onClick={onClick}
    />
  );
};

export default ColorCard;
