import axios from "axios";

/**
 * @param {string | number} value - Valor a evaluar
 * @returns {boolean} - Retorna true si el valor es vacío, de lo contrario retorna false
**/
const isEmpty = (value: string | number): boolean => {
  if (typeof value === 'string') return value.trim() === '';
  if (typeof value === 'number') return value === 0;
  
  return value === null || value === undefined;
}

/**
 * @param {string} gameName - Nombre del juego
 * @param {string} ownerName - Nombre del host de la partida
 * @param {number} minPlayers - Mínimo de jugadores
 * @param {number} maxPlayers - Máximo de jugadores
 * @returns {Promise<void>} 
 */
const createGame = async (gameName: string = '', ownerName: string = '', minPlayers: number = 0, maxPlayers: number = 0): Promise<void> => {
  if (isEmpty(gameName) || isEmpty(ownerName) || isEmpty(minPlayers) || isEmpty(maxPlayers)) {
    alert('Todos los campos son requeridos');
    return;
  }

  if (minPlayers > maxPlayers) { 
    alert('El mínimo de jugadores no puede ser mayor al máximo de jugadores');
    return;
  }

  if (minPlayers < 2) {
    alert('El mínimo de jugadores debe ser al menos 2');
    return;
  }

  if (maxPlayers > 4) {
    alert('El máximo de jugadores debe ser como máximo 4');
    return;
  }

  const data = {
    gameName,
    ownerName,
    minPlayers,
    maxPlayers,
  };

  try {
    const response = await axios.post('/game_create', data);
    window.location.href = `/game/${response.data.gameId}`;
  } catch (error) {
    alert('Error al crear la partida');
  }
}

export { createGame };