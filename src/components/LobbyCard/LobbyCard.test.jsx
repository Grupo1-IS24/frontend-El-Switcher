import { render, screen, cleanup } from '@testing-library/react';
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  beforeAll,
} from 'vitest';
import { PlayerContext } from '../../contexts/PlayerProvider';
import LobbyCard from './LobbyCard';
import useWebsocketLobby from '../../hooks/useWebsocketLobby';
import useGetGame from '../../hooks/useGetGame';
import { MemoryRouter } from 'react-router-dom';

// mock hooks
vi.mock('../../hooks/useWebsocketLobby');
vi.mock('../../hooks/useGetGame');
vi.mock('../../hooks/useRouteNavigation', () => ({
  default: () => ({
    redirectToHomePage: vi.fn(),
  }),
}));

describe('LobbyCard', () => {
  const mockGameInfo = {
    gameName: 'Test Game',
    minPlayers: 2,
    maxPlayers: 4,
    status: 'Lobby',
  };
  const mockListOfPlayers = [
    { playerName: 'Player 1', playerId: '1' },
    { playerName: 'Player 2', playerId: '2' },
    { playerName: 'Player 3', playerId: '3' },
  ];

  beforeAll(() => {
    // Mock console.log
    console.log = vi.fn();
  });

  const setupMocks = ({
    game = null,
    gameError = null,
    listOfPlayers = [],
    canStartGame = false,
  } = {}) => {
    useWebsocketLobby.mockReturnValue({ listOfPlayers, canStartGame });
    useGetGame.mockReturnValue({ game, gameError });
  };

  const renderLobbyCard = (isOwner = false, playerID = null) => {
    return render(
      <PlayerContext.Provider value={{ isOwner, playerID }}>
        <MemoryRouter>
          <LobbyCard />
        </MemoryRouter>
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
        game: mockGameInfo,
        listOfPlayers: mockListOfPlayers.slice(0, 1),
        canStartGame: false,
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

  describe('Handle navigation when there is a game error', () => {
    beforeEach(() => {
      setupMocks({
        game: null,
        gameError: true,
      });
      renderLobbyCard();
    });

    it('should navigate to not found page when there is a game error', () => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  describe('Handle navigation when game status is Ingame', () => {
    beforeEach(() => {
      setupMocks({
        game: { ...mockGameInfo, status: 'Ingame' },
        gameError: null,
      });
      renderLobbyCard();
    });

    it('should navigate to not found page when game status is Ingame', () => {
      expect(screen.queryByText(mockGameInfo.gameName)).not.toBeInTheDocument();
    });
  });

  describe('Handle current player highlighting', () => {
    beforeEach(() => {
      setupMocks({
        game: mockGameInfo,
        listOfPlayers: mockListOfPlayers,
      });
    });

    it('should highlight current player', () => {
      renderLobbyCard(false, '2');

      const currentPlayer = screen.getByText('Player 2');
      const otherPlayer = screen.getByText('Player 1');

      expect(currentPlayer.className).toContain('bg-white text-black');
      expect(otherPlayer.className).not.toContain('bg-white text-black');
    });

    it('logs player list and current player ID', () => {
      renderLobbyCard(false, '1');

      expect(console.log).toHaveBeenCalledWith(
        'El listado es:',
        mockListOfPlayers
      );
      expect(console.log).toHaveBeenCalledWith('El jugador actual es:', '1');
    });
  });

  describe('Navigate component rendering', () => {
    it('should render Navigate component when game error exists', () => {
      setupMocks({ gameError: true });
      const { container } = renderLobbyCard();

      expect(container.innerHTML).toBe('');
    });

    it('should render Navigate component when game status is Ingame', () => {
      setupMocks({
        game: { ...mockGameInfo, status: 'Ingame' },
      });
      const { container } = renderLobbyCard();

      expect(container.innerHTML).toBe('');
    });
  });

  describe('Connected players display', () => {
    it('renders all player names with correct styling', () => {
      setupMocks({
        game: mockGameInfo,
        listOfPlayers: mockListOfPlayers,
      });
      renderLobbyCard(false, '1');

      mockListOfPlayers.forEach((player) => {
        const playerElement = screen.getByText(player.playerName);
        expect(playerElement).toBeInTheDocument();
        if (player.playerId === '1') {
          expect(playerElement.className).toContain('bg-white text-black');
        } else {
          expect(playerElement.className).toContain('text-white');
        }
      });
    });
  });
});
