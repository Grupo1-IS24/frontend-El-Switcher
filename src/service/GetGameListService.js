import { apiService } from './axiosConfig';

const ERRORS = {
  NO_DATA: 'La lista de juegos no fue proporcionada',
  IS_NOT_ARRAY: 'La lista de juegos no es un arreglo',
  INSUFICIENT_FIELDS: 'Faltan campos del juego',
  INVALID_FIELD_TYPE: 'Tipo de campo inválido',
};

const validateGameList = (gameList) => {
  if (!gameList) throw new Error(ERRORS.NO_DATA);

  if (!Array.isArray(gameList)) throw new Error(ERRORS.IS_NOT_ARRAY);

  for (const { gameId, gameName, connectedPlayers, maxPlayers } of gameList) {
    if (!gameId || !gameName || !connectedPlayers || !maxPlayers) {
      throw new Error(ERRORS.INSUFICIENT_FIELDS);
    }

    if (
      !Number.isInteger(gameId) ||
      typeof gameName !== 'string' ||
      !Number.isInteger(connectedPlayers) ||
      !Number.isInteger(maxPlayers)
    ) {
      throw new Error(ERRORS.INVALID_FIELD_TYPE);
    }
  }
};

export const getGameList = async () => {
  try {
    const response = await apiService.get('/game_list');

    const gameList = response.data;

    validateGameList(gameList);

    return gameList;
  } catch (error) {
    console.error(`Error al obtener la lista de juegos: ${error.message}`); // Log the error

    throw error; // Propagate the error to the caller
  }
};
