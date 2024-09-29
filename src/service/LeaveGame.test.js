import { leaveGame } from './LeaveGame';
import { apiService } from './axiosConfig';
import { describe, it, expect, vi } from 'vitest';

// apiService mock
vi.mock('./axiosConfig', () => ({
  apiService: {
    delete: vi.fn(),
  },
}));

describe('leaveGame', () => {
  const gameID = '123';
  const playerID = '456';

  it('debería hacer un DELETE request correctamente', async () => {
    // mocking the response
    apiService.delete.mockResolvedValueOnce({});

    // excecute the function
    await leaveGame(gameID, playerID);

    // verify apiService.delete was called with the correct parameters
    expect(apiService.delete).toHaveBeenCalledWith(`/game/${gameID}/leave/${playerID}`);
    expect(apiService.delete).toHaveBeenCalledTimes(1);
  });

  it('debería manejar errores', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // mocking an error response
    apiService.delete.mockRejectedValueOnce(new Error('Error de API'));

    // excecute the function
    await leaveGame(gameID, playerID);

    // verify that the error was caught
    expect(consoleErrorSpy).toHaveBeenCalledWith('error abandonando el lobby: Error: Error de API');

    consoleErrorSpy.mockRestore(); // restore the original console.error state
  });
});