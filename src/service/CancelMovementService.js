import axios from 'axios';
import { apiService } from './axiosConfig';
import { z } from 'zod';

// Schema to validate the data for canceling a movement.
const cancelMovementSchema = z.object({
  gameID: z.number().int().nonnegative(),
  playerID: z.number().int().nonnegative(),
});

/**
 * Function to cancel a movement. It sends a request to the server to cancel a movement.
 *
 * @param {number} gameID - The game identifier.
 * @param {number} playerID - The player identifier.
 * @returns {Promise<void>} A promise that resolves if the movement was canceled successfully, otherwise rejects with an error.
 * @throws {Error} If the data is invalid or an error occurs while canceling the movement.
 */
export const cancelMovement = async (gameID, playerID) => {
  const cancelMovementBody = { gameID, playerID };

  try {
    cancelMovementSchema.parse(cancelMovementBody);

    const response = await apiService.post(
      `/game/${gameID}/move_undo/${playerID}`
    );
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Error validando datos de cancelación:', error);
      throw new Error('Datos de cancelación inválidos');
    }

    if (axios.isAxiosError(error)) {
      console.error('Error cancelando el movimiento:', error);
      throw new Error(
        error.response?.data?.detail ??
          'Error desconocido en la respuesta del servidor'
      );
    }

    console.error('Error inesperado cancelando el movimiento:', error);
    throw new Error('Error inesperado cancelando el movimiento');
  }
};
