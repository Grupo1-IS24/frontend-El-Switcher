import { apiService } from './axiosConfig';

/**
 * Starts a game with the given game ID.
 *
 * @param {string} gameID - The ID of the game to start.
 * @returns {Promise<number>} - A promise that resolves to the game ID if the game starts successfully.
 * @throws {Error} - Throws an error if the game could not be started.
 */
const startGame = async (gameID) => {
  try {
    const gameIDNumber = parseInt(gameID);
    const response = await apiService.post(`/game/${gameIDNumber}/start`);
    const { gameId, status } = response.data;
    const isTypeCorrect =
      typeof gameId === 'number' && typeof status === 'string';

    if (gameId !== gameIDNumber || status !== 'Ingame' || !isTypeCorrect) {
      throw new Error('Error starting the game');
    }

    return gameId;
  } catch (error) {
    console.error(`Error starting the game: ${error}`);
    throw error;
  }
};

export { startGame };
