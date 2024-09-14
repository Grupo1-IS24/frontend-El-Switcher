import { useParams } from 'react-router-dom';

const GamePage = () => {
  const { gameId } = useParams();

  return <h1>Game {gameId}</h1>;
};

export default GamePage;
