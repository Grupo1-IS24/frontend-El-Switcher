import { apiService } from './axiosConfig';

export const leaveGame = async (gameID, playerID) => {
  try {
    const response = await apiService.delete(
      `/game/${gameID}/leave/${playerID}`
    );
    return response;
  } catch (error) {
    console.error(`error abandonando el lobby: ${error}`);
    throw error;
  }
};