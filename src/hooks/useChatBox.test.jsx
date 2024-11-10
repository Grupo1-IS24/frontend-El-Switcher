import { renderHook, act } from '@testing-library/react';
import useChatBox from './useChatBox';
import { describe, expect, it, vi } from 'vitest';
import { GameContext } from '../contexts/GameProvider';

const mockSetIsChatOpen = vi.fn();
const mockSetHasNewMessages = vi.fn();

describe('useChatBox', () => {
  const setupHook = () =>
    renderHook(() => useChatBox(), {
      wrapper: ({ children }) => (
        <GameContext.Provider
          value={{
            hasNewMessages: false,
            setHasNewMessages: mockSetHasNewMessages,
            setIsChatOpen: mockSetIsChatOpen,
          }}
        >
          {children}
        </GameContext.Provider>
      ),
    });

  it('should initialize with chat closed', () => {
    const { result } = setupHook();

    expect(result.current.isOpen).toBe(false);
    expect(result.current.isChatMessageActive).toBe(true);  // Default tab should be 'Chat Messages'
    expect(result.current.isChatLogsActive).toBe(false);
  });

  it('should open the chat when handleToggleChat is called', () => {
    const { result } = setupHook();

    act(() => {
      result.current.handleToggleChat();
    });

    expect(result.current.isOpen).toBe(true);
    expect(mockSetIsChatOpen).toHaveBeenCalledWith(true);  // Ensure the context function is called
  });

  it('should close the chat when handleToggleChat is called twice', () => {
    const { result } = setupHook();

    act(() => {
      result.current.handleToggleChat(); // Open chat
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.handleToggleChat(); // Close chat
    });

    expect(result.current.isOpen).toBe(false);
    expect(mockSetIsChatOpen).toHaveBeenCalledWith(false);  // Ensure the context function is called
  });

  it('should set the active tab to "Chat Messages" when activeTabChatMessages is called', () => {
    const { result } = setupHook();

    act(() => {
      result.current.activeTabChatMessages();
    });

    expect(result.current.isChatMessageActive).toBe(true);
    expect(result.current.isChatLogsActive).toBe(false);
  });

  it('should set the active tab to "Chat Logs" when activeTabChatLogs is called', () => {
    const { result } = setupHook();

    act(() => {
      result.current.activeTabChatLogs();
    });

    expect(result.current.isChatLogsActive).toBe(true);
    expect(result.current.isChatMessageActive).toBe(false);
  });
});
