import { apiService } from "./axiosConfig";

export const leaveLobby = async (gameID, playerID) => {
  try {
    const response = await apiService.delete(
      `/game/${gameID}/leave/${playerID}`
    );
    return response;
  } catch (error) {
    console.error(`error abandonando el lobby: ${error}`);
  }
};
