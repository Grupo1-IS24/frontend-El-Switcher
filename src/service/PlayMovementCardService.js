import axios from 'axios';
import { apiService } from './axiosConfig';
import { z } from 'zod';

// Schema to validate the data of the movement card to play.
const playMovementCardSchema = z.object({
  movementCardId: z.number().int(),
  squarePieceId1: z.number().int(),
  squarePieceId2: z.number().int(),
});

/**
 * Function to play a movement card. It sends a request to the server to play a movement card.
 *
 * @param {number} gameId - The game identifier.
 * @param {number} playerId - The player identifier.
 * @param {number} movementCardId - The movement card identifier.
 * @param {number} colorCardId1 - The first color card identifier.
 * @param {number} colorCardId2 - The second color card identifier.
 * @returns {Promise<void>} A promise that resolves if the movement card was played successfully, otherwise rejects with an error.
 * @throws {Error} If the data is invalid or an error occurs while playing the movement
 */
export const playMovementCard = async (
  gameId,
  playerId,
  movementCardId,
  colorCardId1,
  colorCardId2
) => {
  const playMovementCardBody = {
    movementCardId,
    squarePieceId1: colorCardId1,
    squarePieceId2: colorCardId2,
  };

  try {
    playMovementCardSchema.parse(playMovementCardBody);

    await apiService.post(
      `/game/${gameId}/move/${playerId}`,
      playMovementCardBody
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Error validando datos de movimiento:', error);
      throw new Error('Datos de movimiento inválidos');
    }

    if (axios.isAxiosError(error)) {
      console.error('Error jugando carta de movimiento:', error);
      throw new Error(
        error.response?.data?.detail ??
          'Error desconocido en la respuesta del servidor'
      );
    }

    console.error('Error inesperado jugando carta de movimiento:', error);
    throw new Error('Error inesperado jugando carta de movimiento');
  }
};
