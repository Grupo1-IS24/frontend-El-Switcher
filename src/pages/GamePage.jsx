import DisplayPlayers from '../components/DisplayPlayers/DisplayPlayers';
import Board from '../components/Board/Board';
import WinnerMessage from '../components/WinnerMessage/WinnerMessage';
import BgOverlay from '../components/BgOverlay/BgOverlay';
import LeaveButton from '../components/LeaveButton/LeaveButton';
import { useContext } from 'react';
import { GameContext } from '../contexts/GameProvider';
import PlayCardLogicProvider from '../contexts/PlayCardLogicProvider';
import Timer from '../components/Timer/Timer';

const GamePage = () => {
  const { listOfPlayers, board, timer } = useContext(GameContext);

  return (
    <>
      <BgOverlay />
      { timer > 0 && <Timer time={timer} /> }
      <PlayCardLogicProvider>
        <DisplayPlayers listOfPlayers={listOfPlayers} />
        <Board board={board} />
      </PlayCardLogicProvider>
      <WinnerMessage />
      <LeaveButton />
    </>
  );
};

export default GamePage;
