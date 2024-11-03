import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ChatMessages from './ChatMessages';
import useChatMessages from '../../hooks/useChatMessages';
import useScrollToBottom from '../../hooks/useScrollToBottom';

vi.mock('../../hooks/useChatMessages');
vi.mock('../../hooks/useScrollToBottom');

describe('ChatMessages', () => {
  const mockChatMessages = [
    { writtenBy: 'User1', message: 'Hello' },
    { writtenBy: 'User2', message: 'Hi there!' },
  ];

  const setup = (chatMessages = mockChatMessages) => {
    useChatMessages.mockReturnValue({
      chatMessages,
      handleInputMessage: vi.fn(),
    });
    useScrollToBottom.mockReturnValue(vi.fn());

    return render(<ChatMessages />);
  };

  const expectChatMessagesLength = (length) => {
    const messagesContainer = screen.getByRole('textbox').closest('div');

    expect(messagesContainer.querySelectorAll('p')).toHaveLength(length);
  };

  it('should render chat messages', () => {
    setup();

    mockChatMessages.forEach(({ writtenBy, message }) => {
      expect(screen.getByText(`${writtenBy}: ${message}`)).toBeInTheDocument();
    });

    expectChatMessagesLength(mockChatMessages.length);
  });

  it('should not render messages if there are no messages', () => {
    setup([]);

    expectChatMessagesLength(0);
  });

  it('should call handleInputMessage on key up', () => {
    setup();

    const input = screen.getByPlaceholderText('Escribe un mensaje...');
    const { handleInputMessage } = useChatMessages();

    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    expect(handleInputMessage).toHaveBeenCalled();
  });

  it('should input has autofocus', () => {
    setup();

    const input = screen.getByPlaceholderText('Escribe un mensaje...');
    expect(input).toHaveFocus();
  });
});
