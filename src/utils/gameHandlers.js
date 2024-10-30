import { createGame } from '../service/CreateGameService';
import { joinGame } from '../service/JoinGameService';
import showToast from './toastUtil';

const showErrorToast = (message) => {
  showToast({
    type: 'error',
    message,
    autoClose: 3000,
  });
};

const showWarningToast = (message) => {
  showToast({
    type: 'warning',
    message,
    autoClose: 3000,
  });
};

export const handleCreateGame = async (
  elements,
  createPlayer,
  redirectToLobbyPage
) => {
  const gameInfo = {
    ownerName: elements.ownerName.value,
    gameName: elements.gameName.value,
    minPlayers: elements.minPlayers.value,
    maxPlayers: elements.maxPlayers.value,
  };

  try {
    const createdGame = await createGame(gameInfo);
    if (createdGame && createdGame.gameId) {
      createPlayer(createdGame.ownerId, true);
      redirectToLobbyPage(createdGame.gameId);
    } else {
      showErrorToast('Error al crear la partida');
    }
  } catch (error) {
    console.error('Error al crear la partida', error);
    showErrorToast('Hubo un problema al crear el juego');
  }
};

export const handleJoinGame = async (
  elements,
  selectedGame,
  createPlayer,
  redirectToLobbyPage
) => {
  if (elements.playerName.value === '') {
    showWarningToast('El nombre del jugador no puede estar vacío');
    return;
  }

  const playerJoinData = {
    playerName: elements.playerName.value,
  };

  if (selectedGame.isPublic === false) {
    if (elements.gamePassword.value === '') {
      showWarningToast('Ingresa la contraseña de la partida');
      return;
    }
    playerJoinData.password = elements.gamePassword.value;
  }

  try {
    const playerResponseData = await joinGame(
      playerJoinData,
      selectedGame.gameId
    );
    createPlayer(playerResponseData.playerId);
    redirectToLobbyPage(selectedGame.gameId);
  } catch (error) {
    if (error.message.includes('Incorrect password.')) {
      showErrorToast('Contraseña incorrecta');
    } else if (error.message.includes('is full')) {
      showErrorToast(`La partida '${selectedGame.gameName}' está llena`);
    } else {
      showErrorToast(error.message);
    }
  }
};
