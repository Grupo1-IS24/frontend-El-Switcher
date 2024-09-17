import { apiService } from './axiosConfig';

// Error messages
const ERROR_MESSAGES = {
  REQUIRED_FIELDS: 'All fields are required',
  MIN_GREATER_THAN_MAX:
    'Minimum players cannot be greater than maximum players',
  MIN_PLAYERS: 'Minimum players must be at least 2',
  MAX_PLAYERS: 'Maximum players must be at most 4',
  GAME_CREATION: 'Error creating the game',
};

/**
 * Checks if a value is empty.
 * @param {string | number | null | undefined} value - Value to evaluate.
 * @returns {boolean} - Returns true if the value is empty, otherwise false.
 **/
const isEmpty = (value) => {
  if (typeof value === 'string') return value.trim() === '';
  if (typeof value === 'number') return value === 0;
  return value === null || value === undefined;
};

/**
 * Checks if any of the values in the array are empty.
 * @param {Array<string | number | null | undefined>} values - Array of values to evaluate.
 * @returns {boolean} - Returns true if any of the values are empty, otherwise false.
 **/
const areAnyEmpty = (values) => {
  return values.some(isEmpty);
};

/**
 * Validates the input data for creating a game.
 * @param {string} gameName - Name of the game.
 * @param {string} ownerName - Name of the game host.
 * @param {number} minPlayers - Minimum number of players.
 * @param {number} maxPlayers - Maximum number of players.
 * @throws {Error} - Throws an error if validation fails.
 **/
const validateGameData = ({
  gameName = '',
  ownerName = '',
  minPlayers = 0,
  maxPlayers = 0,
}) => {
  if (areAnyEmpty([gameName, ownerName, minPlayers, maxPlayers])) {
    throw new Error(ERROR_MESSAGES.REQUIRED_FIELDS);
  }

  if (minPlayers > maxPlayers) {
    throw new Error(ERROR_MESSAGES.MIN_GREATER_THAN_MAX);
  }

  if (minPlayers < 2) {
    throw new Error(ERROR_MESSAGES.MIN_PLAYERS);
  }

  if (maxPlayers > 4) {
    throw new Error(ERROR_MESSAGES.MAX_PLAYERS);
  }
};

/**
 * Checks if an ID is valid.
 * @param {number} id - ID to evaluate.
 * @returns {boolean} - Returns true if the ID is valid, otherwise false.
 **/
const isValidId = (id) => {
  return typeof id === 'number' && id >= 0;
};

/**
 * Creates a new game.
 * @param {Object} gameData - Game data.
 * @param {string} gameData.gameName - Name of the game.
 * @param {string} gameData.ownerName - Name of the game host.
 * @param {number} gameData.minPlayers - Minimum number of players.
 * @param {number} gameData.maxPlayers - Maximum number of players.
 * @returns {Promise<{ownerId: number, gameId: number} | null>} - Returns an object with ownerId and gameId if creation is successful, otherwise null.
 **/
const createGame = async (gameData) => {
  try {
    validateGameData(gameData);

    const response = await apiService.post('/game_create', gameData);
    const { ownerId, gameId } = response.data;

    if (!isValidId(ownerId) || !isValidId(gameId)) {
      throw new Error(ERROR_MESSAGES.GAME_CREATION);
    }

    return response.data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export { createGame };
