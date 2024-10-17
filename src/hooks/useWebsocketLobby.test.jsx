import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { io } from 'socket.io-client';
import useWebsocketLobby from './useWebsocketLobby';
import { PlayerContext } from '../contexts/PlayerProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import useRouteNavigation from './useRouteNavigation';

// Mock socket.io-client
vi.mock('socket.io-client');

// Mock useRouteNavigation
vi.mock('./useRouteNavigation', () => ({
  __esModule: true,
  default: vi.fn(),
}));

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
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  // Helper function to render the useWebsocketLobby hook within a controlled test environment
  const renderUseWebsocketLobbyHook = (playerID = 1) => {
    return renderHook(() => useWebsocketLobby(), {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={['/lobby/1']}>
          <PlayerContext.Provider value={{ playerID }}>
            <Routes>
              <Route path='/lobby/:gameId' element={children} />
            </Routes>
          </PlayerContext.Provider>
        </MemoryRouter>
      ),
    });
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
        socket.on.mock.calls[0][1]([{ id: 1, name: 'Player 1' }]);
      });

      expect(result.current.listOfPlayers).toEqual([
        { id: 1, name: 'Player 1' },
      ]);
    });

    // Test handling of start_game event
    it('should handle start_game event correctly', () => {
      const { result } = renderUseWebsocketLobbyHook();

      act(() => {
        socket.on.mock.calls[1][1]({ canStart: true });
      });

      expect(result.current.canStartGame).toBe(true);
    });

    // Test handling of game_started event
    it('should handle game_started event correctly', () => {
      renderUseWebsocketLobbyHook();

      act(() => {
        socket.on.mock.calls[2][1]({ gameStarted: true });
      });

      expect(mockRedirectToGamePage).toHaveBeenCalledWith('1');
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
