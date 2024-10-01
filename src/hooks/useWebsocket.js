import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerContext } from '../contexts/PlayerProvider';
import { io } from 'socket.io-client';

/**
 * Custom hook to handle websocket connections.
 * 
 * @param {string} path The path to connect to the websocket.
 * @param {function} handleSocketEvents The function to handle the socket events.
 * @returns {void}
 */
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
