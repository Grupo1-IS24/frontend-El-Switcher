import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GameListPage from './pages/GameListPage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';
import NotFoundPage from './pages/NotFoundPage';
import ValidateIntegerParam from './components/ValidateIntegerParam/ValidateIntegerParam';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: 'game-list',
    element: <GameListPage />,
  },
  {
    path: 'lobby/:gameId',
    element: (
      <ValidateIntegerParam paramName="gameId">
        <LobbyPage />
      </ValidateIntegerParam>
    ),
  },
  {
    path: 'game/:gameId',
    element: (
      <ValidateIntegerParam paramName="gameId">
        <GamePage />
      </ValidateIntegerParam>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
