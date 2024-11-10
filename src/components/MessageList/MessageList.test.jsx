import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MessageList from './MessageList';

describe('MessageList', () => {
  const setup = (messages = [], renderFn = () => {}) => {
    const renderMessage = vi.fn(renderFn);
    const ref = vi.fn();

    render(
      <MessageList
        messages={messages}
        renderMessage={renderMessage}
        ref={ref}
      />
    );

    return { renderMessage, ref };
  };

  it('renders a list of messages', () => {
    const messages = ['Message 1', 'Message 2', 'Message 3'];
    const { renderMessage } = setup(messages, (message, index) => {
      return <p key={index}>{message}</p>;
    });

    messages.forEach((message) => {
      expect(screen.getByText(message)).toBeInTheDocument();
    });

    expect(renderMessage).toHaveBeenCalledTimes(messages.length);
  });

  it('does not render messages if there are no messages', () => {
    const { renderMessage } = setup();
    expect(renderMessage).not.toHaveBeenCalled();
  });

  it('passes ref to the container', () => {
    const messages = ['Message 1', 'Message 2'];
    const { ref } = setup(messages, (message, index) => {
      return <p key={index}>{message}</p>;
    });

    expect(ref).toHaveBeenCalled();
  });
});
