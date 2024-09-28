import { useCallback, useState } from 'react';
import useWebsocket from './useWebsocket';

const useWebsocketGame = () => {
  const [listOfPlayers, setListOfPlayers] = useState([]);
  const [board, setBoard] = useState([]);
  const [playerTurnId, setPlayerTurnId] = useState(-1);
  const [figureCards, setFigureCards] = useState([]);
  const [movementCards, setMovementCards] = useState([]);
  const [winnerInfo, setWinnerInfo] = useState(null);

  const handleSocketEvents = useCallback((socket) => {
    socket.on('player_list', (listOfPlayers) => {
      setListOfPlayers(listOfPlayers);
    });

    socket.on('turn', ({ playerTurnId }) => {
      setPlayerTurnId(playerTurnId);
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
  }, []);

  useWebsocket('/game/ws', handleSocketEvents);

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
