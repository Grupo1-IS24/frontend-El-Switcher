import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ChatBox from './ChatBox';
import useChatBox from '../../hooks/useChatBox';
import WebSocketGameProvider from '../../contexts/GameProvider';
import PlayerProvider from '../../contexts/PlayerProvider';

vi.mock('../../hooks/useChatBox', () => ({
  default: vi.fn(),
}));

describe('ChatBox component', () => {
  const toggleChat = vi.fn();

  const setup = (isOpen = false) => {
    useChatBox.mockReturnValue({
      isOpen,
      toggleChat,
    });

    render(
      <PlayerProvider value={{ playerID: 1 }}>
        <WebSocketGameProvider value={{ chatMessages: [] }}>
          <ChatBox />
        </WebSocketGameProvider>
      </PlayerProvider>
    );
  };

  const getOpenChatPrompt = () =>
    screen.queryByText('Hacer clic para abrir el chat');
  const getCloseChatButton = () => screen.queryByRole('button', { name: /✕/i });
  const getChatText = () => screen.queryByText('Chat');

  afterEach(() => {
    vi.clearAllMocks();
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

  it('should display the chat info when is open', () => {
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
});
