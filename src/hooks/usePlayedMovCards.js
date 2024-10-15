import { useCallback, useContext } from 'react';
import { GameContext } from '../contexts/GameProvider';

/**
 * Custom hook to handle played movement cards.
 *
 * @returns {Object} An object containing the following properties:
 * - hasAnyMovementCardPlayed: A function that returns true if any movement card has been played.
 * - areAllMovementCardsPlayed: A function that returns true if all movement cards have been played.
 * - isMovementCardPlayed: A function that returns true if the target movement card has been played.
 */
const usePlayedMovCards = () => {
  const { movementCards } = useContext(GameContext);

  /**
   * Determines if any movement card has been played.
   *
   * @returns {boolean} True if any movement card has been played, otherwise false.
   */
  const hasAnyMovementCardPlayed = useCallback(
    () => movementCards.some((movCard) => movCard.played),
    [movementCards]
  );

  /**
   * Determines if all movement cards have been played.
   *
   * @returns {boolean} True if all movement cards have been played, otherwise false.
   */
  const areAllMovementCardsPlayed = useCallback(
    () => movementCards.every((movCard) => movCard.played),
    [movementCards]
  );

  /**
   * Determines if the target movement card has been played.
   *
   * @param {Object} targetMovCard - The target movement card to check.
   * @returns {boolean} True if the target movement card has been played, otherwise false
   *
   */
  const isMovementCardPlayed = useCallback(
    (targetMovCard) =>
      movementCards.find(
        (movCard) => movCard.movementcardId === targetMovCard.movementcardId
      ).played,
    [movementCards]
  );

  return {
    hasAnyMovementCardPlayed,
    areAllMovementCardsPlayed,
    isMovementCardPlayed,
  };
};

export default usePlayedMovCards;
