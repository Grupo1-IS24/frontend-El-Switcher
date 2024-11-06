import FigureCard from '../FigureCard/FigureCard';
import useFigureCards from '../../hooks/useFigureCards';
import usePlayFigureLogic from '../../hooks/usePlayFigureLogic';

const FigureCardHand = () => {
  const { currentPlayerFigureCards, isFigureCardBlocked } = useFigureCards();
  const { selectFigureCard, isSelectedFigureCard, canSelectFigureCard } =
    usePlayFigureLogic();

  return (
    <>
      {currentPlayerFigureCards.map((figureCard, index) => (
        <FigureCard
          key={index}
          figure={figureCard.figureType}
          difficulty={figureCard.difficulty}
          isSelected={isSelectedFigureCard(figureCard)}
          disabled={!canSelectFigureCard(figureCard)}
          onClick={() => selectFigureCard(figureCard)}
          isBlocked={isFigureCardBlocked(figureCard)}
        />
      ))}
    </>
  );
};

export default FigureCardHand;
