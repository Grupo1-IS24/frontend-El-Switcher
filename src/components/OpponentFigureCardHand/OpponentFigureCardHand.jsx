import useFigureCards from '../../hooks/useFigureCards';
import FigureCard from '../FigureCard/FigureCard';

const OpponentFigureCardHand = ({ playerId }) => {
  const { getFigureCardsByPlayerId } = useFigureCards();

  return (
    <>
      {getFigureCardsByPlayerId(playerId).map((figureCard, index) => (
        <FigureCard
          key={index}
          figure={figureCard.figureType}
          difficulty={figureCard.difficulty}
        />
      ))}
    </>
  );
};

export default OpponentFigureCardHand;
