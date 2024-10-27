import { describe, it, expect, vi, afterEach } from 'vitest';
import { handleCreateGame, handleJoinGame } from './gameHandlers';
import { createGame } from '../service/CreateGameService';
import { joinGame } from '../service/JoinGameService';
import showToast from './toastUtil';

vi.mock('../service/CreateGameService', () => ({
  createGame: vi.fn(),
}));

vi.mock('../service/JoinGameService', () => ({
  joinGame: vi.fn(),
}));

vi.mock('./toastUtil', () => ({
  default: vi.fn(),
}));

describe('gameHandlers', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('handleCreateGame', () => {
    const elements = {
      ownerName: { value: 'Owner' },
      gameName: { value: 'Game' },
      minPlayers: { value: 2 },
      maxPlayers: { value: 4 },
    };
    const createPlayer = vi.fn();
    const redirectToLobbyPage = vi.fn();

    it('should call createGame with correct parameters', async () => {
      createGame.mockResolvedValue({ ownerId: 1, gameId: 1 });

      await handleCreateGame(elements, createPlayer, redirectToLobbyPage);

      expect(createGame).toHaveBeenCalledWith({
        ownerName: 'Owner',
        gameName: 'Game',
        minPlayers: 2,
        maxPlayers: 4,
      });
    });

    it('should call createPlayer and redirectToLobbyPage on success', async () => {
      createGame.mockResolvedValue({ ownerId: 1, gameId: 1 });

      await handleCreateGame(elements, createPlayer, redirectToLobbyPage);

      expect(createPlayer).toHaveBeenCalledWith(1, true);
      expect(redirectToLobbyPage).toHaveBeenCalledWith(1);
    });

    it('should show toast on error when game creation fails', async () => {
      createGame.mockResolvedValue(null);

      await handleCreateGame(elements, createPlayer, redirectToLobbyPage);

      expect(showToast).toHaveBeenCalledWith({
        type: 'error',
        message: 'Error al crear la partida',
        autoClose: 3000,
      });
    });

    it('should show toast on error when an exception is thrown', async () => {
      createGame.mockRejectedValue(new Error('Network Error'));

      await handleCreateGame(elements, createPlayer, redirectToLobbyPage);

      expect(showToast).toHaveBeenCalledWith({
        type: 'error',
        message: 'Hubo un problema al crear el juego',
        autoClose: 3000,
      });
    });
  });

  describe('handleJoinGame', () => {
    const elements = {
      playerName: { value: 'Player' },
    };
    const selectedGame = { gameId: 1, gameName: 'Game' };
    const createPlayer = vi.fn();
    const redirectToLobbyPage = vi.fn();

    it('should call joinGame with correct parameters', async () => {
      joinGame.mockResolvedValue({ playerId: 1 });

      await handleJoinGame(
        elements,
        selectedGame,
        createPlayer,
        redirectToLobbyPage
      );

      expect(joinGame).toHaveBeenCalledWith({ playerName: 'Player' }, 1);
    });

    it('should call createPlayer and redirectToLobbyPage on success', async () => {
      joinGame.mockResolvedValue({ playerId: 1 });

      await handleJoinGame(
        elements,
        selectedGame,
        createPlayer,
        redirectToLobbyPage
      );

      expect(createPlayer).toHaveBeenCalledWith(1);
      expect(redirectToLobbyPage).toHaveBeenCalledWith(1);
    });

    it('should show toast on error when game is full', async () => {
      joinGame.mockRejectedValue(new Error('Game is full'));

      await handleJoinGame(
        elements,
        selectedGame,
        createPlayer,
        redirectToLobbyPage
      );

      expect(showToast).toHaveBeenCalledWith({
        type: 'error',
        message: "La partida 'Game' está llena",
        autoClose: 3000,
      });
    });

    it('should show toast on other errors', async () => {
      joinGame.mockRejectedValue(new Error('Network Error'));

      await handleJoinGame(
        elements,
        selectedGame,
        createPlayer,
        redirectToLobbyPage
      );

      expect(showToast).toHaveBeenCalledWith({
        type: 'error',
        message: 'Network Error',
        autoClose: 3000,
      });
    });
  });
});
