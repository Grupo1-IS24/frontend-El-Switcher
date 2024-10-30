import { createGame } from '../service/CreateGameService';
import { joinGame } from '../service/JoinGameService';
import showToast from './toastUtil';

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
      showToast({
        type: 'error',
        message: 'Error al crear la partida',
        autoClose: 3000,
      });
    }
  } catch (error) {
    console.error('Error al crear la partida', error);
    showToast({
      type: 'error',
      message: 'Hubo un problema al crear el juego',
      autoClose: 3000,
    });
  }
};

export const handleJoinGame = async (
  elements,
  selectedGame,
  createPlayer,
  redirectToLobbyPage
) => {
  if (elements.playerName.value === '') {
    showToast({
      type: 'warning',
      message: 'El nombre del jugador no puede estar vacío',
      autoClose: 3000,
    });
    return;
  }

  const playerJoinData = {
    playerName: elements.playerName.value,
  };

  if (selectedGame.isPublic === false) {
    if (elements.gamePassword.value === '') {
      showToast({
        type: 'warning',
        message: 'Ingresa la contraseña de la partida',
        autoClose: 3000,
      });
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
      showToast({
        type: 'error',
        message: 'Contraseña incorrecta',
        autoClose: 3000,
      });
    } else if (error.message.includes('is full')) {
      showToast({
        type: 'error',
        message: `La partida '${selectedGame.gameName}' está llena`,
        autoClose: 3000,
      });
    } else {
      showToast({
        type: 'error',
        message: error.message,
        autoClose: 3000,
      });
    }
  }
};
