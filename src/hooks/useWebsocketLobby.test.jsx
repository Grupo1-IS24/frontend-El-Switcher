import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { io } from 'socket.io-client';
import useWebsocketLobby from './useWebsocketLobby';
import { PlayerContext } from '../contexts/PlayerProvider';
import { useParams } from 'react-router-dom';
import useRouteNavigation from './useRouteNavigation';

// Mock socket.io-client
vi.mock('socket.io-client');

// Mock useRouteNavigation
vi.mock('./useRouteNavigation', () => ({
  __esModule: true,
  default: vi.fn(),
}));

// Mock useParams to avoid MemoryRouter and Routes
vi.mock('react-router-dom', async () => {
  // Import the actual module to preserve other functionalities
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

describe('useWebsocketLobby Hook', () => {
  let socket;
  let mockRedirectToGamePage;

  beforeEach(() => {
    socket = {
      on: vi.fn(),
      emit: vi.fn(),
      disconnect: vi.fn(),
    };
    io.mockReturnValue(socket);

    mockRedirectToGamePage = vi.fn();
    useRouteNavigation.mockReturnValue({
      redirectToGamePage: mockRedirectToGamePage,
    });

    useParams.mockReturnValue({ gameId: '1' });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  // Helper function to render the useWebsocketLobby hook within a controlled test environment
  const renderUseWebsocketLobbyHook = (playerID = 1) => {
    const wrapper = ({ children }) => (
      <PlayerContext.Provider value={{ playerID }}>
        {children}
      </PlayerContext.Provider>
    );

    return renderHook(() => useWebsocketLobby(), { wrapper });
  };

  // Helper function to get the callback for a specific event
  const getCallbackForEvent = (eventName) => {
    const call = socket.on.mock.calls.find((call) => call[0] === eventName);
    return call ? call[1] : null;
  };

  // Test initialization and event handling
  describe('Initialization and Event Handling', () => {
    // Test initial state
    it('should have initial state', () => {
      const { result } = renderUseWebsocketLobbyHook();

      expect(result.current.listOfPlayers).toEqual([]);
      expect(result.current.canStartGame).toBe(false);
    });

    // Test handling of player_list event
    it('should handle player_list event correctly', () => {
      const { result } = renderUseWebsocketLobbyHook();

      act(() => {
        const playerListCallback = getCallbackForEvent('player_list');
        if (playerListCallback) {
          playerListCallback([{ id: 1, name: 'Player 1' }]);
        }
      });

      expect(result.current.listOfPlayers).toEqual([
        { id: 1, name: 'Player 1' },
      ]);
    });

    // Test handling of start_game event
    it('should handle start_game event correctly', () => {
      const { result } = renderUseWebsocketLobbyHook();

      act(() => {
        const startGameCallback = getCallbackForEvent('start_game');
        if (startGameCallback) {
          startGameCallback({ canStart: true });
        }
      });

      expect(result.current.canStartGame).toBe(true);
    });

    // Test handling of game_started event
    it('should handle game_started event correctly', () => {
      renderUseWebsocketLobbyHook();

      act(() => {
        const gameStartedCallback = getCallbackForEvent('game_started');
        if (gameStartedCallback) {
          gameStartedCallback({ gameStarted: true });
        }
      });

      expect(mockRedirectToGamePage).toHaveBeenCalledWith('1');
    });

    // Test handling of game_started event with gameStarted as false
    it('should not redirect if game_started event has gameStarted as false', () => {
      renderUseWebsocketLobbyHook();

      act(() => {
        const gameStartedCallback = getCallbackForEvent('game_started');
        if (gameStartedCallback) {
          gameStartedCallback({ gameStarted: false });
        }
      });

      expect(mockRedirectToGamePage).not.toHaveBeenCalled();
    });
  });

  // Test cleanup on unmount
  describe('Cleanup on Unmount', () => {
    // Test socket disconnection on unmount
    it('should disconnect the socket on unmount', () => {
      const { unmount } = renderUseWebsocketLobbyHook();

      act(() => {
        unmount();
      });

      expect(socket.disconnect).toHaveBeenCalled();
    });
  });
});
