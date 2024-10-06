import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import MessageCard from './MessageCard';

describe('MessageCard', () => {
  const setup = (type, message) =>
    render(<MessageCard type={type} message={message} />);

  describe('when type is "error"', () => {
    beforeEach(() => {
      setup('error', 'Error message');
    });

    it('renders the error message', () => {
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('applies correct style for "error" type', () => {
      const messageDiv = screen.getByText('Error message');
      expect(messageDiv).toHaveClass('bg-red-500');
    });
  });

  describe('when type is "info"', () => {
    beforeEach(() => {
      setup('info', 'Info message');
    });

    it('renders the info message', () => {
      expect(screen.getByText('Info message')).toBeInTheDocument();
    });

    it('applies correct style for "info" type', () => {
      const messageDiv = screen.getByText('Info message');
      expect(messageDiv).toHaveClass('bg-[#0C0C0C]');
    });
  });

  describe('when type is unknown', () => {
    beforeEach(() => {
      setup('unknown', 'Unknown message');
    });

    it('renders the message with default style', () => {
      expect(screen.getByText('Unknown message')).toBeInTheDocument();
    });

    it('applies default style for unknown type', () => {
      const messageDiv = screen.getByText('Unknown message');
      expect(messageDiv).not.toHaveClass('bg-red-500');
      expect(messageDiv).not.toHaveClass('bg-[#0C0C0C]');
    });
  });
});
