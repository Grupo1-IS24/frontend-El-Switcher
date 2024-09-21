import Button from '../Button/Button';

const GameCard = ({
  gameName,
  maxPlayers,
  connectedPlayers,
  onPressButton,
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
      <Button text='Unirme' style={'gameCardButton'} onPress={onPressButton} />
    </div>
  );
};

export default GameCard;
