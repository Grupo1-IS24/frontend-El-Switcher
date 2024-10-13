import { useContext, useCallback } from 'react';
import { PlayerContext } from '../contexts/PlayerProvider';
import { GameContext } from '../contexts/GameProvider';

/**
 * Custom hook to determine if a player is in turn.
 *
 * @returns {object} An object with two functions:
 * - isPlayerTurn: A function that receives a player ID and returns a boolean indicating if the player is in turn.
 * - isCurrentPlayerTurn: A function that returns a boolean indicating if the current player is in turn.
 */
const usePlayerTurn = () => {
  const { playerID: currentPlayerID } = useContext(PlayerContext);
  const { playerTurnId } = useContext(GameContext);

  /**
   * Function that receives a player ID and returns a boolean indicating if the player is in turn.
   * @param {number} playerId The player ID to check.
   * @returns {boolean} A boolean indicating if the player is in turn.
   */
  const isPlayerTurn = useCallback(
    (playerId) => playerId === playerTurnId,
    [playerTurnId]
  );

  /**
   * Function that returns a boolean indicating if the current player is in turn.
   * @returns {boolean} A boolean indicating if the current player is in turn.
   */
  const isCurrentPlayerTurn = useCallback(
    () => isPlayerTurn(currentPlayerID),
    [currentPlayerID, isPlayerTurn]
  );

  return { isPlayerTurn, isCurrentPlayerTurn };
};

export default usePlayerTurn;
