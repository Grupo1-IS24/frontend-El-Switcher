import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { GameContext } from '../../contexts/GameProvider';
import useScrollToBottom from '../../hooks/useScrollToBottom';
import ChatLogs from './ChatLogs';

vi.mock('../../hooks/useScrollToBottom', () => ({
  default: vi.fn(),
}));

describe('ChatLogs', () => {
  const setup = (logMessages) => {
    const contextValue = { logMessages };
    vi.mocked(useScrollToBottom).mockReturnValue({ current: null });

    return render(
      <GameContext.Provider value={contextValue}>
        <ChatLogs />
      </GameContext.Provider>
    );
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders log messages', () => {
    const logMessages = [
      { message: 'Test message 1' },
      { message: 'Test message 2' },
    ];

    setup(logMessages);

    logMessages.forEach(({ message }) => {
      expect(screen.getByText(`INFO: ${message}`)).toBeInTheDocument();
    });
  });

  it('renders no messages when logMessages is empty', () => {
    setup([]);
    expect(screen.queryByText('INFO:')).not.toBeInTheDocument();
  });
});
