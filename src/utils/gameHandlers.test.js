import { describe, it, expect, vi, afterEach } from 'vitest';
import { handleCreateGame, handleJoinGame } from './gameHandlers';
import { createGame } from '../service/CreateGameService';
import { joinGame } from '../service/JoinGameService';

vi.mock('../service/CreateGameService', () => ({
  createGame: vi.fn(),
}));

vi.mock('../service/JoinGameService', () => ({
  joinGame: vi.fn(),
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

    it('should alert on error when game creation fails', async () => {
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
      createGame.mockResolvedValue(null);

      await handleCreateGame(elements, createPlayer, redirectToLobbyPage);

      expect(alertMock).toHaveBeenCalledWith('Error al crear la partida');
      alertMock.mockRestore();
    });

    it('should alert on error when an exception is thrown', async () => {
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
      createGame.mockRejectedValue(new Error('Network Error'));

      await handleCreateGame(elements, createPlayer, redirectToLobbyPage);

      expect(alertMock).toHaveBeenCalledWith('Hubo un problema al crear el juego');
      alertMock.mockRestore();
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

      await handleJoinGame(elements, selectedGame, createPlayer, redirectToLobbyPage);

      expect(joinGame).toHaveBeenCalledWith({ playerName: 'Player' }, 1);
    });

    it('should call createPlayer and redirectToLobbyPage on success', async () => {
      joinGame.mockResolvedValue({ playerId: 1 });

      await handleJoinGame(elements, selectedGame, createPlayer, redirectToLobbyPage);

      expect(createPlayer).toHaveBeenCalledWith(1);
      expect(redirectToLobbyPage).toHaveBeenCalledWith(1);
    });

    it('should alert on error when game is full', async () => {
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
      joinGame.mockRejectedValue(new Error('Game is full'));

      await handleJoinGame(elements, selectedGame, createPlayer, redirectToLobbyPage);

      expect(alertMock).toHaveBeenCalledWith("La partida 'Game' está llena");
      alertMock.mockRestore();
    });

    it('should alert on other errors', async () => {
      const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
      joinGame.mockRejectedValue(new Error('Network Error'));

      await handleJoinGame(elements, selectedGame, createPlayer, redirectToLobbyPage);

      expect(alertMock).toHaveBeenCalledWith('Network Error');
      alertMock.mockRestore();
    });
  });
});