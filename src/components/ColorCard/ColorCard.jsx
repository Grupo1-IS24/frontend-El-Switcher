const ColorCard = ({
  color = null,
  disabled = true,
  isSelected = false,
  isPartOfFigure = false,
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
      className={`w-24 h-24
        ${colorStyle[color] ?? 'bg-gray-500'} rounded
        ${disabled ? 'cursor-not-allowed' : ''}
        ${isSelected ? 'transform scale-90 shadow-inner border-4 border-white transition-all duration-200' : 'scale-100 transition-all duration-200'}
        ${isPartOfFigure ? 'border-4' : ''}`}
      disabled={disabled}
      onClick={onClick}
    />
  );
};

export default ColorCard;
