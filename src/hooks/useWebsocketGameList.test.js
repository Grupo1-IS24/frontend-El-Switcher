import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { io } from 'socket.io-client';
import useWebsocketGameList from './useWebsocketGameList';

// Mock socket.io-client
vi.mock('socket.io-client');

describe('useWebsocketGameList Hook', () => {
  let socket;

  beforeEach(() => {
    socket = {
      on: vi.fn(),
      emit: vi.fn(),
      disconnect: vi.fn(),
    };
    io.mockReturnValue(socket);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  const renderUseWebsocketGameListHook = () => {
    return renderHook(() => useWebsocketGameList());
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
      const { result } = renderUseWebsocketGameListHook();

      expect(result.current.gameList).toBe(null);
      expect(result.current.isLoading).toBe(true);
      expect(result.current.error).toBe(null);
    });

    // Test handling of game_list event
    it('should handle game_list event correctly', () => {
      const { result } = renderUseWebsocketGameListHook();

      act(() => {
        const gameListCallback = getCallbackForEvent('game_list');
        if (gameListCallback) {
          gameListCallback([{ id: 1, name: 'Game 1' }]);
        }
      });

      expect(result.current.gameList).toEqual([{ id: 1, name: 'Game 1' }]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });

    // Test handling of connect_error event
    it('should handle connect_error event correctly', () => {
      const { result } = renderUseWebsocketGameListHook();

      act(() => {
        const connectErrorCallback = getCallbackForEvent('connect_error');
        if (connectErrorCallback) {
          connectErrorCallback();
        }
      });

      expect(result.current.error).toBe('Failed to connect to the server.');
      expect(result.current.isLoading).toBe(false);
    });
  });

  // Test cleanup on unmount
  describe('Cleanup on Unmount', () => {
    // Test socket disconnection on unmount
    it('should disconnect the socket on unmount', () => {
      const { unmount } = renderUseWebsocketGameListHook();

      act(() => {
        unmount();
      });

      expect(socket.disconnect).toHaveBeenCalled();
    });
  });
});
