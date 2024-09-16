import { apiService } from './axiosConfig';
import { describe, it, expect, vi } from 'vitest';
import { createGame } from './CreateGameService';

vi.mock('./axiosConfig', () => ({
  apiService: {
    post: vi.fn(),
  },
}));

describe('createGame', () => {
  it('debería lanzar un error si algún campo está vacío', async () => {
    const gameData = {
      gameName: '',
      ownerName: 'Host',
      minPlayers: 2,
      maxPlayers: 4,
    };
    await expect(createGame(gameData)).resolves.toBeNull();
  });

  it('debería lanzar un error si minPlayers es mayor que maxPlayers', async () => {
    const gameData = {
      gameName: 'Juego',
      ownerName: 'Host',
      minPlayers: 5,
      maxPlayers: 4,
    };
    await expect(createGame(gameData)).resolves.toBeNull();
  });

  it('debería lanzar un error si minPlayers es menor que 2', async () => {
    const gameData = {
      gameName: 'Juego',
      ownerName: 'Host',
      minPlayers: 1,
      maxPlayers: 4,
    };
    await expect(createGame(gameData)).resolves.toBeNull();
  });

  it('debería lanzar un error si maxPlayers es mayor que 4', async () => {
    const gameData = {
      gameName: 'Juego',
      ownerName: 'Host',
      minPlayers: 2,
      maxPlayers: 5,
    };
    await expect(createGame(gameData)).resolves.toBeNull();
  });

  it('debería retornar null si la respuesta del servidor no contiene ownerId o gameId', async () => {
    apiService.post.mockResolvedValue({ data: { ownerId: null, gameId: 1 } });
    const gameData = {
      gameName: 'Juego',
      ownerName: 'Host',
      minPlayers: 2,
      maxPlayers: 4,
    };
    await expect(createGame(gameData)).resolves.toBeNull();
  });

  it('debería retornar null si la respuesta del servidor contiene ownerId o gameId no numéricos', async () => {
    apiService.post.mockResolvedValue({ data: { ownerId: '1', gameId: '1' } });
    const gameData = {
      gameName: 'Juego',
      ownerName: 'Host',
      minPlayers: 2,
      maxPlayers: 4,
    };
    await expect(createGame(gameData)).resolves.toBeNull();
  });

  it('debería retornar los datos del juego si la creación es exitosa', async () => {
    apiService.post.mockResolvedValue({ data: { ownerId: 1, gameId: 1 } });
    const gameData = {
      gameName: 'Juego',
      ownerName: 'Host',
      minPlayers: 2,
      maxPlayers: 4,
    };
    await expect(createGame(gameData)).resolves.toEqual({
      ownerId: 1,
      gameId: 1,
    });
  });

  it('debería retornar null si ocurre un error en la solicitud', async () => {
    apiService.post.mockRejectedValue(new Error('Network Error'));
    const gameData = {
      gameName: 'Juego',
      ownerName: 'Host',
      minPlayers: 2,
      maxPlayers: 4,
    };
    await expect(createGame(gameData)).resolves.toBeNull();
  });
});
