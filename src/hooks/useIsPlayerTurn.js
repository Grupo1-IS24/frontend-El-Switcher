// hooks/useIsPlayerTurn.js
import { useContext, useCallback } from 'react';
import { PlayerContext } from '../contexts/PlayerProvider';
import { GameContext } from '../contexts/GameProvider';

const useIsPlayerTurn = () => {
  const { playerID } = useContext(PlayerContext);
  const { playerTurnId } = useContext(GameContext);

  const isPlayerTurn = useCallback(
    () => playerID === playerTurnId,
    [playerID, playerTurnId]
  );

  return isPlayerTurn;
};

export default useIsPlayerTurn;
