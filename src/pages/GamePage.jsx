import DisplayPlayers from '../components/DisplayPlayers/DisplayPlayers';
import Board from '../components/Board/Board';
import WinnerMessage from '../components/WinnerMessage/WinnerMessage';
import BgOverlay from '../components/BgOverlay/BgOverlay';
import LeaveButton from '../components/LeaveButton/LeaveButton';
import { useContext } from 'react';
import { GameContext } from '../contexts/GameProvider';
import PlayCardLogicProvider from '../contexts/PlayCardLogicProvider';

const GamePage = () => {
  const { listOfPlayers, board } = useContext(GameContext);

  return (
    <>
      <BgOverlay />
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
