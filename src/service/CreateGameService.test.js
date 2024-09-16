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

  it('debería mostrar una alerta si hay un error en la solicitud POST', async () => {
    axios.post.mockRejectedValue(new Error('Error'));

    await createGame('game', 'owner', 2, 4);
    expect(alert).toHaveBeenCalledWith('Error al crear la partida');
  });

  it('debería retornar los datos correctos si la solicitud POST es exitosa', async () => {
    const responseData = { ownerId: 1, gameId: 1 };
    axios.post.mockResolvedValue({ data: responseData });

    const result = await createGame('game', 'owner', 2, 4);
    expect(result).toEqual(responseData);
  });

  it('debería mostrar una alerta si ownerId o gameId no están en la respuesta', async () => {
    axios.post.mockResolvedValue({ data: {} });

    await createGame('game', 'owner', 2, 4);
    expect(alert).toHaveBeenCalledWith('Error al crear la partida');
  });

  it('debería mostrar una alerta si ownerId o gameId no son números', async () => {
    axios.post.mockResolvedValue({ data: { ownerId: '1', gameId: '1' } });

    await createGame('game', 'owner', 2, 4);
    expect(alert).toHaveBeenCalledWith('Error al crear la partida');
  });
});
