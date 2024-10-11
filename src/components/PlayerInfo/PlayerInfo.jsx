import { useContext } from 'react';
import FigureCardHand from '../FigureCardHand/FigureCardHand';
import MovCardHand from '../MovCardHand/MovCardHand';
import { PlayerContext } from '../../contexts/PlayerProvider';
import BackMovCardHand from '../BackMovCardHand/BackMovCardHand';

const PlayerInfo = ({ playerName, playerId, index, isTurn }) => {
  const { playerID: currentPlayerID } = useContext(PlayerContext);

  const positionStyles = [
    'bottom-10 left-16', // corner bottom left
    'top-10 left-16', // corner top left
    'top-10 right-16', // corner top right
    'bottom-10 right-16', // corner bottom right
  ];

  return (
    <div className={`absolute ${positionStyles[index]} p-2`}>
      {currentPlayerID === playerId ? (
        <MovCardHand />
      ) : (
        <BackMovCardHand totalMovCards={3} /> // WARNING: Hardcoded value
      )}
      <FigureCardHand playerId={playerId} />
      <p className='lekton-bold text-white text-lg'>
        {playerName}{' '}
        <span className='text-gray-500'>{isTurn && '(En turno)'}</span>
      </p>
    </div>
  );
};

export default PlayerInfo;
