import { apiService } from './axiosConfig';

/**
 * Fetches and validates a specific game by its ID from the backend API.
 *
 * @param {number} gameId - The ID of the game to fetch.
 * @returns {Promise<Object>} - A promise that resolves to the validated game object.
 * @throws {Error} - Throws an error if the API request fails or if the game validation fails.
 */
export const getGame = async (gameId) => {
  try {
    const response = await apiService.get(`/game/${gameId}`);
    const game = response.data;

    return game;
  } catch (error) {
    console.error(`Errores al obtener la partida con ID ${gameId}:\n ${error}`); // Log the error.

    throw error; // Propagate the error to the caller.
  }
};
