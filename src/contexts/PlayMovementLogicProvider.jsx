import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { PlayerContext } from './PlayerProvider';
import { GameContext } from './GameProvider';

export const PlayMovementLogicContext = createContext();

const PlayMovementLogicProvider = ({ children }) => {
  const { playerID } = useContext(PlayerContext);
  const { playerTurnId } = useContext(GameContext);

  const [selectedMovementCard, setSelectedMovementCard] = useState(null);
  const [selectedColorCards, setSelectedColorCards] = useState([]);

  // The logic to determine if the player can select a movement card.
  const canSelectMovementCard = useCallback(
    () => playerID === playerTurnId, // Only if it's the player's turn
    [playerID, playerTurnId]
  );

  // The logic to determine if a movement card is selected.
  const isSelectedMovementCard = useCallback(
    (movementCard) =>
      selectedMovementCard !== null &&
      selectedMovementCard.movementcardId === movementCard.movementcardId,
    [selectedMovementCard]
  );

  // The logic to determine if the player can select a color card.
  const selectMovementCard = useCallback(
    (movementCard) => {
      if (isSelectedMovementCard(movementCard)) {
        setSelectedMovementCard(null); // Deselect the card
      } else {
        setSelectedMovementCard(movementCard); // Select the card
      }
      setSelectedColorCards([]); // Deselect the color cards
    },
    [isSelectedMovementCard]
  );

  const isSelectedColorCard = useCallback(
    (colorCard) =>
      selectedColorCards.some(
        (selectedColorCard) =>
          selectedColorCard.row === colorCard.row &&
          selectedColorCard.column === colorCard.column &&
          selectedColorCard.color === colorCard.color
      ),
    [selectedColorCards]
  );

  // The logic to select a color card.
  const selectColorCard = useCallback(
    (colorCard) => {
      if (isSelectedColorCard(colorCard)) {
        setSelectedColorCards((prev) =>
          prev.filter(
            (selectedColorCard) =>
              selectedColorCard.row !== colorCard.row ||
              selectedColorCard.column !== colorCard.column ||
              selectedColorCard.color !== colorCard.color
          )
        );
      } else if (selectedColorCards.length < 2) {
        setSelectedColorCards((prev) => [...prev, colorCard]);
      }
    },
    [selectedColorCards.length]
  );

  // The logic to determine if a color card can be selected.
  const canSelectColorCard = useCallback(
    (colorCard) =>
      selectedMovementCard !== null &&
      (selectedColorCards.length < 2 || isSelectedColorCard(colorCard)),
    [selectedColorCards, selectedMovementCard]
  );

  const resetMovementLogic = useCallback(() => {
    setSelectedMovementCard(null);
    setSelectedColorCards([]);
  }, []);

  useEffect(() => {
    // Deselect the cards if it's not the player's turn
    if (playerID !== playerTurnId) {
      resetMovementLogic();
    }
  }, [playerID, playerTurnId]);

  // The provided state for the context.
  const providedState = {
    selectedMovementCard,
    selectedColorCards,
    selectMovementCard,
    selectColorCard,
    canSelectMovementCard,
    canSelectColorCard,
    isSelectedMovementCard,
    isSelectedColorCard,
    resetMovementLogic,
  };

  return (
    <PlayMovementLogicContext.Provider value={providedState}>
      {children}
    </PlayMovementLogicContext.Provider>
  );
};

export default PlayMovementLogicProvider;
