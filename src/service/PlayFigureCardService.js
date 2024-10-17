import axios from 'axios';
import { apiService } from './axiosConfig';
import { z } from 'zod';

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
