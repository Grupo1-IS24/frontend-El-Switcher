import { createContext, useCallback, useState } from 'react';

export const PlayMovementLogicContext = createContext();

const PlayMovementLogicProvider = ({ children }) => {
  const [selectedMovementCard, setSelectedMovementCard] = useState(null);
  const [selectedColorCard, setSelectedColorCard] = useState([]);

  const selectMovementCard = useCallback((movementCard) => {
    setSelectedMovementCard(movementCard);
    setSelectedColorCard([]);
  }, []);

  const isSelectedMovementCard = useCallback(
    (movementCard) =>
      selectedMovementCard !== null &&
      selectedMovementCard.movementcardId === movementCard.movementcardId,
    [selectedMovementCard]
  );

  const selectColorCard = useCallback(
    (colorCard) => {
      setSelectedColorCard((prev) => [...prev, colorCard]);
    },
    [setSelectedColorCard]
  );

  const canSelectColorCard = useCallback(
    () => selectedMovementCard !== null && selectedColorCard.length < 2,
    [selectedColorCard, selectedMovementCard]
  );

  // The provided state for the context.
  const providedState = {
    selectedMovementCard,
    selectedColorCard,
    selectMovementCard,
    selectColorCard,
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
