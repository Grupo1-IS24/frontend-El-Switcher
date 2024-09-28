import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerContext } from '../contexts/PlayerProvider';
import { io } from 'socket.io-client';

const useWebsocket = (path, handleSocketEvents) => {
  const { gameId } = useParams();
  const { playerID } = useContext(PlayerContext);

  useEffect(() => {
    const socket = io('http://localhost:8000', {
      path: path,
      query: { playerId: playerID, gameId: gameId },
      reconnection: true,
      reconnectionAttempts: Infinity,
    });

    handleSocketEvents(socket);

    return () => {
      socket.disconnect();
    };
  }, []);
};

export default useWebsocket;
