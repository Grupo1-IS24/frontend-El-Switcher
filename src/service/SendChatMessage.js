import axios from 'axios';
import { apiService } from './axiosConfig';
import { z } from 'zod';

const messageSchema = z.object({
  playerId: z.number().int().nonnegative(),
  message: z.string(),
});

export const sendChatMessage = async (playerId, gameId, message) => {
  const messageBody = {
    playerId,
    message,
  };

  try {
    messageSchema.parse(messageBody);

    await apiService.post(`/game/${gameId}/send_message`, messageBody);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Error validando datos de mensaje:', error);
      throw new Error('Datos de mensaje inválidos');
    }

    if (axios.isAxiosError(error)) {
      console.error('Error enviando mensaje:', error);
      throw new Error(
        'Error al enviar el mensaje al servidor. Intente nuevamente.'
      );
    }

    console.error('Error enviando mensaje:', error);
    throw new Error('Error inesperado enviando mensaje');
  }
};
