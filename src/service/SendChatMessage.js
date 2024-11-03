import axios from 'axios';
import { apiService } from './axiosConfig';
import { z } from 'zod';
import {
  ERROR_MESSAGE_INVALID,
  ERROR_MESSAGE_SEND_FAILURE,
  ERROR_MESSAGE_UNEXPECTED,
} from '../constants/chatErrorMessages';

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
      throw new Error(ERROR_MESSAGE_INVALID);
    }

    if (axios.isAxiosError(error)) {
      console.error('Error enviando mensaje:', error);
      throw new Error(ERROR_MESSAGE_SEND_FAILURE);
    }

    console.error('Error enviando mensaje:', error);
    throw new Error(ERROR_MESSAGE_UNEXPECTED);
  }
};
