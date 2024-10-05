import { z } from 'zod';
import { apiService } from './axiosConfig';

// Define the schema for the game object.
const gameSchema = z.object({
  gameId: z.number().int(), // must be an integer.
  gameName: z.string(), // must be a string.
  connectedPlayers: z.number().int(), // must be an integer.
  maxPlayers: z.number().int(), // must be an integer.
});

// Define the schema for the game list.
const gameListSchema = z.array(gameSchema);

/**
 * Fetches and validates the list of games from the backend API.
 *
 * @returns {Promise<Array<Object>>} - A promise that resolves to the validated list of games.
 * @throws {Error} - Throws an error if the API request fails or if the game list validation fails.
 * @deprecated This function is deprecated in favor of websockets.
 */
export const getGameList = async () => {
  try {
    const response = await apiService.get('/game_list');

    const gameList = response.data;

    // Validate the game list. If it's invalid, throw an error.
    gameListSchema.parse(gameList);

    return gameList;
  } catch (error) {
    console.error(`Errores al obtener la lista de partidas:\n ${error}`); // Log the error.

    throw error; // Propagate the error to the caller.
  }
};
