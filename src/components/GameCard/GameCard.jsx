import './GameCard.css';

const GameCard = ({ gameName, maxPlayers, connectedPlayers }) => {
  return (
    <div className='game-card font-semibold'>
      <h2 className='text-[32px] underline'>{gameName}</h2>
      <p>Conectados: {connectedPlayers}</p>
      <p>Max. jugadores: {maxPlayers}</p>
      <button className='join-button'>Unirme</button>
    </div>
  );
};

export default GameCard;
