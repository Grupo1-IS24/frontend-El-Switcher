import { useCallback, useState } from 'react';
import useWebsocket from './useWebsocket';

const useWebsocketGameList = () => {
  const [gameList, setGameList] = useState([]);

  const handleSocketEvents = useCallback((socket) => {
    socket.on('game_list', (gameList) => {
      setGameList(gameList);
    });
  }, []);

  useWebsocket('/game_list/ws/', handleSocketEvents);

  return { gameList };
};

export default useWebsocketGameList;
