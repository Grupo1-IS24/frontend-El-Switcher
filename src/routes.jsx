import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GameListPage from './pages/GameListPage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';
import NotFoundPage from './pages/NotFoundPage';
import ValidatePositiveIntegerParam from './components/ValidatePositiveIntegerParam/ValidatePositiveIntegerParam';

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
      <ValidatePositiveIntegerParam paramName='gameId'>
        <LobbyPage />
      </ValidatePositiveIntegerParam>
    ),
  },
  {
    path: 'game/:gameId',
    element: (
      <ValidatePositiveIntegerParam paramName='gameId'>
        <GamePage />
      </ValidatePositiveIntegerParam>
    ),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
