import { useEffect } from 'react';
import { io } from 'socket.io-client';

/**
 * Custom hook to handle websocket connections.
 *
 * @param {string} path The path to connect to the websocket.
 * @param {function} handleSocketEvents The function to handle the socket events.
 * @returns {void}
 */
const useWebsocket = (path, handleSocketEvents, query = {}) => {
  useEffect(() => {
    const socket = io('http://localhost:8000', {
      path: path,
      query: query,
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
