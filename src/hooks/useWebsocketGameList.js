import { useCallback, useState } from 'react';
import useWebsocket from './useWebsocket';

const useWebsocketGameList = () => {
  const [gameList, setGameList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSocketEvents = useCallback((socket) => {
    socket.on('game_list', (gameList = []) => {
      setGameList(gameList);
      setIsLoading(false); // Set loading to false after receiving the game list.
    });
  }, []);

  useWebsocket('/game_list/ws/', handleSocketEvents);

  return { gameList, isLoading };
};

export default useWebsocketGameList;
