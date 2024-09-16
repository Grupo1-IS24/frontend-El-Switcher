import axios from 'axios';

// Mensajes de error
const ERROR_MESSAGES = {
  REQUIRED_FIELDS: 'Todos los campos son requeridos',
  MIN_GREATER_THAN_MAX:
    'El mínimo de jugadores no puede ser mayor al máximo de jugadores',
  MIN_PLAYERS: 'El mínimo de jugadores debe ser al menos 2',
  MAX_PLAYERS: 'El máximo de jugadores debe ser como máximo 4',
  GAME_CREATION: 'Error al crear la partida',
};

/**
 * Verifica si un valor es vacío.
 * @param {string | number | null | undefined} value - Valor a evaluar.
 * @returns {boolean} - Retorna true si el valor es vacío, de lo contrario retorna false.
 **/
const isEmpty = (value) => {
  if (typeof value === 'string') return value.trim() === '';
  if (typeof value === 'number') return value === 0;
  return value === null || value === undefined;
};

/**
 * Valida los datos de entrada para la creación de un juego.
 * @param {string} gameName - Nombre del juego.
 * @param {string} ownerName - Nombre del host de la partida.
 * @param {number} minPlayers - Mínimo de jugadores.
 * @param {number} maxPlayers - Máximo de jugadores.
 * @throws {Error} - Lanza un error si la validación falla.
 **/
const validateGameData = (gameName, ownerName, minPlayers, maxPlayers) => {
  if (
    isEmpty(gameName) ||
    isEmpty(ownerName) ||
    isEmpty(minPlayers) ||
    isEmpty(maxPlayers)
  ) {
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
 * Crea un nuevo juego.
 * @param {string} gameName - Nombre del juego.
 * @param {string} ownerName - Nombre del host de la partida.
 * @param {number} minPlayers - Mínimo de jugadores.
 * @param {number} maxPlayers - Máximo de jugadores.
 * @returns {Promise<{ownerId: number, gameId: number} | null>} - Retorna un objeto con ownerId y gameId si la creación es exitosa, de lo contrario retorna null.
 **/
const createGame = async (
  gameName = '',
  ownerName = '',
  minPlayers = 0,
  maxPlayers = 0
) => {
  try {
    validateGameData(gameName, ownerName, minPlayers, maxPlayers);

    const data = { gameName, ownerName, minPlayers, maxPlayers };
    const response = await axios.post('/game_create', data);
    const { ownerId, gameId } = response.data;

    if (
      !ownerId ||
      !gameId ||
      typeof ownerId !== 'number' ||
      typeof gameId !== 'number'
    ) {
      throw new Error(ERROR_MESSAGES.GAME_CREATION);
    }

    return response.data;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

export { createGame };
