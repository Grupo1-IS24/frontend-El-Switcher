import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WinnerMessage from './WinnerMessage';

const mockRedirectToHomePage = vi.fn();

// Mock useRouteNavigation.
vi.mock('../../hooks/useRouteNavigation', () => ({
  default: () => ({
    redirectToHomePage: mockRedirectToHomePage,
  }),
}));

describe('WinnerMessage', () => {
  const setup = (winnerName) =>
    render(<WinnerMessage winnerName={winnerName} />);

  afterEach(() => {
    vi.clearAllMocks(); // Clear all mocks after each test.
  });

  describe('when winnerName is provided', () => {
    beforeEach(() => {
      setup('Edward Elric');
    });

    it('renders the winner message with the name', () => {
      expect(screen.getByText('¡Ganaste! Edward Elric')).toBeInTheDocument();
    });
  });

  describe('when winnerName is null', () => {
    beforeEach(() => {
      setup(null);
    });

    it('renders the winner message without a name', () => {
      expect(screen.getByText('¡Ganaste!')).toBeInTheDocument();
    });
  });

  describe('Button functionality', () => {
    beforeEach(() => {
      setup('Edward Elric');
    });

    it('renders the "Ir al inicio" button', () => {
      expect(screen.getByText('Ir al inicio')).toBeInTheDocument();
    });

    it('calls redirectToHomePage when button is clicked', async () => {
      const button = screen.getByText('Ir al inicio');
      await userEvent.click(button);
      expect(mockRedirectToHomePage).toHaveBeenCalledTimes(1);
    });
  });
});
