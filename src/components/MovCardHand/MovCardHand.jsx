import MovementCard from '../MovementCard/MovementCard';
import { useContext } from 'react';
import { GameContext } from '../../contexts/GameProvider';

const MovCardHand = ({ playerId }) => {
  const { movementCards, listOfPlayers } = useContext(GameContext);

  return (
    <>
      <div className='flex flex-row gap-6'>
        {/* player with index 0 is always the player in the window */}
        {listOfPlayers[0].playerId === playerId
          ? movementCards.map((movementCard, index) => (
              <MovementCard key={index} movement={movementCard.moveType} />
            ))
          : movementCards.map((index) => (
              <MovementCard key={index} movement={'invalid'} />
            ))}
      </div>
    </>
  );
};

export default MovCardHand;
