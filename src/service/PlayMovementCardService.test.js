import { describe, it, expect, vi, afterEach } from 'vitest';
import { apiService } from './axiosConfig';
import { playMovementCard } from './PlayMovementCardService';

// Mock the apiService.
vi.mock('./axiosConfig', () => ({
  apiService: {
    post: vi.fn(),
  },
}));

describe('playMovementCard Service', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const validArguments = {
    gameId: 1,
    playerId: 2,
    movementCardId: 3,
    colorCardId1: 4,
    colorCardId2: 5,
  };

  describe('when called with valid arguments', () => {
    it('should call the API with the correct endpoint and body', async () => {
      apiService.post.mockResolvedValue({});

      await playMovementCard(
        validArguments.gameId,
        validArguments.playerId,
        validArguments.movementCardId,
        validArguments.colorCardId1,
        validArguments.colorCardId2
      );

      expect(apiService.post).toHaveBeenCalledWith(
        `/game/${validArguments.gameId}/move/${validArguments.playerId}`,
        {
          movementCardId: validArguments.movementCardId,
          squarePieceId1: validArguments.colorCardId1,
          squarePieceId2: validArguments.colorCardId2,
        }
      );
    });

    it('should resolve successfully if the API call is successful', async () => {
      apiService.post.mockResolvedValue({});

      await expect(
        playMovementCard(
          validArguments.gameId,
          validArguments.playerId,
          validArguments.movementCardId,
          validArguments.colorCardId1,
          validArguments.colorCardId2
        )
      ).resolves.toBeUndefined();
    });

    it('should throw an error if the API call fails', async () => {
      const detailMessage = 'Mocked error message';

      const axiosError = {
        isAxiosError: true, // Mock the error to be an Axios error
        response: {
          status: 400,
          data: {
            detail: detailMessage,
          },
        },
      };

      apiService.post.mockRejectedValue(axiosError);

      await expect(
        playMovementCard(
          validArguments.gameId,
          validArguments.playerId,
          validArguments.movementCardId,
          validArguments.colorCardId1,
          validArguments.colorCardId2
        )
      ).rejects.toThrow(detailMessage);
    });
  });

  describe('when called with invalid arguments', () => {
    const invalidCases = [
      {
        description: 'a colorCardId is a string',
        args: { ...validArguments, colorCardId1: '4' },
      },
      {
        description: 'a colorCardId is missing',
        args: { ...validArguments, colorCardId2: undefined },
      },
      {
        description: 'a colorCardId is negative',
        args: { ...validArguments, colorCardId1: -4 },
      },
      {
        description: 'movementCardId is a string',
        args: { ...validArguments, movementCardId: '3' },
      },
      {
        description: 'movementCardId is missing',
        args: { ...validArguments, movementCardId: undefined },
      },
      {
        description: 'movementCardId is negative',
        args: { ...validArguments, movementCardId: -3 },
      },
    ];

    it.each(invalidCases)(
      'should throw an error if $description',
      async ({ args }) => {
        await expect(
          playMovementCard(
            args.gameId,
            args.playerId,
            args.movementCardId,
            args.colorCardId1,
            args.colorCardId2
          )
        ).rejects.toThrow('Datos de movimiento inválidos');
      }
    );
  });
});
