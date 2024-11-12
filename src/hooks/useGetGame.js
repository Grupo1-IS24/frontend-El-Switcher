import { useCallback, useEffect, useState } from 'react';
import { getGame } from '../service/GetGameService';

const useGetGame = (gameId) => {
  const [game, setGame] = useState(null);
  const [gameError, setGameError] = useState(null);

  const fetchGame = useCallback(async () => {
    try {
      const data = await getGame(gameId);
      setGame(data);
    } catch (error) {
      setGameError(error);
      console.error(`Error fetching game with ID ${gameId}:`, error);
    }
  }, [gameId]);

  // Fetch the game when the component mounts or when gameId changes.
  useEffect(() => {
    fetchGame();
  }, [fetchGame]);

  return { game, refreshGame: fetchGame, gameError };
};

export default useGetGame;
