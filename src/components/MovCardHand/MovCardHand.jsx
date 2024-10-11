import MovementCard from '../MovementCard/MovementCard';
import { useContext } from 'react';
import { GameContext } from '../../contexts/GameProvider';

const MovCardHand = () => {
  const { movementCards } = useContext(GameContext);

  return (
    <div className='flex flex-row gap-6'>
      {movementCards.map((movementCard) => (
        <MovementCard
          key={movementCard.movementcardId}
          movement={movementCard.moveType}
        />
      ))}
    </div>
  );
};

export default MovCardHand;
