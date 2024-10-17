import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { io } from 'socket.io-client';
import useWebsocket from './useWebsocket';

// Mock socket.io-client
vi.mock('socket.io-client');

describe('useWebsocket Hook', () => {
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

  const path = '/test';
  const query = { token: '123' };
  const handleSocketEvents = vi.fn();

  const renderUseWebsocketHook = () => {
    return renderHook(() => useWebsocket(path, handleSocketEvents, query));
  };

  // Test initialization and event handling
  describe('Initialization and Event Handling', () => {
    // Test socket initialization with correct parameters
    it('should initialize the socket with correct parameters', () => {
      renderUseWebsocketHook();

      expect(io).toHaveBeenCalledWith('http://localhost:8000', {
        path: path,
        query: query,
        reconnection: true,
        reconnectionAttempts: Infinity,
      });
    });

    // Test handling of socket events
    it('should handle socket events correctly', () => {
      renderUseWebsocketHook();

      expect(handleSocketEvents).toHaveBeenCalledWith(socket);
    });
  });

  // Test socket emit functionality
  describe('Socket Emit Functionality', () => {
    // Test emitting events through the socket
    it('should emit events through the socket', () => {
      renderUseWebsocketHook();

      act(() => {
        socket.emit('testEvent', 'testData');
      });

      expect(socket.emit).toHaveBeenCalledWith('testEvent', 'testData');
    });
  });

  // Test reconnection attempts
  describe('Reconnection Attempts', () => {
    // Test infinite reconnection attempts
    it('should attempt to reconnect infinitely', () => {
      renderUseWebsocketHook();

      expect(io).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
        reconnectionAttempts: Infinity,
      }));
    });
  });

  // Test cleanup on unmount
  describe('Cleanup on Unmount', () => {
    // Test socket disconnection on unmount
    it('should disconnect the socket on unmount', () => {
      const { unmount } = renderUseWebsocketHook();

      act(() => {
        unmount();
      });

      expect(socket.disconnect).toHaveBeenCalled();
    });
  });
});