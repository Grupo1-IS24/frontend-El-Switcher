import { apiService } from './axiosConfig';

export const leaveGame = async (gameID, playerID) => {
  try {
    await apiService.delete(
      `/game/${gameID}/leave/${playerID}`
    );
  } catch (error) {
    console.error(`error abandonando el lobby: ${error}`);
  }
};