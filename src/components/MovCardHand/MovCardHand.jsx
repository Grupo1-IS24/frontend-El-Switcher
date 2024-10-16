import MovementCard from '../MovementCard/MovementCard';
import { useContext } from 'react';
import { GameContext } from '../../contexts/GameProvider';
import { PlayCardLogicContext } from '../../contexts/PlayCardLogicProvider';
import usePlayedMovCards from '../../hooks/usePlayedMovCards';

const MovCardHand = () => {
  const { movementCards } = useContext(GameContext);
  const { selectMovementCard, isSelectedMovementCard, canSelectMovementCard } =
    useContext(PlayCardLogicContext);
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
