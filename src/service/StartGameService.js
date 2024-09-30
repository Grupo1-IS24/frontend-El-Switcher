import { apiService } from "./axiosConfig";

const startGame = async (gameID) => {
  try {
    const gameIDNumber = parseInt(gameID);
    const response = await apiService.post(`/game/${gameIDNumber}/start`);
    const { gameId, status } = response.data;
    const isTypeCorrect = typeof gameId === 'number' && typeof status === 'string';

    if (gameId !== gameIDNumber || status !== 'Ingame' || !isTypeCorrect) {
      throw new Error('Error al iniciar el juego');
    }

    return gameId;
  } catch (error) {
    console.error(`error al iniciar el juego: ${error}`);
    throw error;
  }
}

export { startGame };