import DisplayPlayers from '../components/DisplayPlayers/DisplayPlayers';
import useWebsocketGame from '../hooks/useWebsocketGame';
import Board from '../components/Board/Board';

const GamePage = () => {
  const { listOfPlayers, board, playerTurnId } = useWebsocketGame();

  return (
    <>
      <DisplayPlayers
        listOfPlayers={listOfPlayers}
        playerTurnId={playerTurnId}
      />
      <Board board={board} />
    </>
  );
};

export default GamePage;
