import { useCallback, useContext } from 'react';
import { PlayCardLogicContext } from '../contexts/PlayCardLogicProvider';
import usePlayerTurn from './usePlayerTurn';

const usePlayFigureLogic = () => {
  const { isCurrentPlayerTurn } = usePlayerTurn();
  const {
    selectedFigureCard,
    selectedFigureColorCards,
    setSelectedFigureCard,
    setSelectedFigureColorCards,
    resetMovementCards,
    resetFigureCards,
  } = useContext(PlayCardLogicContext);

  const isSelectedFigureCard = useCallback(
    (figureCard) =>
      selectedFigureCard !== null &&
      selectedFigureCard.figureCardId === figureCard.figureCardId,
    [selectedFigureCard]
  );

  const canSelectFigureCard = useCallback(
    () => isCurrentPlayerTurn(),
    [isCurrentPlayerTurn]
  );

  const selectFigureCard = useCallback(
    (figureCard) => {
      if (isSelectedFigureCard(figureCard)) {
        setSelectedFigureCard(null);
      } else {
        setSelectedFigureCard(figureCard);
      }
      setSelectedFigureColorCards([]); // Deselect the color cards
      resetMovementCards(); // Reset the movement cards
    },
    [
      isSelectedFigureCard,
      setSelectedFigureCard,
      setSelectedFigureColorCards,
      resetMovementCards,
    ]
  );

  return {
    selectedFigureCard,
    selectedFigureColorCards,
    isSelectedFigureCard,
    canSelectFigureCard,
    selectFigureCard,
    resetFigureCards,
  };
};

export default usePlayFigureLogic;
