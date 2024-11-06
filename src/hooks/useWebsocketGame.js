import { useCallback, useContext, useState } from 'react';
import useWebsocket from './useWebsocket';
import { sortListOfPlayers } from '../utils/sortListOfPlayers';
import { PlayerContext } from '../contexts/PlayerProvider';
import { sortBoardColorCards } from '../utils/sortBoardColorCards';
import { useParams } from 'react-router-dom';

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
 * - timer: The remaining time for the current turn.
 */
const useWebsocketGame = () => {
  const { gameId } = useParams();
  const { playerID } = useContext(PlayerContext);

  const [listOfPlayers, setListOfPlayers] = useState([]);
  const [board, setBoard] = useState([]);
  const [playerTurnId, setPlayerTurnId] = useState(-1);
  const [figureCards, setFigureCards] = useState([]);
  const [movementCards, setMovementCards] = useState([]);
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [opponentsTotalMovCards, setOpponentsTotalMovCards] = useState([]);
  const [foundFigures, setfoundFigures] = useState([]);
  const [timer, setTimer] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [blockedColor, setBlockedColor] = useState(null);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSocketEvents = useCallback(
    (socket) => {
      socket.on('player_list', (listOfPlayers) => {
        const sortedListOfPlayers = sortListOfPlayers(listOfPlayers, playerID);
        setListOfPlayers(sortedListOfPlayers);
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
        movementCards = movementCards.sort(
          (a, b) => a.movementcardId - b.movementcardId
        );
        setMovementCards(movementCards);
      });

      socket.on('winner', (winnerInfo) => {
        setWinnerInfo(winnerInfo);
      });

      socket.on('opponents_total_mov_cards', (opponentsTotalMovCards) => {
        setOpponentsTotalMovCards(opponentsTotalMovCards);
      });

      socket.on('found_figures', (foundFigures) => {
        setfoundFigures(foundFigures);
      });

      socket.on('timer', ({ time }) => {
        setTimer(time);
      });

      socket.on('chat_messages', ({ type, data }) => {
        if (type === 'multipleMessages') {
          setChatMessages(data);
        } else {
          setChatMessages((prev) => [...prev, data]);
        }
        if (!isChatOpen) {
          setHasNewMessages(true);
        }
      });

      socket.on('blocked_color', ({ blockedColor = null }) => {
        setBlockedColor(blockedColor);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isChatOpen]
  );

  useWebsocket('/game/ws', handleSocketEvents, {
    playerId: playerID,
    gameId: gameId,
  });

  return {
    listOfPlayers,
    board,
    playerTurnId,
    figureCards,
    movementCards,
    winnerInfo,
    opponentsTotalMovCards,
    foundFigures,
    timer,
    chatMessages,
    blockedColor,
    hasNewMessages,
    setHasNewMessages,
    isChatOpen,
    setIsChatOpen,
  };
};

export default useWebsocketGame;
