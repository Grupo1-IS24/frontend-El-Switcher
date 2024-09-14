import { useParams } from 'react-router-dom';

const LobbyPage = () => {
  const { gameId } = useParams();

  return <h1>Lobby {gameId}</h1>;
};

export default LobbyPage;
