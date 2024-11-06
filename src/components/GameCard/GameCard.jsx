import Button from '../Button/Button';
import locked from '../../assets/Icons/padlock-locked.svg';
import unlocked from '../../assets/Icons/padlock-unlocked.svg';

const GameCard = ({
  gameName,
  maxPlayers,
  connectedPlayers,
  onPressButton,
  isPublic,
}) => {
  return (
    <div className='font-medium font-poppins text-white bg-gray-800 rounded-lg shadow-lg p-5 m-2 w-72 text-center'>
      <h2 className='lekton-bold text-[32px] underline whitespace-nowrap overflow-hidden text-ellipsis font-semibold'>
        {gameName}
      </h2>
      <p className='lekton-regular text-lg my-1'>
        Conectados: {connectedPlayers}
      </p>
      <p className='lekton-regular text-lg my-1'>
        Max. jugadores: {maxPlayers}
      </p>
      <div>
        <Button text='Unirme' style={'borderButton'} onPress={onPressButton} />
        <img
          src={isPublic ? unlocked : locked}
          alt='Icono de candado'
          className='w-7 h-7 inline-block ml-2'
        />
      </div>
    </div>
  );
};

export default GameCard;
