import { useCallback, useState } from 'react';
import useWebsocket from './useWebsocket';

/**
 * Custom hook to handle websocket events for the game list.
 *
 * @returns {Object} An object containing the following properties:
 * - gameList: An array of games.
 * - isLoading: A boolean indicating whether the game list is loading.
 * - error: An error message if there was an error connecting to the server.
 */
const useWebsocketGameList = () => {
  const [gameList, setGameList] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSocketEvents = useCallback((socket) => {
    socket.on('game_list', (gameList = []) => {
      setGameList(gameList);
      setIsLoading(false); // Set loading to false after receiving the game list.
      setError(null); // Clear the error if there is a successful connection.
    });

    socket.on('connect_error', () => {
      setError('Failed to connect to the server.');
      setIsLoading(false); // Set loading to false if there is a connection error.
    });
  }, []);

  useWebsocket('/game_list/ws/', handleSocketEvents);

  return { gameList, isLoading, error };
};

export default useWebsocketGameList;
