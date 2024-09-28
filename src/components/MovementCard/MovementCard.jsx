const MovementCard = ({ movement = 0 }) => {
  const assets = '/src/assets/MovementCards/';
  const isNumberValid =
    typeof movement === 'number' && movement >= 1 && movement <= 7;
  const path = isNumberValid
    ? `${assets}mov${movement}.svg`
    : `${assets}back-mov.svg`;
  const alt = isNumberValid
    ? `Movimiento ${movement}`
    : 'Movimiento de espaldas';

  return <img src={path} alt={alt} className='w-[80px] h-[140px]' />;
};

export default MovementCard;
