import PlayerInfo from '../PlayerInfo/PlayerInfo';

const DisplayPlayers = ({ listOfPlayers }) => {
  return (
    <>
      {listOfPlayers.map((player, index) => (
        <PlayerInfo
          playerName={player.playerName}
          index={index}
          key={player.playerId}
        />
      ))}
    </>
  );
};

export default DisplayPlayers;
