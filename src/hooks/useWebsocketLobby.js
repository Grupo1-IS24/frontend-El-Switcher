import { useCallback, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import useRouteNavigation from './useRouteNavigation';
import useWebsocket from './useWebsocket';
import { PlayerContext } from '../contexts/PlayerProvider';

/**
 * Custom hook to handle websocket events for the lobby.
 *
 * @returns {Object} An object containing the following properties:
 * - listOfPlayers: An array of players in the game.
 * - canStartGame: A boolean indicating whether the game can be started.
 */
const useWebsocketLobby = () => {
  const { gameId } = useParams();
  const { playerID } = useContext(PlayerContext);
  const { redirectToGamePage, redirectToHomePage } = useRouteNavigation();

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

    socket.on('cancel_game', ({ gameCanceled = false }) => {
      if (gameCanceled) {
        redirectToHomePage();
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useWebsocket('/game/lobby/ws', handleSocketEvents, {
    playerId: playerID,
    gameId: gameId,
  });

  return { listOfPlayers, canStartGame };
};

export default useWebsocketLobby;
