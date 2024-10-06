import DisplayPlayers from '../components/DisplayPlayers/DisplayPlayers';
import useWebsocketGame from '../hooks/useWebsocketGame';
import Board from '../components/Board/Board';
import WinnerMessage from '../components/WinnerMessage/WinnerMessage';
import BgOverlay from '../components/BgOverlay/BgOverlay';
import LeaveButton from '../components/LeaveButton/LeaveButton';
import EndTurnButton from '../components/EndTurnButton/EndTurnButton';
import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerProvider';

const GamePage = () => {
  const { listOfPlayers, board, playerTurnId, winnerInfo } = useWebsocketGame();
  const { playerID } = useContext(PlayerContext);

  return (
    <>
      <BgOverlay />
      <DisplayPlayers
        listOfPlayers={listOfPlayers}
        playerTurnId={playerTurnId}
      />
      <Board board={board} />
      {winnerInfo !== null && (
        <WinnerMessage winnerName={winnerInfo.nameWinner} />
      )}
      <div className='absolute flex flex-col gap-3 top-2/3 left-10'>
        {playerID === playerTurnId && <EndTurnButton />}
        <LeaveButton />
      </div>
    </>
  );
};

export default GamePage;
