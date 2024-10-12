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
  const [selectedColorCard, setSelectedColorCard] = useState([]);

  // The logic to determine if the player can select a movement card.
  const canSelectMovementCard = useCallback(
    () => playerID === playerTurnId, // Only if it's the player's turn
    [playerID, playerTurnId]
  );

  // The logic to determine if the player can select a color card.
  const selectMovementCard = useCallback(
    (movementCard) => {
      if (isSelectedMovementCard(movementCard)) {
        setSelectedMovementCard(null); // Deselect the card
      } else {
        setSelectedMovementCard(movementCard); // Select the card
      }
      setSelectedColorCard([]); // Deselect the color cards
    },
    [selectedMovementCard]
  );

  // The logic to determine if a movement card is selected.
  const isSelectedMovementCard = useCallback(
    (movementCard) =>
      selectedMovementCard !== null &&
      selectedMovementCard.movementcardId === movementCard.movementcardId,
    [selectedMovementCard]
  );

  // The logic to select a color card.
  const selectColorCard = useCallback(
    (colorCard) => {
      if (selectedColorCard.length < 2) {
        setSelectedColorCard((prev) => [...prev, colorCard]);
      }
    },
    [setSelectedColorCard]
  );

  // The logic to determine if a color card can be selected.
  const canSelectColorCard = useCallback(
    () => selectedMovementCard !== null && selectedColorCard.length < 2,
    [selectedColorCard, selectedMovementCard]
  );

  useEffect(() => {
    // Deselect the cards if it's not the player's turn
    if (playerID !== playerTurnId) {
      setSelectedMovementCard(null);
      setSelectedColorCard([]);
    }
  });

  // The provided state for the context.
  const providedState = {
    selectedMovementCard,
    selectedColorCard,
    selectMovementCard,
    selectColorCard,
    canSelectMovementCard,
    canSelectColorCard,
    isSelectedMovementCard,
  };

  return (
    <PlayMovementLogicContext.Provider value={providedState}>
      {children}
    </PlayMovementLogicContext.Provider>
  );
};

export default PlayMovementLogicProvider;
