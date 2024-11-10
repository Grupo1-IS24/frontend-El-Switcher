import { useCallback, useContext, useState } from 'react';
import useWebsocket from './useWebsocket';
import { sortListOfPlayers } from '../utils/sortListOfPlayers';
import { PlayerContext } from '../contexts/PlayerProvider';
import { sortBoardColorCards } from '../utils/sortBoardColorCards';
import { useParams } from 'react-router-dom';
import logSocketEvent from '../utils/logSocketEvent';

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
 * - opponentsTotalMovCards: An array of total movement cards of opponents.
 * - foundFigures: An array of found figures.
 * - timer: The remaining time for the current turn.
 * - chatMessages: An array of chat messages.
 * - blockedColor: The color that is currently blocked.
 * - hasNewMessages: A boolean indicating if there are new chat messages.
 * - setHasNewMessages: Function to set the hasNewMessages state.
 * - isChatOpen: A boolean indicating if the chat is open.
 * - setIsChatOpen: Function to set the isChatOpen state.
 * - isLoading: A boolean indicating whether the game data is loading.
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
  const [isLoading, setIsLoading] = useState(true);

  const handleSocketEvents = useCallback(
    (socket) => {
      socket.on('player_list', (listOfPlayers) => {
        logSocketEvent('player_list', listOfPlayers);
        const sortedListOfPlayers = sortListOfPlayers(listOfPlayers, playerID);
        setListOfPlayers(sortedListOfPlayers);
        setIsLoading(false);
      });

      socket.on('turn', ({ playerTurnId }) => {
        logSocketEvent('turn', { playerTurnId });
        setPlayerTurnId(playerTurnId);
      });

      socket.on('board', (board) => {
        logSocketEvent('board', board);
        const sortedBoard = sortBoardColorCards(board);
        setBoard(sortedBoard);
      });

      socket.on('figure_cards', (figureCards) => {
        logSocketEvent('figure_cards', figureCards);
        setFigureCards(figureCards);
      });

      socket.on('movement_cards', (movementCards) => {
        logSocketEvent('movement_cards', movementCards);
        movementCards = movementCards.sort(
          (a, b) => a.movementcardId - b.movementcardId
        );
        setMovementCards(movementCards);
      });

      socket.on('winner', (winnerInfo) => {
        logSocketEvent('winner', winnerInfo);
        setWinnerInfo(winnerInfo);
      });

      socket.on('opponents_total_mov_cards', (opponentsTotalMovCards) => {
        logSocketEvent('opponents_total_mov_cards', opponentsTotalMovCards);
        setOpponentsTotalMovCards(opponentsTotalMovCards);
      });

      socket.on('found_figures', (foundFigures) => {
        logSocketEvent('found_figures', foundFigures);
        setfoundFigures(foundFigures);
      });

      socket.on('timer', ({ time }) => {
        logSocketEvent('timer', { time });
        setTimer(time);
      });

      socket.on('chat_messages', ({ type, data }) => {
        logSocketEvent('chat_messages', { type, data });
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
        logSocketEvent('blocked_color', { blockedColor });
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
    isLoading,
  };
};

export default useWebsocketGame;
