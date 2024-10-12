// hooks/usePlayerTurn.js
import { useContext, useCallback } from 'react';
import { PlayerContext } from '../contexts/PlayerProvider';
import { GameContext } from '../contexts/GameProvider';

const usePlayerTurn = () => {
  const { playerID: currentPlayerID } = useContext(PlayerContext);
  const { playerTurnId } = useContext(GameContext);

  const isPlayerTurn = useCallback(
    (playerId) => playerId === playerTurnId,
    [playerTurnId]
  );

  const isCurrentPlayerTurn = useCallback(
    () => isPlayerTurn(currentPlayerID),
    [currentPlayerID, isPlayerTurn]
  );

  return { isPlayerTurn, isCurrentPlayerTurn };
};

export default usePlayerTurn;
