import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';
import ChatBox from './ChatBox';
import useChatBox from '../../hooks/useChatBox';
import useWebsocketGame from '../../hooks/useWebsocketGame';
import WebSocketGameProvider from '../../contexts/GameProvider';
import PlayerProvider from '../../contexts/PlayerProvider';

vi.mock('../../hooks/useChatBox');
vi.mock('../../hooks/useWebsocketGame', () => ({
  default: vi.fn(),
}));
vi.mock('../ChatMessages/ChatMessages', () => ({
  default: () => <div>Chat Messages</div>,
}));
vi.mock('../ChatLogs/ChatLogs', () => ({
  default: () => <div>Chat Logs</div>,
}));

describe('ChatBox component', () => {
  const handleToggleChat = vi.fn();
  const activeTabChatMessages = vi.fn();
  const activeTabChatLogs = vi.fn();

  const setup = (
    isOpen = false,
    hasNewMessages = false,
    isChatMessageActive = true
  ) => {
    useChatBox.mockReturnValue({
      isOpen,
      handleToggleChat,
      activeTabChatMessages,
      activeTabChatLogs,
      hasNewMessages,
      isChatMessageActive,
      isChatLogsActive: !isChatMessageActive,
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
  const getChatTabButton = () =>
    screen.queryByRole('button', { name: /Chat/i });
  const getLogsTabButton = () =>
    screen.queryByRole('button', { name: /Logs/i });
  const getNewMessageIndicator = () =>
    screen.queryByTestId('new-message-indicator');

  const getChatLogs = () => screen.queryByText('Chat Logs');
  const getChatMessages = () => screen.queryByText('Chat Messages');

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
  });

  it('should open the chat when the open button is clicked', async () => {
    setup();
    await userEvent.click(getOpenChatPrompt());
    expect(handleToggleChat).toHaveBeenCalledTimes(1);
  });

  it('should show the chat information when it is open', () => {
    setup(true);
    expect(getChatTabButton()).toBeInTheDocument();
    expect(getLogsTabButton()).toBeInTheDocument();
    expect(getCloseChatButton()).toBeInTheDocument();
    expect(getOpenChatPrompt()).not.toBeInTheDocument();
  });

  it('should close the chat when the close button is clicked', async () => {
    setup(true);
    await userEvent.click(getCloseChatButton());
    expect(handleToggleChat).toHaveBeenCalledTimes(1);
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

  it('should activate the chat messages and not chat logs', async () => {
    setup(true, false, true);

    await userEvent.click(getChatTabButton());

    expect(activeTabChatMessages).toHaveBeenCalledTimes(1);

    expect(getChatMessages()).toBeInTheDocument();

    expect(getChatLogs()).not.toBeInTheDocument();
  });

  it('should activate the chat logs and not chat messages', async () => {
    setup(true, false, false);

    await userEvent.click(getLogsTabButton());

    expect(activeTabChatLogs).toHaveBeenCalledTimes(1);

    expect(getChatLogs()).toBeInTheDocument();

    expect(getChatMessages()).not.toBeInTheDocument();
  });
});
