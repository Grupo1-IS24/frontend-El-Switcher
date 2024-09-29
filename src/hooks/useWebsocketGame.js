import { useCallback, useState } from 'react';
import useWebsocket from './useWebsocket';
import { sortBoardColorCards } from '../utils/sortBoardColorCards';

/**
 * Custom hook to handle websocket events for the game.
 *
 * @returns {Object} An object containing the following properties:
 * - listOfPlayers: An array of players in the game.
 * - board: The current state of the game board.
 * - playerTurnId: The ID of the player whose turn it is.
 * - figureCards: An array of figure cards.
 * - movementCards: An array of movement cards.
 * - winnerInfo: Information about the winner of the game.
 */
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
      const sortedBoard = sortBoardColorCards(board);
      setBoard(sortedBoard);
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
