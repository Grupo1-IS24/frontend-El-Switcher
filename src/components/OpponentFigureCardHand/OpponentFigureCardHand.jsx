import useFigureCards from '../../hooks/useFigureCards';
import usePlayFigureLogic from '../../hooks/usePlayFigureLogic';
import FigureCard from '../FigureCard/FigureCard';

const OpponentFigureCardHand = ({ playerId }) => {
  const { getFigureCardsByPlayerId } = useFigureCards();
  const { selectFigureCard, isSelectedFigureCard, canSelectFigureCard } =
    usePlayFigureLogic();

  return (
    <>
      {getFigureCardsByPlayerId(playerId).map((figureCard, index) => (
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

export default OpponentFigureCardHand;
