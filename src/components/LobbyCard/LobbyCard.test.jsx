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

  const setupMocks = ({
    game = null,
    listOfPlayers = [],
    canStartGame = false,
  } = {}) => {
    useWebsocketLobby.mockReturnValue({ listOfPlayers, canStartGame });
    useGetGame.mockReturnValue({ game });
  };

  const renderLobbyCard = (isOwner = false) => {
    return render(
      <PlayerContext.Provider value={{ isOwner }}>
        <LobbyCard />
      </PlayerContext.Provider>
    );
  };

  const getLeaveButton = () => screen.getByText('Abandonar lobby');
  const getStartGameButton = () => screen.getByText('Iniciar partida');

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe('Render the loading state correctly', () => {
    beforeEach(() => {
      setupMocks();

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
      setupMocks({ game: mockGameInfo });
      renderLobbyCard();
    });

    it('should display the game name', () => {
      expect(screen.getByText(mockGameInfo.gameName)).toBeInTheDocument();
    });

    it('should display the minimum number of players', () => {
      expect(
        screen.getByText(`Mín. jugadores: ${mockGameInfo.minPlayers}`)
      ).toBeInTheDocument();
    });

    it('should display the maximum number of players', () => {
      expect(
        screen.getByText(`Máx. jugadores: ${mockGameInfo.maxPlayers}`)
      ).toBeInTheDocument();
    });
  });

  describe('Render connected players info correctly', () => {
    beforeEach(() => {
      setupMocks({ game: mockGameInfo, listOfPlayers: mockListOfPlayers });
      renderLobbyCard();
    });

    it('should display the number of connected players', () => {
      expect(
        screen.getByText(`Jugadores conectados: ${mockListOfPlayers.length}`)
      ).toBeInTheDocument();
    });

    it('should display the connected players', () => {
      for (const player of mockListOfPlayers) {
        expect(screen.getByText(player.playerName)).toBeInTheDocument();
      }
    });
  });

  describe('Render non-owner actions correctly', () => {
    beforeEach(() => {
      setupMocks({ game: mockGameInfo, listOfPlayers: mockListOfPlayers });
      renderLobbyCard();
    });

    it('should display non-owner actions', () => {
      expect(
        screen.getByText('Esperando que el owner comience la partida...')
      ).toBeInTheDocument();

      const leaveButton = getLeaveButton();
      expect(leaveButton).toBeInTheDocument();
      expect(leaveButton).toBeEnabled();
    });
  });

  describe('Render owner actions when the game cannot be started', () => {
    beforeEach(() => {
      setupMocks({
        game: [{ playerName: 'player 1' }],
        listOfPlayers: mockListOfPlayers,
      });
      renderLobbyCard(true);
    });

    it('should display owner actions with the start game button disabled', () => {
      const startGameButton = getStartGameButton();
      expect(startGameButton).toBeInTheDocument();
      expect(startGameButton).toBeDisabled(); // should be disabled.

      const leaveButton = getLeaveButton();
      expect(leaveButton).toBeInTheDocument();
      expect(leaveButton).toBeEnabled();
    });
  });

  describe('Render owner actions when the game can be started', () => {
    beforeEach(() => {
      setupMocks({
        game: mockGameInfo,
        listOfPlayers: mockListOfPlayers,
        canStartGame: true,
      });
      renderLobbyCard(true);
    });

    it('should display owner actions with the start game button enabled', () => {
      const startGameButton = getStartGameButton();
      expect(startGameButton).toBeInTheDocument();
      expect(startGameButton).toBeEnabled(); // should be enabled.

      const leaveButton = getLeaveButton();
      expect(leaveButton).toBeInTheDocument();
      expect(leaveButton).toBeEnabled();
    });
  });
});
