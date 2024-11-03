import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest';
import { GameContext } from '../contexts/GameProvider';
import { PlayerContext } from '../contexts/PlayerProvider';
import { sendChatMessage } from '../service/SendChatMessage';
import { useParams } from 'react-router-dom';
import useChatMessages from './useChatMessages';
import showToast from '../utils/toastUtil';

// Mock the dependencies of the hook
vi.mock('../service/SendChatMessage');
vi.mock('../utils/toastUtil');
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

describe('useChatMessages', () => {
  const VALID_PLAYER_ID = 1;
  const VALID_GAME_ID = 123;
  const EMPTY_CHAT_MESSAGES = [];

  const setupHook = (
    playerID = VALID_PLAYER_ID,
    gameId = VALID_GAME_ID,
    chatMessages = EMPTY_CHAT_MESSAGES
  ) => {
    useParams.mockReturnValue({ gameId });

    const wrapper = ({ children }) => (
      <PlayerContext.Provider value={{ playerID }}>
        <GameContext.Provider value={{ chatMessages }}>
          {children}
        </GameContext.Provider>
      </PlayerContext.Provider>
    );

    return renderHook(() => useChatMessages(), { wrapper });
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return chatMessages and handleInputMessage function', () => {
    const { result } = setupHook();

    expect(result.current.chatMessages).toEqual([]);
    expect(typeof result.current.handleInputMessage).toBe('function');
  });

  it('should call sendChatMessage with the correct arguments', async () => {
    const { result } = setupHook();
    const message = 'Hello, world!';

    await act(() => {
      result.current.handleInputMessage({
        key: 'Enter',
        target: { value: message },
      });
    });

    expect(sendChatMessage).toHaveBeenCalledWith(
      VALID_PLAYER_ID,
      VALID_GAME_ID,
      message
    );
  });

  it('should show an error toast when sendChatMessage fails', async () => {
    const { result } = setupHook();
    const errorMessage = 'Error sending the message';
    sendChatMessage.mockRejectedValueOnce(new Error(errorMessage));

    await act(() => {
      result.current.handleInputMessage({
        key: 'Enter',
        target: { value: 'Hello, world!' },
      });
    });

    expect(showToast).toHaveBeenCalledWith({
      type: 'error',
      message: errorMessage,
      autoClose: 3000,
    });
  });

  it('should not call sendChatMessage when the input message is empty', async () => {
    const { result } = setupHook();

    await act(() => {
      result.current.handleInputMessage({
        key: 'Enter',
        target: { value: '' },
      });
    });

    expect(sendChatMessage).not.toHaveBeenCalled();
  });

  it('should not call sendChatMessage when the key is not Enter', async () => {
    const { result } = setupHook();

    await act(() => {
      result.current.handleInputMessage({
        key: 'Space',
        target: { value: 'Hello, world!' },
      });
    });

    expect(sendChatMessage).not.toHaveBeenCalled();
  });

  it('should clear the input field after sending the message', async () => {
    const { result } = setupHook();
    const inputField = { value: 'Hello, world!' };

    await act(() => {
      result.current.handleInputMessage({
        key: 'Enter',
        target: inputField,
      });
    });

    expect(inputField.value).toBe('');
  });
});
