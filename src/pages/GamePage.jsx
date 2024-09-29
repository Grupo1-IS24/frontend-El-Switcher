import Board from '../components/Board/Board';
import useWebsocketGame from '../hooks/useWebsocketGame';

const GamePage = () => {
  const { board } = useWebsocketGame();

  return <Board board={board} />;
};

export default GamePage;
