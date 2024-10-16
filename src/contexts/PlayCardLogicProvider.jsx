import { createContext, useCallback, useEffect, useState } from 'react';
import usePlayerTurn from '../hooks/usePlayerTurn';

export const PlayCardLogicContext = createContext();

const PlayCardLogicProvider = ({ children }) => {
  const { isCurrentPlayerTurn } = usePlayerTurn();

  const [selectedMovementCard, setSelectedMovementCard] = useState(null);
  const [selectedColorCards, setSelectedColorCards] = useState([]);
  const [selectedFigureCard, setSelectedFigureCard] = useState(null);
  const [selectedFigureColorCards, setSelectedFigureColorCards] = useState([]);

  /**
   * Resets the movement logic, deselecting any selected movement and color cards.
   */
  const resetMovementCards = useCallback(() => {
    setSelectedMovementCard(null);
    setSelectedColorCards([]);
  }, []);

  const resetFigureCards = useCallback(() => {
    setSelectedFigureCard(null);
    setSelectedFigureColorCards([]);
  }, []);

  const resetAllCards = useCallback(() => {
    resetMovementCards();
    resetFigureCards();
  }, [resetMovementCards, resetFigureCards]);

  useEffect(() => {
    // Reset logic if it's not the player's turn
    if (!isCurrentPlayerTurn()) {
      resetAllCards();
    }
  }, [isCurrentPlayerTurn, resetAllCards]);

  // The provided state for the context.
  const providedState = {
    selectedMovementCard,
    selectedColorCards,
    selectedFigureCard,
    selectedFigureColorCards,
    setSelectedMovementCard,
    setSelectedColorCards,
    setSelectedFigureCard,
    setSelectedFigureColorCards,
    resetMovementCards,
    resetFigureCards,
  };

  return (
    <PlayCardLogicContext.Provider value={providedState}>
      {children}
    </PlayCardLogicContext.Provider>
  );
};

export default PlayCardLogicProvider;
