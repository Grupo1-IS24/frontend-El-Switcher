import DisplayPlayers from '../components/DisplayPlayers/DisplayPlayers';
import Board from '../components/Board/Board';
import WinnerMessage from '../components/WinnerMessage/WinnerMessage';
import BgOverlay from '../components/BgOverlay/BgOverlay';
import LeaveButton from '../components/LeaveButton/LeaveButton';
import { useContext } from 'react';
import { GameContext } from '../contexts/GameProvider';
import PlayMovementLogicProvider from '../contexts/PlayMovementLogicProvider';

const GamePage = () => {
  const { listOfPlayers, board, winnerInfo } = useContext(GameContext);

  return (
    <>
      <BgOverlay />
      <PlayMovementLogicProvider>
        <DisplayPlayers listOfPlayers={listOfPlayers} />
        <Board board={board} />
      </PlayMovementLogicProvider>
      {winnerInfo !== null && (
        <WinnerMessage winnerName={winnerInfo.nameWinner} />
      )}
      <LeaveButton />
    </>
  );
};

export default GamePage;
