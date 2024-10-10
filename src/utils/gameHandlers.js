import { createGame } from '../service/CreateGameService';
import { joinGame } from '../service/JoinGameService';

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
      alert('Error al crear la partida');
    }
  } catch (error) {
    console.error('Error al crear la partida', error);
    alert('Hubo un problema al crear el juego');
  }
};

export const handleJoinGame = async (
  elements,
  selectedGame,
  createPlayer,
  redirectToLobbyPage
) => {
  const playerJoinData = {
    playerName: elements.playerName.value,
  };

  try {
    const playerResponseData = await joinGame(
      playerJoinData,
      selectedGame.gameId
    );
    createPlayer(playerResponseData.playerId);
    redirectToLobbyPage(selectedGame.gameId);
  } catch (error) {
    if (error.message.includes('is full')) {
      alert(`La partida '${selectedGame.gameName}' está llena`);
    } else {
      alert(error.message);
    }
  }
};
