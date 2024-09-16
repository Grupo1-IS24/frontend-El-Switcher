import axios from 'axios';

/**
 * @param {string | number} value - Valor a evaluar
 * @returns {boolean} - Retorna true si el valor es vacío, de lo contrario retorna false
 **/
const isEmpty = (value) => {
  if (typeof value === 'string') return value.trim() === '';
  if (typeof value === 'number') return value === 0;

  return value === null || value === undefined;
};

/**
 * @param {string} gameName - Nombre del juego
 * @param {string} ownerName - Nombre del host de la partida
 * @param {number} minPlayers - Mínimo de jugadores
 * @param {number} maxPlayers - Máximo de jugadores
 * @returns {Promise<void>}
 **/
const createGame = async (
  gameName = '',
  ownerName = '',
  minPlayers = 0,
  maxPlayers = 0
) => {
  if (
    isEmpty(gameName) ||
    isEmpty(ownerName) ||
    isEmpty(minPlayers) ||
    isEmpty(maxPlayers)
  ) {
    alert('Todos los campos son requeridos');
    return null;
  }

  if (minPlayers > maxPlayers) {
    alert('El mínimo de jugadores no puede ser mayor al máximo de jugadores');
    return null;
  }

  if (minPlayers < 2) {
    alert('El mínimo de jugadores debe ser al menos 2');
    return null;
  }

  if (maxPlayers > 4) {
    alert('El máximo de jugadores debe ser como máximo 4');
    return null;
  }

  const data = {
    gameName,
    ownerName,
    minPlayers,
    maxPlayers,
  };

  try {
    const response = await axios.post('/game_create', data);
    const { ownerId, gameId } = response.data;
    if (typeof ownerId !== 'number' || typeof gameId !== 'number') {
      alert('Error al crear la partida');
      return null;
    }
    if (!ownerId || !gameId) {
      alert('Error al crear la partida');
      return null;
    }
    return response.data;
  } catch (error) {
    alert('Error al crear la partida');
    console.error(error.message);
    return null;
  }
};

export { createGame };
