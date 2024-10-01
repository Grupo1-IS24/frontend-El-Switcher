import { apiService } from './axiosConfig';

export const endTurn = async (gameID, playerID) => {
  if (gameID === null || playerID === null) {
    throw new Error('gameID o playerID no están definidos');
  }

  try {
    const response = await apiService.post(
      `/game/${gameID}/end_turn/${playerID}`
    );
    return response;
  } catch (error) {
    console.error(`error al terminar el turno: ${error}`);
    throw error;
  }
};
