import MovementCard from '../MovementCard/MovementCard';
import { useContext } from 'react';
import { GameContext } from '../../contexts/GameProvider';
import usePlayedMovCards from '../../hooks/usePlayedMovCards';
import usePlayMovementLogic from '../../hooks/usePlayMovementLogic';

const MovCardHand = () => {
  const { movementCards } = useContext(GameContext);
  const { selectMovementCard, isSelectedMovementCard, canSelectMovementCard } =
    usePlayMovementLogic();
  const { isMovementCardPlayed } = usePlayedMovCards();

  return (
    <div className='flex flex-row gap-6'>
      {movementCards.map((movementCard) => (
        <MovementCard
          key={movementCard.movementcardId}
          movement={movementCard.moveType}
          isSelected={isSelectedMovementCard(movementCard)}
          disabled={!canSelectMovementCard(movementCard)}
          onClick={() => selectMovementCard(movementCard)}
          isPlayed={isMovementCardPlayed(movementCard)}
        />
      ))}
    </div>
  );
};

export default MovCardHand;
