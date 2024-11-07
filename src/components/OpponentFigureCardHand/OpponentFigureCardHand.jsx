import useFigureCards from '../../hooks/useFigureCards';
import usePlayFigureLogic from '../../hooks/usePlayFigureLogic';
import { isFigureCardBlocked } from '../../utils/figureCardUtils';
import FigureCard from '../FigureCard/FigureCard';

const OpponentFigureCardHand = ({ playerId }) => {
  const { getFigureCardsByPlayerId, hasBlockedFigureCardByPlayerId } =
    useFigureCards();
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
          disabled={
            !canSelectFigureCard(figureCard) ||
            hasBlockedFigureCardByPlayerId(playerId)
          }
          onClick={() => selectFigureCard(figureCard)}
          isBlocked={isFigureCardBlocked(figureCard)}
        />
      ))}
    </>
  );
};

export default OpponentFigureCardHand;
