import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // Importamos MemoryRouter
import GameListPage from './GameListPage';
import useWebsocketGameList from '../hooks/useWebsocketGameList';
import useSelectedGame from '../hooks/useSelectedGame';
import useRouteNavigation from '../hooks/useRouteNavigation'; // Importamos el hook para mockearlo

// Mockeamos los componentes hijos y las dependencias
vi.mock('../components/MessageCard/MessageCard', () => ({
  default: vi.fn(({ type, message }) => (
    <div>
      {type}: {message}
    </div>
  )),
}));
vi.mock('../components/LoadingSpinner/LoadingSpinner', () => ({
  default: () => <div>LoadingSpinner</div>,
}));
vi.mock('../components/GameGrid/GameGrid', () => ({
  default: vi.fn(({ gameList }) => (
    <div>GameGrid: {gameList.length} juegos encontrados</div>
  )),
}));
vi.mock('../components/JoinGameForm/JoinGameForm', () => ({
  default: () => <div>JoinGameForm</div>,
}));
vi.mock('../components/TitleText/TitleText', () => ({
  default: () => <div>TitleText</div>,
}));
vi.mock('../components/BgOverlay/BgOverlay', () => ({
  default: () => <div>BackgroundOverlay</div>,
}));
vi.mock('../components/FilterGameInfo/FilterGameInfo', () => ({
  default: () => <div>FilterGameInfo</div>,
}));
vi.mock('../components/LeaveGameListButton/LeaveGameListButton', () => ({
  default: () => <div>LeaveGameListButton</div>,
}));

vi.mock('../hooks/useWebsocketGameList', () => ({
  default: vi.fn(),
}));
vi.mock('../hooks/useSelectedGame', () => ({
  default: vi.fn(),
}));
vi.mock('../hooks/useRouteNavigation', () => ({
  default: vi.fn(),
}));

describe('GameListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the loading spinner when loading', () => {
    useWebsocketGameList.mockReturnValue({
      gameList: [],
      isLoading: true,
      error: null,
    });
    useSelectedGame.mockReturnValue({
      selectedGame: null,
      selectGame: vi.fn(),
      clearSelectedGame: vi.fn(),
    });

    render(
      <MemoryRouter>
        <GameListPage />
      </MemoryRouter>
    );
    expect(screen.getByText('LoadingSpinner')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    useWebsocketGameList.mockReturnValue({
      gameList: [],
      isLoading: false,
      error: 'Error loading games',
    });
    useSelectedGame.mockReturnValue({
      selectedGame: null,
      selectGame: vi.fn(),
      clearSelectedGame: vi.fn(),
    });

    render(
      <MemoryRouter>
        <GameListPage />
      </MemoryRouter>
    );
    expect(screen.getByText('error: Error loading games')).toBeInTheDocument();
  });

  it('renders info message when gameList is empty', () => {
    useWebsocketGameList.mockReturnValue({
      gameList: [],
      isLoading: false,
      error: null,
    });
    useSelectedGame.mockReturnValue({
      selectedGame: null,
      selectGame: vi.fn(),
      clearSelectedGame: vi.fn(),
    });

    render(
      <MemoryRouter>
        <GameListPage />
      </MemoryRouter>
    );
    expect(
      screen.getByText('info: No hay partidas disponibles.')
    ).toBeInTheDocument();
  });

  it('renders the game grid and filter components when gameList is not empty', () => {
    useWebsocketGameList.mockReturnValue({
      gameList: [
        { gameId: 1, gameName: 'Game 1', connectedPlayers: 2, maxPlayers: 4 },
      ],
      isLoading: false,
      error: null,
    });
    useSelectedGame.mockReturnValue({
      selectedGame: null,
      selectGame: vi.fn(),
      clearSelectedGame: vi.fn(),
    });

    render(
      <MemoryRouter>
        <GameListPage />
      </MemoryRouter>
    );
    expect(screen.getByText('FilterGameInfo')).toBeInTheDocument();
    expect(screen.getByText('LeaveGameListButton')).toBeInTheDocument();
    expect(
      screen.getByText('GameGrid: 1 juegos encontrados')
    ).toBeInTheDocument();
  });

  it('renders JoinGameForm when a game is selected', () => {
    useWebsocketGameList.mockReturnValue({
      gameList: [
        { gameId: 1, gameName: 'Game 1', connectedPlayers: 2, maxPlayers: 4 },
      ],
      isLoading: false,
      error: null,
    });
    useSelectedGame.mockReturnValue({
      selectedGame: { gameId: 1, gameName: 'Game 1', isPublic: true },
      selectGame: vi.fn(),
      clearSelectedGame: vi.fn(),
    });

    // Mockeamos useRouteNavigation si es utilizado por JoinGameForm
    useRouteNavigation.mockReturnValue({
      redirectToLobbyPage: vi.fn(),
    });

    render(
      <MemoryRouter>
        <GameListPage />
      </MemoryRouter>
    );

    expect(screen.getByText('JoinGameForm')).toBeInTheDocument();
  });
});
