import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, it, vi, expect } from 'vitest';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { useParams } from 'react-router-dom';
import { leaveGame } from '../../service/LeaveGame';
import LeaveButton from './LeaveButton';
import useRouteNavigation from '../../hooks/useRouteNavigation';

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

vi.mock('../../hooks/useRouteNavigation', () => ({
  default: vi.fn(() => ({
    redirectToHomePage: vi.fn(),
  })),
}));

vi.mock('../../service/LeaveGame', () => ({
  leaveGame: vi.fn(),
}));

describe('LeaveButton', () => {
  const mockRedirect = vi.fn();
  const mockLeaveGame = vi.fn();

  const mockPlayerID = { playerID: 'player123' };
  const mockUseParams = { gameId: 'game456' };

  beforeEach(() => {
    vi.clearAllMocks();
    useRouteNavigation.mockReturnValue({
      redirectToHomePage: mockRedirect,
    });
    useParams.mockReturnValue(mockUseParams);
    leaveGame.mockImplementation(mockLeaveGame);
  });

  const renderLeaveButton = (type) => {
    return render(
      <PlayerContext.Provider value={mockPlayerID}>
        <LeaveButton type={type} />
      </PlayerContext.Provider>
    );
  };

  it('it should render the button with the text "Abandonar lobby" when the type is "lobby"', () => {
    renderLeaveButton('lobby');
    expect(screen.getByText('Abandonar lobby')).toBeInTheDocument();
  });

  it('it should render the button with the text "x" when the type is "game"', () => {
    renderLeaveButton('game');
    expect(screen.getByText('x')).toBeInTheDocument();
  });

  it('it should call leaveGame and redirectToHomePage when clicking the button when the type is "lobby"', async () => {
    renderLeaveButton('lobby');
    fireEvent.click(screen.getByText('Abandonar lobby'));

    await waitFor(() => {
      expect(leaveGame).toHaveBeenCalledWith('game456', 'player123');
      expect(mockRedirect).toHaveBeenCalled();
    });
  });

  it('it should call leaveGame and redirectToHomePage when clicking the button when the type is "game"', async () => {
    renderLeaveButton('game');
    fireEvent.click(screen.getByText('x'));

    await waitFor(() => {
      expect(leaveGame).toHaveBeenCalledWith('game456', 'player123');
      expect(mockRedirect).toHaveBeenCalled();
    });
  });

  it('it should log an error to the console if gameId or playerID are not defined when the type is "lobby"', async () => {
    console.error = vi.fn();

    useParams.mockReturnValue({ gameId: null });
    renderLeaveButton('lobby');
    fireEvent.click(screen.getByText('Abandonar lobby'));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'gameId o playerID no están definidos.'
      );
      expect(leaveGame).not.toHaveBeenCalled();
      expect(mockRedirect).not.toHaveBeenCalled();
    });
  });

  it('it should log an error to the console if gameId or playerID are not defined when the type is "game"', async () => {
    console.error = vi.fn();

    useParams.mockReturnValue({ gameId: null });
    renderLeaveButton('game');
    fireEvent.click(screen.getByText('x'));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'gameId o playerID no están definidos.'
      );
      expect(leaveGame).not.toHaveBeenCalled();
      expect(mockRedirect).not.toHaveBeenCalled();
    });
  });

  it('it should display an alert and log the error to the console if leaveGame fails when the type is "lobby"', async () => {
    console.error = vi.fn();
    window.alert = vi.fn();

    leaveGame.mockRejectedValue(new Error('Error en el servidor'));
    renderLeaveButton('lobby');
    fireEvent.click(screen.getByText('Abandonar lobby'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        'Error al abandonar el juego. Intente nuevamente.'
      );
      expect(console.error).toHaveBeenCalledWith(
        'Error al abandonar el juego',
        expect.any(Error)
      );
    });
  });

  it('it should display an alert and log the error to the console if leaveGame fails when the type is "game"', async () => {
    console.error = vi.fn();
    window.alert = vi.fn();

    leaveGame.mockRejectedValue(new Error('Error en el servidor'));
    renderLeaveButton('game');
    fireEvent.click(screen.getByText('x'));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        'Error al abandonar el juego. Intente nuevamente.'
      );
      expect(console.error).toHaveBeenCalledWith(
        'Error al abandonar el juego',
        expect.any(Error)
      );
    });
  });
});
