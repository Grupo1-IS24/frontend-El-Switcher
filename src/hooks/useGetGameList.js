import { useCallback, useEffect, useState } from 'react';
import { getGameList } from '../service/GetGameListService';

/**
 * Custom hook to fetch the list of games.
 * 
 * @deprecated This hook is deprecated in favor of websockets.
 */
const useGetGameList = () => {
  const [gameList, setGameList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGameList = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let data = await getGameList();
      data = data.filter((game) => game.connectedPlayers !== game.maxPlayers);
      setGameList(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch the game list when the component mounts.
  useEffect(() => {
    fetchGameList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run this effect once.

  return { gameList, isLoading, error, refreshGameList: fetchGameList };
};

export default useGetGameList;
