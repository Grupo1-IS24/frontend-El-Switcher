import { createContext, useCallback, useEffect, useState } from 'react';
import usePlayerTurn from '../hooks/usePlayerTurn';

export const PlayCardLogicContext = createContext();

const PlayCardLogicProvider = ({ children }) => {
  const { isCurrentPlayerTurn } = usePlayerTurn();

  const [selectedMovementCard, setSelectedMovementCard] = useState(null);
  const [selectedColorCards, setSelectedColorCards] = useState([]);

  /**
   * Resets the movement logic, deselecting any selected movement and color cards.
   */
  const resetMovementCards = useCallback(() => {
    setSelectedMovementCard(null);
    setSelectedColorCards([]);
  }, []);

  useEffect(() => {
    // Reset logic if it's not the player's turn
    if (!isCurrentPlayerTurn()) {
      resetMovementCards();
    }
  }, [isCurrentPlayerTurn, resetMovementCards]);

  // The provided state for the context.
  const providedState = {
    selectedMovementCard,
    selectedColorCards,
    setSelectedMovementCard,
    setSelectedColorCards,
    resetMovementCards,
  };

  return (
    <PlayCardLogicContext.Provider value={providedState}>
      {children}
    </PlayCardLogicContext.Provider>
  );
};

export default PlayCardLogicProvider;
