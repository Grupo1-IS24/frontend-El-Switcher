// src/hooks/useOpponentMovCards.js
import { useCallback, useContext } from 'react';
import { GameContext } from '../contexts/GameProvider';

/**
 * Hook to get the total movement cards of an opponent.
 *
 * @returns {Object} An object with the function `getTotalMovCardsForOpponent`.
 * The function takes a `playerId` as an argument and returns the total movement
 * cards of the opponent with that ID.
 */
const useOpponentMovCards = () => {
  const { opponentsTotalMovCards } = useContext(GameContext);

  const getTotalMovCardsForOpponent = useCallback(
    (playerId) => {
      const opponent = opponentsTotalMovCards.find(
        (opponent) => opponent.playerId === playerId
      );
      return opponent?.totalMovCards ?? 0; // Return 0 if opponent is not found
    },
    [opponentsTotalMovCards]
  );

  return { getTotalMovCardsForOpponent };
};

export default useOpponentMovCards;
