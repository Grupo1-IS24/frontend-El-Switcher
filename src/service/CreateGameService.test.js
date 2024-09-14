import axios from 'axios';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createGame } from './CreateGameService';

vi.mock('axios');

describe('createGame', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.window = {
      location: {
        href: '',
      },
    };
    globalThis.alert = vi.fn();
  });

  it('debería mostrar una alerta si algún campo está vacío', async () => {
    await createGame('', 'owner', 2, 4);
    expect(alert).toHaveBeenCalledWith('Todos los campos son requeridos');

    await createGame('game', '', 2, 4);
    expect(alert).toHaveBeenCalledWith('Todos los campos son requeridos');

    await createGame('game', 'owner', 0, 4);
    expect(alert).toHaveBeenCalledWith('Todos los campos son requeridos');

    await createGame('game', 'owner', 2, 0);
    expect(alert).toHaveBeenCalledWith('Todos los campos son requeridos');
  });

  it('debería mostrar una alerta si minPlayers es mayor que maxPlayers', async () => {
    await createGame('game', 'owner', 5, 4);
    expect(alert).toHaveBeenCalledWith(
      'El mínimo de jugadores no puede ser mayor al máximo de jugadores'
    );
  });

  it('debería mostrar una alerta si minPlayers es menor que 2', async () => {
    await createGame('game', 'owner', 1, 4);
    expect(alert).toHaveBeenCalledWith(
      'El mínimo de jugadores debe ser al menos 2'
    );
  });

  it('debería mostrar una alerta si maxPlayers es mayor que 4', async () => {
    await createGame('game', 'owner', 2, 5);
    expect(alert).toHaveBeenCalledWith(
      'El máximo de jugadores debe ser como máximo 4'
    );
  });

  it('debería hacer una solicitud POST y redirigir al lobby si los datos son válidos', async () => {
    const mockResponse = { data: { gameId: '123' } };
    axios.post.mockResolvedValue(mockResponse);

    await createGame('game', 'owner', 2, 4);
    expect(axios.post).toHaveBeenCalledWith('/game_create', {
      gameName: 'game',
      ownerName: 'owner',
      minPlayers: 2,
      maxPlayers: 4,
    });
    expect(window.location.href).toBe('/lobby/123');
  });

  it('debería mostrar una alerta si hay un error en la solicitud POST', async () => {
    axios.post.mockRejectedValue(new Error('Error'));

    await createGame('game', 'owner', 2, 4);
    expect(alert).toHaveBeenCalledWith('Error al crear la partida');
  });
});
