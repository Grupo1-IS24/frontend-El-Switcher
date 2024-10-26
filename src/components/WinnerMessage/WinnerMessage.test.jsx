import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WinnerMessage from './WinnerMessage';
import useWinnerPlayer from '../../hooks/useWinnerPlayer';

const mockRedirectToHomePage = vi.fn();

// Mock useRouteNavigation.
vi.mock('../../hooks/useRouteNavigation', () => ({
  default: () => ({
    redirectToHomePage: mockRedirectToHomePage,
  }),
}));

// Mock useWinnerPlayer.
vi.mock('../../hooks/useWinnerPlayer');

describe('WinnerMessage', () => {
  const setup = (
    thereIsWinner = true,
    isCurrentPlayerWinner = true,
    winnerName = ''
  ) => {
    useWinnerPlayer.mockReturnValue({
      isCurrentPlayerWinner,
      thereIsWinner,
      winnerName,
    });

    render(<WinnerMessage />);
  };

  afterEach(() => {
    vi.resetAllMocks();
  });

  const getHomeButton = () => screen.queryByText('Ir al inicio');

  describe('when there is not a winner', () => {
    beforeEach(() => {
      setup(false, false);
    });

    it('should not render the winner message', () => {
      expect(
        screen.queryByText('¡Felicidades, ganaste!')
      ).not.toBeInTheDocument();

      expect(screen.queryByText('¡Perdiste ante !')).not.toBeInTheDocument();

      expect(screen.queryByText('🏆')).not.toBeInTheDocument();

      expect(screen.queryByText('😞')).not.toBeInTheDocument();

      expect(getHomeButton()).not.toBeInTheDocument();
    });
  });

  describe('when there is a winner and it is the current player', () => {
    beforeEach(() => {
      setup();
    });

    it('should render the winner message', () => {
      expect(screen.queryByText('¡Felicidades, ganaste!')).toBeInTheDocument();
      expect(screen.queryByText('🏆')).toBeInTheDocument();

      expect(screen.queryByText('¡Perdiste ante !')).not.toBeInTheDocument();
      expect(screen.queryByText('😞')).not.toBeInTheDocument();
    });
  });

  describe('when there is a winner and it is not the current player', () => {
    beforeEach(() => {
      setup(true, false, 'Edward Elric');
    });

    it('should renders the winner message', () => {
      expect(
        screen.queryByText('¡Felicidades, ganaste!')
      ).not.toBeInTheDocument();

      expect(
        screen.queryByText('¡Perdiste ante Edward Elric!')
      ).toBeInTheDocument();

      expect(screen.queryByText('🏆')).not.toBeInTheDocument();

      expect(screen.queryByText('😞')).toBeInTheDocument();
    });
  });

  describe('Button functionality', () => {
    beforeEach(() => {
      setup();
    });

    it('should render the "Ir al inicio" button when there is a winner', () => {
      expect(getHomeButton()).toBeInTheDocument();
    });

    it('should call redirectToHomePage when the "Ir al inicio" button is clicked', async () => {
      await userEvent.click(getHomeButton());
      expect(mockRedirectToHomePage).toHaveBeenCalledTimes(1);
    });
  });
});
