import { useCallback, useContext, useMemo } from 'react';
import { GameContext } from '../contexts/GameProvider';
import { PlayerContext } from '../contexts/PlayerProvider';

const useFigureCards = () => {
  const { playerID: currentPlayerID } = useContext(PlayerContext);
  const { figureCards } = useContext(GameContext);

  const getFigureCardsByPlayerId = useCallback(
    (playerId) => {
      return figureCards.find(
        (figurecardSet) => figurecardSet.ownerId === playerId
      ).cards;
    },
    [figureCards]
  );

  const currentPlayerFigureCards = useMemo(
    () => getFigureCardsByPlayerId(currentPlayerID),
    [currentPlayerID, getFigureCardsByPlayerId]
  );

  const isCurrentPlayerOwnerFigureCard = useCallback(
    (figureCardToCheck) =>
      currentPlayerFigureCards.some(
        (figureCard) =>
          figureCard.figureCardId === figureCardToCheck.figureCardId
      ),
    [currentPlayerFigureCards]
  );

  return {
    currentPlayerFigureCards,
    getFigureCardsByPlayerId,
    isCurrentPlayerOwnerFigureCard,
  };
};

export default useFigureCards;
