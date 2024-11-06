import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import ChatBox from './ChatBox';
import useChatBox from '../../hooks/useChatBox';
import useWebsocketGame from '../../hooks/useWebsocketGame';
import WebSocketGameProvider from '../../contexts/GameProvider';
import PlayerProvider from '../../contexts/PlayerProvider';

vi.mock('../../hooks/useChatBox', () => ({
  default: vi.fn(),
}));

vi.mock('../../hooks/useWebsocketGame', () => ({
  default: vi.fn(),
}));

describe('ChatBox component', () => {
  const toggleChat = vi.fn();

  const setup = (isOpen = false, hasNewMessages = false) => {
    useChatBox.mockReturnValue({
      isOpen,
      toggleChat,
    });

    useWebsocketGame.mockReturnValue({
      hasNewMessages,
      setHasNewMessages: vi.fn(),
      setIsChatOpen: vi.fn(),
      chatMessages: [],
    });

    render(
      <PlayerProvider value={{ playerID: 1 }}>
        <WebSocketGameProvider>
          <ChatBox />
        </WebSocketGameProvider>
      </PlayerProvider>
    );
  };

  const getOpenChatPrompt = () =>
    screen.queryByText('Hacer clic para abrir el chat');
  const getCloseChatButton = () => screen.queryByRole('button', { name: /✕/i });
  const getChatText = () => screen.queryByText('Chat');
  const getNewMessageIndicator = () =>
    screen.queryByTestId('new-message-indicator');

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  afterAll(() => {
    cleanup();
  });

  it('should show the button to open the chat when the chat is closed', () => {
    setup();
    expect(getOpenChatPrompt()).toBeInTheDocument();
    expect(getCloseChatButton()).not.toBeInTheDocument();
    expect(getChatText()).not.toBeInTheDocument();
  });

  it('should open the chat when the open button is clicked', async () => {
    setup();
    await userEvent.click(getOpenChatPrompt());
    expect(toggleChat).toHaveBeenCalledTimes(1);
  });

  it('should show the chat information when it is open', () => {
    setup(true);
    expect(getChatText()).toBeInTheDocument();
    expect(getCloseChatButton()).toBeInTheDocument();
    expect(getOpenChatPrompt()).not.toBeInTheDocument();
  });

  it('should close the chat when the close button is clicked', async () => {
    setup(true);
    await userEvent.click(getCloseChatButton());
    expect(toggleChat).toHaveBeenCalledTimes(1);
  });

  it('should show the new message indicator when there are new messages and the chat is closed', () => {
    setup(false, true);
    expect(getNewMessageIndicator()).toBeInTheDocument();
  });

  it('should not show the new message indicator when the chat is open', () => {
    setup(true, true);
    expect(getNewMessageIndicator()).not.toBeInTheDocument();
  });

  it('should not show the new message indicator when there are no new messages', () => {
    setup(false, false);
    expect(getNewMessageIndicator()).not.toBeInTheDocument();
  });
});
