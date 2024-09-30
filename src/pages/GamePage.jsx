import DisplayPlayers from '../components/DisplayPlayers/DisplayPlayers';
import useWebsocketGame from '../hooks/useWebsocketGame';
import Board from '../components/Board/Board';
import WinnerMessage from '../components/WinnerMessage/WinnerMessage';

const GamePage = () => {
  const { listOfPlayers, board, playerTurnId, winnerInfo } = useWebsocketGame();

  return (
    <>
      <DisplayPlayers
        listOfPlayers={listOfPlayers}
        playerTurnId={playerTurnId}
      />
      <Board board={board} />
      {winnerInfo !== null && (
        <WinnerMessage winnerName={winnerInfo.nameWinner} />
      )}
    </>
  );
};

export default GamePage;
