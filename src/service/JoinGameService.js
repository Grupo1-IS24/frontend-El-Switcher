import { z } from 'zod';
import { apiService } from './axiosConfig';

const playerJoinDataSchema = z.object({
  playerName: z
    .string()
    .min(1, { message: 'El nombre del jugador no puede estar vacío' }),
});

const playerResponseDataSchema = z.object({
  playerId: z.number().int(),
  playerName: z.string(),
});

/**
 * Validates the player join data from the form.
 *
 * @param {Object} playerJoinData - The player join data to validate.
 * @throws {Error} - Throws an error if the player join data is invalid.
 */
const validatePlayerJoinData = (playerJoinData) => {
  try {
    playerJoinDataSchema.parse(playerJoinData);
  } catch (error) {
    console.error('Error validando datos del jugador:', error);
    throw new Error(`Datos inválidos: ${error.errors[0].message}`);
  }
};

/**
 * Validates the player response data from the server.
 *
 * @param {Object} playerResponseData - The player response data to validate.
 * @throws {Error} - Throws an error if the player response data is invalid.
 */
const validatePlayerResponseData = (playerResponseData) => {
  try {
    playerResponseDataSchema.parse(playerResponseData);
  } catch (error) {
    console.error('Error validando respuesta del servidor:', error);
    throw new Error('Datos de respuesta inválidos por parte del servidor');
  }
};

/**
 * Handles server errors.
 *
 * @param {Error} error - The error to handle.
 * @throws {Error} - Throws an error with the server error message.
 */
const handleServerError = (error) => {
  if (error.response) {
    console.error('Error en la respuesta del servidor:', error.response);

    const errorMessage =
      error.response.data?.detail ?? 'El servidor ha rechazado la solicitud';

    throw new Error(errorMessage);
  } else {
    console.error('Error inesperado del servidor:', error);
    throw new Error(
      'Error inesperado del servidor (posible fallo de red o en la solicitud)'
    );
  }
};

/**
 * Joins a player to a game.
 *
 * @param {Object} playerJoinData - The player join data.
 * @param {number} gameId - The game ID.
 * @returns {Promise<Object>} - A promise that resolves to the player response data.
 * @throws {Error} - Throws an error if the API request fails, if the player join data is invalid,
 *                   or if the player response data is invalid.
 */
export const joinGame = async (playerJoinData, gameId) => {
  validatePlayerJoinData(playerJoinData);

  let playerResponseData;

  try {
    const response = await apiService.post(
      `/game/${gameId}/join`,
      playerJoinData
    );

    playerResponseData = response.data;
  } catch (error) {
    handleServerError(error);
  }

  validatePlayerResponseData(playerResponseData);

  return playerResponseData;
};
