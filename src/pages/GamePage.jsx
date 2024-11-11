import DisplayPlayers from '../components/DisplayPlayers/DisplayPlayers';
import Board from '../components/Board/Board';
import WinnerMessage from '../components/WinnerMessage/WinnerMessage';
import BgOverlay from '../components/BgOverlay/BgOverlay';
import LeaveButton from '../components/LeaveButton/LeaveButton';
import { useContext, useEffect } from 'react';
import { GameContext } from '../contexts/GameProvider';
import PlayCardLogicProvider from '../contexts/PlayCardLogicProvider';
import Timer from '../components/Timer/Timer';
import ChatBox from '../components/ChatBox/ChatBox';
import BlockedColor from '../components/BlockedColor/BlockedColor';
import useWebsocketGame from '../hooks/useWebsocketGame';
import { useParams, Navigate } from 'react-router-dom';
import useGetGame from '../hooks/useGetGame';

const GamePage = () => {
  const { listOfPlayers, board, timer } = useContext(GameContext);
  const { isLoading } = useWebsocketGame();
  const { gameId } = useParams();
  const { game, gameError, refreshGame } = useGetGame(gameId);

  useEffect(() => {
    if (isLoading && !game) {
      refreshGame();
    }
  }, [isLoading, game, refreshGame]);

  if (gameError) {
    return <Navigate to='/*' />;
  }

  return (
    <>
      <BgOverlay />
      <div className='w-screen absolute flex flex-col items-center pc:top-[60px]'>
        <div className='flex items-center justify-between w-full max-w-[425px] pc:max-w-[650px] p-4'>
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
      <ChatBox />
    </>
  );
};

export default GamePage;
