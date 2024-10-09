import MovementCard from '../MovementCard/MovementCard';
import { useContext } from 'react';
import { GameContext } from '../../contexts/GameProvider';

const MovCardHand = ({ playerId }) => {
  const { movementCards, listOfPlayers } = useContext(GameContext);
  let invalidCardsCount = 0;

  return (
    <>
      <div className='flex flex-row gap-6'>
        {/* player with index 0 is always the player in the window */}
        {listOfPlayers[0].playerId === playerId
          ? movementCards.map((movementCard) => (
              <MovementCard key={movementCard.movementcardId} movement={movementCard.moveType} />
            ))
          : movementCards.map(() => (
              <MovementCard key={`invalid-${invalidCardsCount++}`} movement={'invalid'} />
            ))}
      </div>
    </>
  );
};

export default MovCardHand;
