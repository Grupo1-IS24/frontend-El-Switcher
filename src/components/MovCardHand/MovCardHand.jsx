import MovementCard from '../MovementCard/MovementCard';
import { useContext } from 'react';
import { GameContext } from '../../contexts/GameProvider';
import { PlayMovementLogicContext } from '../../contexts/PlayMovementLogicProvider';
import { PlayerContext } from '../../contexts/PlayerProvider';

const MovCardHand = () => {
  const { movementCards, playerTurnId } = useContext(GameContext);
  const { playerID } = useContext(PlayerContext);
  const { selectMovementCard, isSelectedMovementCard } = useContext(
    PlayMovementLogicContext
  );

  return (
    <div className='flex flex-row gap-6'>
      {movementCards.map((movementCard) => (
        <MovementCard
          key={movementCard.movementcardId}
          movement={movementCard.moveType}
          onClick={() => selectMovementCard(movementCard)}
          isSelected={isSelectedMovementCard(movementCard)}
          disabled={playerID !== playerTurnId}
        />
      ))}
    </div>
  );
};

export default MovCardHand;
