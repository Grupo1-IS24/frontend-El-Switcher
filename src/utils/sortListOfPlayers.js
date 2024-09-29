/**
 * Sort the list of players so that the actual player is the first one.
 *
 * @param {Array} listOfPlayers An array of players.
 * @param {number} playerID The ID of the actual player.
 * @returns {Array} The sorted list of players.
 */
export const sortListOfPlayers = (listOfPlayers, playerID) => {
  const actualPlayer = listOfPlayers.find(
    (player) => player.playerId === playerID
  );
  const otherPlayers = listOfPlayers.filter(
    (player) => player.playerId !== playerID
  );

  return [actualPlayer, ...otherPlayers];
};
