import DisplayPlayers from '../components/DisplayPlayers/DisplayPlayers';
import Board from '../components/Board/Board';
import WinnerMessage from '../components/WinnerMessage/WinnerMessage';
import BgOverlay from '../components/BgOverlay/BgOverlay';
import LeaveButton from '../components/LeaveButton/LeaveButton';
import { useContext } from 'react';
import { GameContext } from '../contexts/GameProvider';
import PlayCardLogicProvider from '../contexts/PlayCardLogicProvider';
import Timer from '../components/Timer/Timer';
import BlockedColor from '../components/BlockedColor/BlockedColor';

const GamePage = () => {
  const { listOfPlayers, board, timer } = useContext(GameContext);

  return (
    <>
      <BgOverlay />
      <div className='w-screen absolute flex flex-col items-center top-[60px]'>
        <div className='flex items-center justify-between w-full max-w-[650px] p-4'>
          <BlockedColor />
          {timer > 0 && <Timer time={timer} />}
        </div>
      </div>
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
