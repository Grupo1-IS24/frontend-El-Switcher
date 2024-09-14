import { useNavigate } from 'react-router-dom';

const useRouteNavigation = () => {
  const navigate = useNavigate();

  const redirectToHomePage = () => navigate('/');
  const redirectToGameListPage = () => navigate('/game-list');
  const redirectToLobbyPage = (gameId) => navigate(`/lobby/${gameId}`);
  const redirectToGamePage = (gameId) => navigate(`/game/${gameId}`);
  const redirectToNotFoundPage = () => navigate('*');

  return {
    redirectToHomePage,
    redirectToGameListPage,
    redirectToLobbyPage,
    redirectToGamePage,
    redirectToNotFoundPage,
  };
};

export default useRouteNavigation;
