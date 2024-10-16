import { describe, it, expect, vi, afterEach } from 'vitest';
import { apiService } from './axiosConfig';
import { cancelMovement } from './CancelMovementService';

// Mock the apiService.
vi.mock('./axiosConfig', () => ({
  apiService: {
    post: vi.fn(),
  },
}));

describe('cancelMovement Service', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const validArguments = {
    gameID: 1,
    playerID: 2,
  };

  const callCancelMovement = async (args) => {
    return await cancelMovement(args.gameID, args.playerID);
  };

  describe('when called with valid arguments', () => {
    it('should call the API with the correct endpoint', async () => {
      apiService.post.mockResolvedValue(undefined);

      await callCancelMovement(validArguments);

      expect(apiService.post).toHaveBeenCalledWith(
        `/game/${validArguments.gameID}/move_undo/${validArguments.playerID}`
      );
    });

    it('should resolve successfully if the API call is successful', async () => {
      apiService.post.mockResolvedValue(undefined);

      await expect(callCancelMovement(validArguments)).resolves.toBeUndefined();
    });

    it('should throw an error if the API call fails', async () => {
      const detailMessage = 'Mocked error message';
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 400,
          data: {
            detail: detailMessage,
          },
        },
      };

      apiService.post.mockRejectedValue(axiosError);

      await expect(callCancelMovement(validArguments)).rejects.toThrow(
        detailMessage
      );
    });
  });

  describe('when called with invalid arguments', () => {
    const invalidCases = [
      {
        description: 'gameID is a string',
        args: { ...validArguments, gameID: '1' },
      },
      {
        description: 'playerID is missing',
        args: { ...validArguments, playerID: undefined },
      },
      {
        description: 'gameID is negative',
        args: { ...validArguments, gameID: -1 },
      },
    ];

    it.each(invalidCases)(
      'should throw an error if $description',
      async ({ args }) => {
        await expect(callCancelMovement(args)).rejects.toThrow(
          'Datos de cancelación inválidos'
        );
      }
    );
  });
});