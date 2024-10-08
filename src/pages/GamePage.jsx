import DisplayPlayers from '../components/DisplayPlayers/DisplayPlayers';
import Board from '../components/Board/Board';
import WinnerMessage from '../components/WinnerMessage/WinnerMessage';
import BgOverlay from '../components/BgOverlay/BgOverlay';
import LeaveButton from '../components/LeaveButton/LeaveButton';
import EndTurnButton from '../components/EndTurnButton/EndTurnButton';
import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerProvider';
import { GameContext } from '../contexts/GameProvider';

const GamePage = () => {
  const { listOfPlayers, board, playerTurnId, winnerInfo } = useContext(GameContext);
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
