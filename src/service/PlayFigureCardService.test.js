import { describe, it, expect, vi, afterEach } from 'vitest';
import { apiService } from './axiosConfig';
import { playFigureCard } from './PlayFigureCardService';

// Mock the apiService.
vi.mock('./axiosConfig', () => ({
  apiService: {
    post: vi.fn(),
  },
}));

describe('playFigureCard Service', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const validArguments = {
    gameId: 1,
    playerId: 2,
    figureCardId: 99,
    colorCards: [
      {
        color: 'BLUE',
        row: 0,
        column: 0,
      },
      {
        color: 'BLUE',
        row: 0,
        column: 1,
      },
      {
        color: 'BLUE',
        row: 0,
        column: 2,
      },
      {
        color: 'BLUE',
        row: 1,
        column: 1,
      },
      {
        color: 'BLUE',
        row: 1,
        column: 2,
      },
    ],
  };

  const callPlayFigureCard = async (args) => {
    return await playFigureCard(
      args.gameId,
      args.playerId,
      args.figureCardId,
      args.colorCards
    );
  };

  describe('API Call', () => {
    it('should call the API with the correct endpoint and body', async () => {
      apiService.post.mockResolvedValue({});

      await callPlayFigureCard(validArguments);

      expect(apiService.post).toHaveBeenCalledWith(
        `/game/${validArguments.gameId}/play_figure/${validArguments.playerId}`,
        {
          figureCardId: validArguments.figureCardId,
          colorCards: validArguments.colorCards,
        }
      );
    });

    it('should resolve successfully if the API call is successful', async () => {
      apiService.post.mockResolvedValue({});

      await expect(callPlayFigureCard(validArguments)).resolves.toBeUndefined();
    });
  });

  describe('Error Handling', () => {
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

      await expect(callPlayFigureCard(validArguments)).rejects.toThrow(
        detailMessage
      );
    });

    it('should throw a generic error if the API response does not contain a detail message', async () => {
      const axiosError = {
        isAxiosError: true,
        response: {
          status: 400,
          data: {},
        },
      };

      apiService.post.mockRejectedValue(axiosError);

      await expect(callPlayFigureCard(validArguments)).rejects.toThrow(
        'Error desconocido en la respuesta del servidor'
      );
    });

    it('should throw an unexpected error if a non-Axios error occurs', async () => {
      const unexpectedError = new Error('Unexpected error');

      apiService.post.mockRejectedValue(unexpectedError);

      await expect(callPlayFigureCard(validArguments)).rejects.toThrow(
        'Error inesperado jugando carta de figura'
      );
    });
  });

  describe('Validation Errors', () => {
    const invalidCases = [
      {
        description: 'a figureCardId is a string',
        args: { ...validArguments, figureCardId: '4' },
      },
      {
        description: 'a figureCardId is missing',
        args: { ...validArguments, figureCardId: undefined },
      },
      {
        description: 'a figureCardId is negative',
        args: { ...validArguments, figureCardId: -4 },
      },
      {
        description: 'a row in colorCard is negative',
        args: {
          ...validArguments,
          colorCards: [
            { color: 'RED', row: -1, column: 0 }, // Invalid row
          ],
        },
      },
      {
        description: 'a column in colorCard is negative',
        args: {
          ...validArguments,
          colorCards: [
            { color: 'RED', row: 0, column: -1 }, // Invalid column
          ],
        },
      },
      {
        description: 'a color in colorCard is not a string',
        args: {
          ...validArguments,
          colorCards: [
            { color: 123, row: 0, column: 0 }, // Invalid color
          ],
        },
      },
    ];

    it.each(invalidCases)(
      'should throw an error if $description',
      async ({ args }) => {
        await expect(callPlayFigureCard(args)).rejects.toThrow(
          'Datos de figura inválidos'
        );
      }
    );
  });
});
