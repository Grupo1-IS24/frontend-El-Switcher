import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { PlayerContext } from '../contexts/PlayerProvider';
import useRouteNavigation from './useRouteNavigation';

const useWebsocketLobby = () => {
  const { gameId } = useParams();
  const { playerID } = useContext(PlayerContext);
  const { redirectToGamePage } = useRouteNavigation();

  const [listOfPlayers, setListOfPlayers] = useState([]);
  const [canStartGame, setCanStartGame] = useState(false);

  useEffect(() => {
    const socket = io('http://localhost:8000', {
      path: '/game/lobby/ws',
      query: { playerId: playerID, gameId: gameId },
      reconnection: true,
      reconnectionAttempts: Infinity,
    });

    socket.on('player_list', (players) => {
      setListOfPlayers(players);
    });

    // This event is triggered only for the owner of the game.
    socket.on('start_game', (gameInfo) => {
      setCanStartGame(gameInfo.canStart);
    });

    socket.on('game_started', (gameInfo) => {
      if (gameInfo.gameStarted) {
        redirectToGamePage(gameId);
      }
    });

    return () => {
      socket.disconnect();
    };
  });

  return { listOfPlayers, canStartGame };
};

export default useWebsocketLobby;
