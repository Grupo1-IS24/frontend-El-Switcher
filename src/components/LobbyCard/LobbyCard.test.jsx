import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PlayerContext } from '../../contexts/PlayerProvider';
import LobbyCard from './LobbyCard';
import useWebsocketLobby from '../../hooks/useWebsocketLobby';
import useGetGame from '../../hooks/useGetGame';

// mock hooks
vi.mock('../../hooks/useWebsocketLobby');
vi.mock('../../hooks/useGetGame');
vi.mock('../../hooks/useRouteNavigation', () => ({
  default: () => ({
    redirectToHomePage: vi.fn(),
  }),
}));

describe('LobbyCard', () => {
  const mockGameInfo = { gameName: 'Test Game', minPlayers: 2, maxPlayers: 4 };
  const mockListOfPlayers = [
    { playerName: 'Player 1' },
    { playerName: 'Player 2' },
    { playerName: 'Player 3' },
  ];

  const renderLobbyCard = (isOwner = false) => {
    return render(
      <PlayerContext.Provider value={{ isOwner }}>
        <LobbyCard />
      </PlayerContext.Provider>
    );
  };

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe('Render the loading state correctly', () => {
    beforeEach(() => {
      useWebsocketLobby.mockReturnValue({
        listOfPlayers: [],
        canStartGame: false,
      });

      useGetGame.mockReturnValue({
        game: null,
      });

      // Mock the loading component to make it easy to test.
      vi.mock('../LoadingLobby/LoadingLobby', () => ({
        default: () => <h1>Loading...</h1>,
      }));

      renderLobbyCard();
    });

    it('should render the loading component', () => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Render the game info correctly', () => {
    beforeEach(() => {
      useWebsocketLobby.mockReturnValue({
        listOfPlayers: [],
        canStartGame: false,
      });

      useGetGame.mockReturnValue({
        game: mockGameInfo,
      });

      renderLobbyCard();
    });

    it('should render the game name', () => {
      expect(screen.getByText('Test Game')).toBeInTheDocument();
    });

    it('should render the minimum number of players', () => {
      expect(screen.getByText('Mín. jugadores: 2')).toBeInTheDocument();
    });

    it('should render the maximum number of players', () => {
      expect(screen.getByText('Máx. jugadores: 4')).toBeInTheDocument();
    });
  });

  describe('Render the connected players info correctly', () => {
    beforeEach(() => {
      useWebsocketLobby.mockReturnValue({
        listOfPlayers: mockListOfPlayers,
        canStartGame: false,
      });

      useGetGame.mockReturnValue({
        game: mockGameInfo,
      });

      renderLobbyCard();
    });

    it('should render the number of connected players', () => {
      expect(screen.getByText('Jugadores conectados: 3')).toBeInTheDocument();
    });

    it('should render the connected players', () => {
      expect(screen.getByText('Player 1')).toBeInTheDocument();
      expect(screen.getByText('Player 2')).toBeInTheDocument();
      expect(screen.getByText('Player 3')).toBeInTheDocument();
    });
  });

  describe('Render the non owner actions correctly', () => {
    beforeEach(() => {
      useWebsocketLobby.mockReturnValue({
        listOfPlayers: mockListOfPlayers,
        canStartGame: false,
      });

      useGetGame.mockReturnValue({
        game: mockGameInfo,
      });

      renderLobbyCard();
    });

    it('should render non owner actions', () => {
      expect(
        screen.getByText('Esperando que el owner comience la partida...')
      ).toBeInTheDocument();

      const leaveButton = screen.getByText('Abandonar lobby');

      expect(leaveButton).toBeInTheDocument();
      expect(leaveButton).toBeEnabled();
    });
  });

  describe('Render the owner actions when can not start a game', () => {
    beforeEach(() => {
      useWebsocketLobby.mockReturnValue({
        listOfPlayers: [{ playerName: 'Player 1' }],
        canStartGame: false,
      });

      useGetGame.mockReturnValue({
        game: mockGameInfo,
      });

      renderLobbyCard(true);
    });

    it('Should render owner actions, but can not start game', () => {
      const startGameButton = screen.getByText('Iniciar partida');
      expect(startGameButton).toBeInTheDocument();
      expect(startGameButton).toBeDisabled();

      const leaveButton = screen.getByText('Abandonar lobby');
      expect(leaveButton).toBeInTheDocument();
      expect(leaveButton).toBeEnabled();
    });
  });

  describe('Render the owner actions when can start a game', () => {
    beforeEach(() => {
      useWebsocketLobby.mockReturnValue({
        listOfPlayers: mockListOfPlayers,
        canStartGame: true,
      });

      useGetGame.mockReturnValue({
        game: mockGameInfo,
      });

      renderLobbyCard(true);
    });

    it('Should render owner actions, but can start game', () => {
      const startGameButton = screen.getByText('Iniciar partida');
      expect(startGameButton).toBeInTheDocument();
      expect(startGameButton).toBeEnabled();

      const leaveButton = screen.getByText('Abandonar lobby');
      expect(leaveButton).toBeInTheDocument();
      expect(leaveButton).toBeEnabled();
    });
  });
});
