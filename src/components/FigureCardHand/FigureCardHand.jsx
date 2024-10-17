import FigureCard from '../FigureCard/FigureCard';
import useFigureCards from '../../hooks/useFigureCards';

const FigureCardHand = () => {
  const { currentPlayerFigureCards } = useFigureCards();

  return (
    <>
      {currentPlayerFigureCards.map((figureCard, index) => (
        <FigureCard
          key={index}
          figure={figureCard.figureType}
          difficulty={figureCard.difficulty}
        />
      ))}
    </>
  );
};

export default FigureCardHand;
