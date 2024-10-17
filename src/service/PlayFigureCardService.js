import axios from 'axios';
import { apiService } from './axiosConfig';
import { z } from 'zod';

// Schema to validate the data of the figure card to play.
const playFigureCardSchema = z.object({
  figureCardId: z.number().int().nonnegative(),
  colorCards: z.array(
    z.object({
      color: z.string(),
      row: z.number().int().nonnegative(),
      column: z.number().int().nonnegative(),
    })
  ),
});

/**
 * Function to play a figure card. It sends a request to the server to play a figure card.
 *
 * @param {number} gameId - The game identifier.
 * @param {number} playerId - The player identifier.
 * @param {number} figureCardId - The figure card identifier.
 * @param {object[]} colorCards - The color cards to play with the figure card.
 * @returns {Promise<void>} A promise that resolves if the figure card was played successfully, otherwise rejects with an error.
 * @throws {Error} If the data is invalid or an error occurs while playing the figure card
 */
export const playFigureCard = async (
  gameId,
  playerId,
  figureCardId,
  colorCards
) => {
  const playFigureCardBody = {
    figureCardId,
    colorCards,
  };

  try {
    playFigureCardSchema.parse(playFigureCardBody);

    await apiService.post(
      `/game/${gameId}/play_figure/${playerId}`,
      playFigureCardBody
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Error validando datos de figura:', error);
      throw new Error('Datos de figura inválidos');
    }

    if (axios.isAxiosError(error)) {
      console.error('Error jugando carta de figura:', error);
      throw new Error(
        error.response?.data?.detail ??
          'Error desconocido en la respuesta del servidor'
      );
    }

    console.error('Error inesperado jugando carta de figura:', error);
    throw new Error('Error inesperado jugando carta de figura');
  }
};
