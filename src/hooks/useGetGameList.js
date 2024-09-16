import { useCallback, useEffect, useState } from 'react';
import { getGameList } from '../service/GetGameListService';

const useGetGameList = () => {
  const [gameList, setGameList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGameList = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getGameList();
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
