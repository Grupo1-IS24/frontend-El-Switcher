import { useContext, useCallback } from 'react';
import { GameContext } from '../contexts/GameProvider';
import { isEqualColorCard } from '../utils/isEqualColorCard';

/**
 * Custom hook for finding figures by color cards.
 *
 * @returns {object} An object containing:
 * - findFigureByColorCard: Function to find a figure by a color card.
 * - isColorCardInAnyFigure: Function to determine if a color card is part of any figure.
 */
const useFoundFigures = () => {
  const { foundFigures } = useContext(GameContext);

  /**
   * Finds a figure by a color card.
   *
   * @param {object} targetColorCard - The color card to search for.
   * @returns {array} The figure that contains the color card, or an empty array if not found
   */
  const findFigureByColorCard = useCallback(
    (targetColorCard) => {
      return (
        foundFigures.find((figureColorCards) =>
          figureColorCards.some((colorCard) =>
            isEqualColorCard(colorCard, targetColorCard)
          )
        ) ?? []
      );
    },
    [foundFigures]
  );

  /**
   * Determines if a color card is part of any figure.
   *
   * @param {object} targetColorCard - The color card to search for.
   * @returns {boolean} True if the color card is part of any figure, otherwise false
   */
  const isColorCardInAnyFigure = useCallback(
    (targetColorCard) =>
      foundFigures.some((figureColorCards) =>
        figureColorCards.some((colorCard) =>
          isEqualColorCard(colorCard, targetColorCard)
        )
      ),
    [foundFigures]
  );

  return { findFigureByColorCard, isColorCardInAnyFigure };
};

export default useFoundFigures;
