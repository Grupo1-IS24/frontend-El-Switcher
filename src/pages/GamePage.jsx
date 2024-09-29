import DisplayPlayers from '../components/DisplayPlayers/DisplayPlayers';
import useWebsocketGame from '../hooks/useWebsocketGame';

const GamePage = () => {
  const { listOfPlayers } = useWebsocketGame();

  return <DisplayPlayers listOfPlayers={listOfPlayers} />;
};

export default GamePage;
