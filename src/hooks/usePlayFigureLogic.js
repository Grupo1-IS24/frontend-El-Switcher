import { useCallback, useContext } from 'react';
import { PlayCardLogicContext } from '../contexts/PlayCardLogicProvider';
import usePlayerTurn from './usePlayerTurn';
import { isEqualColorCard } from '../utils/isEqualColorCard';
import useFoundFigures from './useFoundFigures';

/**
 * Custom hook for managing the selection and play of figure cards and their associated color cards.
 *
 * @returns {object} An object containing:
 *  - selectedFigureCard: The currently selected figure card.
 *  - selectedFigureColorCards: An array of currently selected figure color cards.
 *  - isSelectedFigureCard: Function to check if a specific figure card is selected.
 *  - canSelectFigureCard: Function to determine if a figure card can be selected.
 *  - selectFigureCard: Function to select or deselect a figure card.
 *  - isSelectedFigureColorCard: Function to check if a specific figure color card is selected.
 *  - canSelectFigureColorCard: Function to determine if a figure color card can be selected.
 *  - selectFigureColorCard: Function to select or deselect a figure color card.
 *  - canPlayFigure: Function to check if the player can play a figure.
 *  - resetFigureCards: Function to reset the selection state of figure cards.
 */
const usePlayFigureLogic = () => {
  const { isCurrentPlayerTurn } = usePlayerTurn();
  const { findFigureByColorCard, isColorCardInAnyFigure } = useFoundFigures();
  const {
    selectedFigureCard,
    selectedFigureColorCards,
    setSelectedFigureCard,
    setSelectedFigureColorCards,
    resetMovementCards,
    resetFigureCards,
  } = useContext(PlayCardLogicContext);

  /**
   * Determines if a figure card is currently selected.
   *
   * @param {object} figureCard - The figure card to check.
   * @returns {boolean} True if the figure card is selected, otherwise false.
   */
  const isSelectedFigureCard = useCallback(
    (figureCard) =>
      selectedFigureCard !== null &&
      selectedFigureCard.figureCardId === figureCard.figureCardId,
    [selectedFigureCard]
  );

  /**
   * Determines if the player can select a figure card.
   *
   * @returns {boolean} True if the player can select a figure card, otherwise false.
   */
  const canSelectFigureCard = useCallback(
    () => isCurrentPlayerTurn(),
    [isCurrentPlayerTurn]
  );

  /**
   * Selects or deselects a figure card.
   * Deselects any previously selected color cards when a figure card is selected.
   * Resets the movement cards when a figure card is selected.
   *
   * @param {object} figureCard - The figure card to select or deselect.
   * @returns {void}
   */
  const selectFigureCard = useCallback(
    (figureCard) => {
      if (isSelectedFigureCard(figureCard)) {
        setSelectedFigureCard(null);
      } else {
        setSelectedFigureCard(figureCard);
      }
      resetMovementCards(); // Reset the movement cards
    },
    [
      isSelectedFigureCard,
      setSelectedFigureCard,
      setSelectedFigureColorCards,
      resetMovementCards,
    ]
  );

  /**
   * Determines if a figure color card is currently selected.
   *
   * @param {object} targetColorCard - The figure color card to check.
   * @returns {boolean} True if the figure color card is selected, otherwise false.
   */
  const isSelectedFigureColorCard = useCallback(
    (targetColorCard) =>
      selectedFigureColorCards.some((colorCard) =>
        isEqualColorCard(colorCard, targetColorCard)
      ),
    [selectedFigureColorCards]
  );

  /**
   * Determines if the player can select a figure color card.
   *
   * @param {object} colorCard - The figure color card to check.
   * @returns {boolean} True if the player can select the figure color card, otherwise false.
   */
  const canSelectFigureColorCard = useCallback(
    (colorCard) =>
      isCurrentPlayerTurn() &&
      selectedFigureCard !== null &&
      isColorCardInAnyFigure(colorCard),
    [isCurrentPlayerTurn, selectedFigureCard, isColorCardInAnyFigure]
  );

  /**
   * Selects or deselects a figure color card.
   *
   * @param {object} colorCard - The figure color card to select or deselect.
   * @returns {void}
   */
  const selectFigureColorCard = useCallback(
    (colorCard) => {
      if (isSelectedFigureColorCard(colorCard)) {
        setSelectedFigureColorCards([]); // Deselect the figure color cards
      } else {
        setSelectedFigureColorCards(findFigureByColorCard(colorCard));
      }
    },
    [
      setSelectedFigureColorCards,
      findFigureByColorCard,
      isSelectedFigureColorCard,
    ]
  );

  /**
   * Determines if the player can play a figure.
   *
   * @returns {boolean} True if the player can play a figure, otherwise false.
   */
  const canPlayFigure = useCallback(
    () =>
      isCurrentPlayerTurn() &&
      selectedFigureCard !== null &&
      selectedFigureColorCards.length > 0,
    [selectedFigureCard, selectedFigureColorCards, isCurrentPlayerTurn]
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
    canPlayFigure,
    resetFigureCards,
  };
};

export default usePlayFigureLogic;
