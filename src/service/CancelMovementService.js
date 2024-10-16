import { apiService } from './axiosConfig';

export const cancelMovement = async (gameID, playerID) => {
  if (gameID === null || playerID === null) {
    throw new Error('gameID o playerID no están definidos');
  }

  try {
    const response = await apiService.post(
      `/game/${gameID}/move_undo/${playerID}`
    );
    return response;
  } catch (error) {
    console.error(`error al cancelar el movimiento: ${error}`);
    throw new Error('Error cancelando el movimiento');
  }
};