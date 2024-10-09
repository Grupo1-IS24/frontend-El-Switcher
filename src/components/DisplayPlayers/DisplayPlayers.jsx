import PlayerInfo from '../PlayerInfo/PlayerInfo';

const DisplayPlayers = ({ listOfPlayers, playerTurnId }) => {
  return (
    <>
      {listOfPlayers.map((player, index) => (
        <PlayerInfo
          playerName={player.playerName}
          playerId={player.playerId}
          index={index}
          isTurn={player.playerId === playerTurnId}
          key={player.playerId}
        />
      ))}
    </>
  );
};

export default DisplayPlayers;
