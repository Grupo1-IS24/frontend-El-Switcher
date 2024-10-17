import { useCallback, useContext } from 'react';
import usePlayedMovCards from './usePlayedMovCards';
import usePlayerTurn from './usePlayerTurn';
import { PlayCardLogicContext } from '../contexts/PlayCardLogicProvider';
import { isEqualColorCard } from '../utils/isEqualColorCard';

const usePlayMovementLogic = () => {
  const { isCurrentPlayerTurn } = usePlayerTurn();
  const {
    isMovementCardPlayed,
    hasAnyMovementCardPlayed,
    areAllMovementCardsPlayed,
  } = usePlayedMovCards();
  const {
    selectedMovementCard,
    selectedColorCards,
    setSelectedMovementCard,
    setSelectedColorCards,
    resetMovementCards,
    resetFigureCards,
  } = useContext(PlayCardLogicContext);

  /**
   * Determines if a movement card is currently selected.
   *
   * @param {object} movementCard - The movement card to check.
   * @returns {boolean} True if the movement card is selected, otherwise false.
   */
  const isSelectedMovementCard = useCallback(
    (movementCard) =>
      selectedMovementCard !== null &&
      selectedMovementCard.movementcardId === movementCard.movementcardId,
    [selectedMovementCard]
  );

  /**
   * Determines if the player can select a movement card.
   *
   * @returns {boolean} True if the player can select a movement card, otherwise false.
   */
  const canSelectMovementCard = useCallback(
    (movementCard) =>
      isCurrentPlayerTurn() && !isMovementCardPlayed(movementCard),
    [isCurrentPlayerTurn, isMovementCardPlayed]
  );

  /**
   * Selects or deselects a movement card.
   * Deselects any previously selected color cards when a movement card is selected.
   *
   * @param {object} movementCard - The movement card to select or deselect.
   */
  const selectMovementCard = useCallback(
    (movementCard) => {
      if (isSelectedMovementCard(movementCard)) {
        setSelectedMovementCard(null); // Deselect the card
      } else {
        setSelectedMovementCard(movementCard); // Select the card
      }
      setSelectedColorCards([]); // Deselect the color cards
      resetFigureCards(); // Reset the figure cards
    },
    [
      isSelectedMovementCard,
      setSelectedMovementCard,
      setSelectedColorCards,
      resetFigureCards,
    ]
  );

  /**
   * Determines if a specific color card is currently selected.
   *
   * @param {object} colorCard - The color card to check.
   * @returns {boolean} True if the color card is selected, otherwise false.
   */
  const isSelectedColorCard = useCallback(
    (colorCard) =>
      selectedColorCards.some((selectedColorCard) =>
        isEqualColorCard(selectedColorCard, colorCard)
      ),
    [selectedColorCards]
  );

  /**
   * Determines if a color card can be selected based on current selections.
   *
   * @param {object} colorCard - The color card to check.
   * @returns {boolean} True if the color card can be selected, otherwise false.
   */
  const canSelectColorCard = useCallback(
    (colorCard) =>
      isCurrentPlayerTurn() &&
      !areAllMovementCardsPlayed() &&
      selectedMovementCard !== null &&
      (selectedColorCards.length < 2 || isSelectedColorCard(colorCard)),
    [
      selectedColorCards,
      selectedMovementCard,
      isSelectedColorCard,
      isCurrentPlayerTurn,
      areAllMovementCardsPlayed,
    ]
  );

  /**
   * Selects a color card. If the card is already selected, it will be deselected.
   * Limits the selection to a maximum of two color cards.
   *
   * @param {object} colorCard - The color card to select or deselect.
   */
  const selectColorCard = useCallback(
    (colorCard) => {
      if (isSelectedColorCard(colorCard)) {
        setSelectedColorCards((prev) =>
          prev.filter(
            (selectedColorCard) =>
              !isEqualColorCard(selectedColorCard, colorCard)
          )
        );
      } else if (selectedColorCards.length < 2) {
        setSelectedColorCards((prev) => [...prev, colorCard]);
      }
    },
    [selectedColorCards, isSelectedColorCard, setSelectedColorCards]
  );

  /**
   * Determines if the player can perform a movement based on the selected cards and the player's turn.
   *
   * @returns {boolean} True if the player can play a movement, otherwise false.
   */
  const canPlayMovement = useCallback(
    () =>
      isCurrentPlayerTurn() &&
      !areAllMovementCardsPlayed() &&
      selectedMovementCard !== null &&
      selectedColorCards.length === 2,
    [
      selectedMovementCard,
      selectedColorCards,
      isCurrentPlayerTurn,
      areAllMovementCardsPlayed,
    ]
  );

  /**
   * Determines if the player can cancel a movement.
   *
   * @returns {boolean} True if the player can cancel a movement, otherwise false.
   */
  const canCancelMovement = useCallback(
    () => isCurrentPlayerTurn() && hasAnyMovementCardPlayed(),
    [isCurrentPlayerTurn, hasAnyMovementCardPlayed]
  );

  return {
    selectedMovementCard,
    selectedColorCards,
    canSelectMovementCard,
    selectMovementCard,
    canSelectColorCard,
    selectColorCard,
    canPlayMovement,
    canCancelMovement,
    resetMovementCards,
    isSelectedColorCard,
    isSelectedMovementCard,
  };
};

export default usePlayMovementLogic;