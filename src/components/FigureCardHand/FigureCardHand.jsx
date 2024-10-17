import FigureCard from '../FigureCard/FigureCard';
import useFigureCards from '../../hooks/useFigureCards';
import usePlayFigureLogic from '../../hooks/usePlayFigureLogic';

const FigureCardHand = () => {
  const { currentPlayerFigureCards } = useFigureCards();
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
        />
      ))}
    </>
  );
};

export default FigureCardHand;
