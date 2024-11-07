import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WinnerMessage from './WinnerMessage';
import useRouteNavigation from '../../hooks/useRouteNavigation';
import useWinnerPlayer from '../../hooks/useWinnerPlayer';
import { useGameSounds } from '../../hooks/useGameSounds';
import { leaveGame } from '../../service/LeaveGame';
import { useParams } from 'react-router-dom';
import { PlayerContext } from '../../contexts/PlayerProvider';

// Mock de los hooks y funciones
vi.mock('../../hooks/useRouteNavigation');
vi.mock('../../hooks/useWinnerPlayer');
vi.mock('../../hooks/useGameSounds');
vi.mock('../../service/LeaveGame');
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

describe('WinnerMessage', () => {
  const mockPlaySound = vi.fn();
  const mockStopSound = vi.fn();
  const mockRedirectToHomePage = vi.fn();
  const mockLeaveGame = vi.fn();

  beforeEach(() => {
    useRouteNavigation.mockReturnValue({
      redirectToHomePage: mockRedirectToHomePage,
    });
    useWinnerPlayer.mockReturnValue({
      isCurrentPlayerWinner: false,
      thereIsWinner: false,
      winnerName: '',
    });
    useGameSounds.mockReturnValue({
      playSound: mockPlaySound,
      stopSound: mockStopSound,
    });
    leaveGame.mockImplementation(mockLeaveGame);
    useParams.mockReturnValue({ gameId: '123' });
  });

  const renderWithPlayerContext = (playerID) =>
    render(
      <PlayerContext.Provider value={{ playerID }}>
        <WinnerMessage />
      </PlayerContext.Provider>
    );

  it('should not render anything if there is no winner', () => {
    renderWithPlayerContext(1);
    expect(screen.queryByText(/¡Felicidades, ganaste!/)).toBeNull();
    expect(screen.queryByText(/¡Perdiste ante/)).toBeNull();
  });

  it('should render winner message if current player is the winner', () => {
    useWinnerPlayer.mockReturnValue({
      isCurrentPlayerWinner: true,
      thereIsWinner: true,
      winnerName: 'Player 1',
    });

    renderWithPlayerContext(1);
    expect(screen.getByText('¡Felicidades, ganaste!')).toBeInTheDocument();
    expect(screen.getByText('🏆')).toBeInTheDocument();
  });

  it('should render loser message if current player is not the winner', () => {
    useWinnerPlayer.mockReturnValue({
      isCurrentPlayerWinner: false,
      thereIsWinner: true,
      winnerName: 'Player 2',
    });

    renderWithPlayerContext(1);
    expect(screen.getByText('¡Perdiste ante Player 2!')).toBeInTheDocument();
    expect(screen.getByText('😞')).toBeInTheDocument();
  });

  it('should play winner sound if current player is the winner', () => {
    useWinnerPlayer.mockReturnValue({
      isCurrentPlayerWinner: true,
      thereIsWinner: true,
      winnerName: 'Player 1',
    });

    renderWithPlayerContext(1);
    expect(mockPlaySound).toHaveBeenCalledWith(true);
  });

  it('should play loser sound if current player is not the winner', () => {
    useWinnerPlayer.mockReturnValue({
      isCurrentPlayerWinner: false,
      thereIsWinner: true,
      winnerName: 'Player 2',
    });

    renderWithPlayerContext(1);
    expect(mockPlaySound).toHaveBeenCalledWith(false);
  });

  it('should call goHome function when button is clicked', async () => {
    useWinnerPlayer.mockReturnValue({
      isCurrentPlayerWinner: false,
      thereIsWinner: true,
      winnerName: 'Player 2',
    });

    renderWithPlayerContext(1);
    fireEvent.click(screen.getByText('Ir al inicio'));

    await waitFor(() => {
      expect(mockStopSound).toHaveBeenCalledWith(false);
      expect(mockLeaveGame).toHaveBeenCalledWith('123', 1);
      expect(mockRedirectToHomePage).toHaveBeenCalled();
    });
  });

  it('should handle error when leaveGame fails', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    useWinnerPlayer.mockReturnValue({
      isCurrentPlayerWinner: false,
      thereIsWinner: true,
      winnerName: 'Player 2',
    });
    leaveGame.mockRejectedValue(new Error('Error al abandonar el juego'));

    renderWithPlayerContext(1);
    fireEvent.click(screen.getByText('Ir al inicio'));

    await waitFor(() => {
      expect(mockStopSound).toHaveBeenCalledWith(false);
      expect(mockLeaveGame).toHaveBeenCalledWith('123', 1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error al abandonar el juego',
        expect.any(Error)
      );
      expect(mockRedirectToHomePage).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });
});
