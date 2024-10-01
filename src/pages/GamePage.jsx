import DisplayPlayers from '../components/DisplayPlayers/DisplayPlayers';
import useWebsocketGame from '../hooks/useWebsocketGame';
import Board from '../components/Board/Board';
import WinnerMessage from '../components/WinnerMessage/WinnerMessage';
import EndTurnButton from '../components/EndTurnButton/EndTurnButton';
import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerProvider';

const GamePage = () => {
  const { listOfPlayers, board, playerTurnId, winnerInfo } = useWebsocketGame();
  const { playerID } = useContext(PlayerContext);

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
      <div className='absolute flex-col gap-2'>
        {playerID === playerTurnId && <EndTurnButton />}
      </div>
    </>
  );
};

export default GamePage;
