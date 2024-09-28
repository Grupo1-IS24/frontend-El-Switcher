import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { PlayerContext } from '../contexts/PlayerProvider';

const useWebsocketGame = () => {
  const { gameId } = useParams();
  const { playerID } = useContext(PlayerContext);

  const [listOfPlayers, setListOfPlayers] = useState([]);
  const [board, setBoard] = useState([]);
  const [playerTurnId, setPlayerTurnId] = useState(-1);
  const [figureCards, setFigureCards] = useState([]);
  const [movementCards, setMovementCards] = useState([]);
  const [winnerInfo, setWinnerInfo] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:8000', {
      path: '/game/ws',
      query: { playerId: playerID, gameId: gameId },
      reconnection: true,
      reconnectionAttempts: Infinity,
    });

    socket.on('player_list', (players) => {
      setListOfPlayers(players);
    });

    socket.on('turn', (turnInfo) => {
      setPlayerTurnId(turnInfo.playerTurnId);
    });

    socket.on('board', (board) => {
      setBoard(board);
    });

    socket.on('figure_cards', (figureCards) => {
      setFigureCards(figureCards);
    });

    socket.on('movement_cards', (movementCards) => {
      setMovementCards(movementCards);
    });

    socket.on('winner', (winnerInfo) => {
      setWinnerInfo(winnerInfo);
    });

    return () => {
      socket.disconnect();
    };
  });

  return {
    listOfPlayers,
    board,
    playerTurnId,
    figureCards,
    movementCards,
    winnerInfo,
  };
};

export default useWebsocketGame;
