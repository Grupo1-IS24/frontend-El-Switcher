import { apiService } from './axiosConfig';

const ERROR_MESSAGES = {
  REQUIRED_FIELDS: 'All fields are required',
  MIN_GREATER_THAN_MAX:
    'Minimum players cannot be greater than maximum players',
  MIN_PLAYERS: 'Minimum players must be at least 2',
  MAX_PLAYERS: 'Maximum players must be at most 4',
  GAME_CREATION: 'Error creating the game',
};

const isEmpty = (value) => {
  if (typeof value === 'string') return value.trim() === '';
  if (typeof value === 'number') return value === 0;
  return value === null || value === undefined;
};

const areAnyEmpty = (values) => values.some(isEmpty);

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

const isValidId = (id) => typeof id === 'number' && id >= 0;

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

export { createGame, isEmpty };
