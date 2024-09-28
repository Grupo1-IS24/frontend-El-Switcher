import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRouteNavigation from './useRouteNavigation';
import useWebsocket from './useWebsocket';

const useWebsocketLobby = () => {
  const { gameId } = useParams();
  const { redirectToGamePage } = useRouteNavigation();

  const [listOfPlayers, setListOfPlayers] = useState([]);
  const [canStartGame, setCanStartGame] = useState(false);

  const handleSocketEvents = useCallback((socket) => {
    socket.on('player_list', (listOfPlayers) => {
      setListOfPlayers(listOfPlayers);
    });

    // This event is triggered only for the owner of the game.
    socket.on('start_game', ({ canStart }) => {
      setCanStartGame(canStart);
    });

    socket.on('game_started', ({ gameStarted = false }) => {      
      if (!gameStarted) return;

      redirectToGamePage(gameId);
    });
  }, []);

  useWebsocket('/game/lobby/ws', handleSocketEvents);

  return { listOfPlayers, canStartGame };
};

export default useWebsocketLobby;
