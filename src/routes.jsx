import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GamesListPage from "./pages/GamesListPage";
import LobbyPage from "./pages/LobbyPage";
import GamePage from "./pages/GamePage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "games-list",
    element: <GamesListPage />,
  },
  {
    path: "lobby/:gameId",
    element: <LobbyPage />,
  },
  {
    path: "game/:gameId",
    element: <GamePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
