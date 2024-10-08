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

  const mockWebsocketLobby = (listOfPlayers = [], canStartGame = false) => {
    useWebsocketLobby.mockReturnValue({ listOfPlayers, canStartGame });
  };

  const mockGetGame = (game = null) => {
    useGetGame.mockReturnValue({ game });
  };

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe('Render the loading state correctly', () => {
    beforeEach(() => {
      mockWebsocketLobby();
      mockGetGame();

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
      mockWebsocketLobby();
      mockGetGame(mockGameInfo);

      renderLobbyCard();
    });

    it('should render the game name', () => {
      expect(screen.getByText(mockGameInfo.gameName)).toBeInTheDocument();
    });

    it('should render the minimum number of players', () => {
      expect(
        screen.getByText(`Mín. jugadores: ${mockGameInfo.minPlayers}`)
      ).toBeInTheDocument();
    });

    it('should render the maximum number of players', () => {
      expect(
        screen.getByText(`Máx. jugadores: ${mockGameInfo.maxPlayers}`)
      ).toBeInTheDocument();
    });
  });

  describe('Render the connected players info correctly', () => {
    beforeEach(() => {
      mockWebsocketLobby(mockListOfPlayers);
      mockGetGame(mockGameInfo);

      renderLobbyCard();
    });

    it('should render the number of connected players', () => {
      expect(
        screen.getByText(`Jugadores conectados: ${mockListOfPlayers.length}`)
      ).toBeInTheDocument();
    });

    it('should render the connected players', () => {
      for (const player of mockListOfPlayers) {
        expect(screen.getByText(player.playerName)).toBeInTheDocument();
      }
    });
  });

  describe('Render the non owner actions correctly', () => {
    beforeEach(() => {
      mockWebsocketLobby(mockListOfPlayers);
      mockGetGame(mockGameInfo);

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
      mockWebsocketLobby([{ playerName: 'Player 1' }]);
      mockGetGame(mockGameInfo);

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
      mockWebsocketLobby(mockListOfPlayers, true);
      mockGetGame(mockGameInfo);

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
