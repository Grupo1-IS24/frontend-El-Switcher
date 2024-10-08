import React, { useContext } from 'react';
import { PlayerContext } from '../../contexts/PlayerProvider';
import useWebSocketGame from '../../hooks/useWebsocketGame';
import FigureCard from '../FigureCard/FigureCard';

const FigureCardHand = () => {
  const { playerID } = useContext(PlayerContext);
  const { figureCards } = useWebSocketGame();
  console.log(figureCards);

  const playerFigureCards = figureCards.find(
    (figurecardSet) => figurecardSet.ownerId === playerID
  );
  

  return (
    <>
      {playerFigureCards ? (
        <div className="flex flex-row gap-2">
          {playerFigureCards.cards.map((figurecard, index) => (
            <FigureCard
              key={index}
              figure={figurecard.figureType}
              difficulty={figurecard.difficulty}
            />
          ))}
        </div>
      ) : (
        <p>No tienes cartas.</p>
      )}
    </>
  );
};

export default FigureCardHand;
