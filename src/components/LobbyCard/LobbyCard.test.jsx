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

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
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

      render(
        <PlayerContext.Provider value={{ isOwner: false }}>
          <LobbyCard />
        </PlayerContext.Provider>
      );
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
        listOfPlayers: [
          { playerName: 'Player 1' },
          { playerName: 'Player 2' },
          { playerName: 'Player 3' },
        ],
        canStartGame: false,
      });

      useGetGame.mockReturnValue({
        game: mockGameInfo,
      });

      render(
        <PlayerContext.Provider value={{ isOwner: false }}>
          <LobbyCard />
        </PlayerContext.Provider>
      );
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
});
