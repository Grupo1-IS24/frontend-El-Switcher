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

const setup = (winnerName) => render(<WinnerMessage winnerName={winnerName} />);

const clearMocks = () => vi.clearAllMocks();

const expectTextInDocument = (text) => {
  expect(screen.getByText(text)).toBeInTheDocument();
};

describe('WinnerMessage', () => {
  afterEach(clearMocks);

  describe('when winnerName is provided', () => {
    beforeEach(() => setup('Edward Elric'));

    it('renders the winner message with the name', () => {
      expectTextInDocument('¡Ganaste! Edward Elric');
    });
  });

  describe('when winnerName is null', () => {
    beforeEach(() => setup(null));

    it('renders the winner message without a name', () => {
      expectTextInDocument('¡Ganaste!');
    });
  });

  describe('Button functionality', () => {
    beforeEach(() => setup('Edward Elric'));

    it('renders the "Ir al inicio" button', () => {
      expectTextInDocument('Ir al inicio');
    });

    it('calls redirectToHomePage when button is clicked', async () => {
      const button = screen.getByText('Ir al inicio');
      await userEvent.click(button);
      expect(mockRedirectToHomePage).toHaveBeenCalledTimes(1);
    });
  });
});
