import useWebSocketGame from '../../hooks/useWebsocketGame';
import FigureCard from '../FigureCard/FigureCard';

const FigureCardHand = ({ playerId }) => {
  const { figureCards } = useWebSocketGame();

  const playerFigureCards = figureCards.find(
    (figurecardSet) => figurecardSet.ownerId === playerId
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
