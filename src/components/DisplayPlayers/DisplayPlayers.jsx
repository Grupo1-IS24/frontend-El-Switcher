import usePlayerTurn from '../../hooks/usePlayerTurn';
import PlayerInfo from '../PlayerInfo/PlayerInfo';

const DisplayPlayers = ({ listOfPlayers }) => {
  const { isPlayerTurn } = usePlayerTurn();

  return (
    <>
      {listOfPlayers.map((player, index) => (
        <PlayerInfo
          playerName={player.playerName}
          playerId={player.playerId}
          index={index}
          isTurn={isPlayerTurn(player.playerId)}
          key={player.playerId}
        />
      ))}
    </>
  );
};

export default DisplayPlayers;
