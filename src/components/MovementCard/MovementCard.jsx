const MovementCard = ({
  movement = 0,
  isSelected = false,
  disabled = true,
  onClick = null,
  isPlayed = false,
}) => {
  const assets = '/src/assets/MovementCards/';
  const isNumberValid =
    typeof movement === 'number' && movement >= 1 && movement <= 7;
  const path = isNumberValid
    ? `${assets}mov${movement}.svg`
    : `${assets}back-mov.svg`;
  const alt = isNumberValid
    ? `Movimiento ${movement}`
    : 'Movimiento de espaldas';

  return (
    <button
      className={`transition-transform duration-300 
        ${isSelected ? 'translate-y-[-20px]' : ''} 
        ${disabled ? 'cursor-not-allowed' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      <img
        src={path}
        alt={alt}
        className={`w-[80px] h-[140px] ${isPlayed ? 'grayscale' : ''}`}
      />
    </button>
  );
};

export default MovementCard;
