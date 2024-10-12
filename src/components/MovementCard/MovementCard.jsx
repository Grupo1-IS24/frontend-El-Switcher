const MovementCard = ({ movement = 0, onClick, isSelected, disabled }) => {
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
      className={`transition-transform duration-300 ${isSelected ? 'translate-y-[-20px]' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      <img src={path} alt={alt} className='w-[80px] h-[140px]' />
    </button>
  );
};

export default MovementCard;
