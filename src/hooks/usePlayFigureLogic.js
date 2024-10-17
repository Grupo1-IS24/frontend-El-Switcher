import { useCallback, useContext } from 'react';
import { PlayCardLogicContext } from '../contexts/PlayCardLogicProvider';
import usePlayerTurn from './usePlayerTurn';
import { isEqualColorCard } from '../utils/isEqualColorCard';
import useFoundFigures from './useFoundFigures';

const usePlayFigureLogic = () => {
  const { isCurrentPlayerTurn } = usePlayerTurn();
  const { findFigureByColorCard, isColorCardInFoundFigure } = useFoundFigures();
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

  const isSelectedFigureColorCard = useCallback(
    (targetColorCard) =>
      selectedFigureColorCards.some((colorCard) =>
        isEqualColorCard(colorCard, targetColorCard)
      ),
    [selectedFigureColorCards]
  );

  const canSelectFigureColorCard = useCallback(
    (colorCard) =>
      isCurrentPlayerTurn() &&
      selectedFigureCard !== null &&
      isColorCardInFoundFigure(colorCard),
    [isCurrentPlayerTurn, selectedFigureCard, isColorCardInFoundFigure]
  );

  const selectFigureColorCard = useCallback(
    (colorCard) => {
      if (isSelectedFigureColorCard(colorCard)) {
        setSelectedFigureColorCards([]); // Deselect the figure color cards
      } else {
        setSelectedFigureColorCards(findFigureByColorCard(colorCard));
      }
    },
    [
      selectedFigureColorCards,
      setSelectedFigureColorCards,
      findFigureByColorCard,
    ]
  );

  return {
    selectedFigureCard,
    selectedFigureColorCards,
    isSelectedFigureCard,
    canSelectFigureCard,
    selectFigureCard,
    isSelectedFigureColorCard,
    canSelectFigureColorCard,
    selectFigureColorCard,
    resetFigureCards,
  };
};

export default usePlayFigureLogic;
