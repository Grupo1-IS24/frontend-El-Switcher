import { describe, it, expect, vi } from 'vitest';
import { leaveLobby } from './LeaveLobby';
import { apiService } from './axiosConfig';

vi.mock('./axiosConfig', () => ({
  apiService: {
    delete: vi.fn(), // Simula la función delete
  },
}));

describe('leaveLobby', () => {
  const gameID = '1234';
  const playerID = '5678';

  it('should call apiService.delete with the correct URL', async () => {
    const mockResponse = { data: 'success' };
    apiService.delete.mockResolvedValueOnce(mockResponse);

    const response = await leaveLobby(gameID, playerID);

    expect(apiService.delete).toHaveBeenCalledWith(`/game/${gameID}/leave/${playerID}`);
    expect(response).toBe(mockResponse);
  });

  it('should handle errors correctly', async () => {
    const mockError = new Error('Network Error');
    apiService.delete.mockRejectedValueOnce(mockError);

    const consoleSpy = vi.spyOn(console, 'error');

    await leaveLobby(gameID, playerID);

    expect(consoleSpy).toHaveBeenCalledWith(`error abandonando el lobby: ${mockError}`);
  });
});
