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

  it('debería renderizar el botón con el texto "Abandonar lobby" cuando el tipo es "lobby"', () => {
    renderLeaveButton('lobby');
    expect(screen.getByText('Abandonar lobby')).toBeInTheDocument();
  });

  it('debería renderizar el botón con el texto "x" cuando el tipo no es "lobby"', () => {
    renderLeaveButton('game');
    expect(screen.getByText('x')).toBeInTheDocument();
  });

  it('debería llamar a leaveGame y redirectToHomePage al hacer clic en el botón', async () => {
    renderLeaveButton('lobby');
    fireEvent.click(screen.getByText('Abandonar lobby'));

    await waitFor(() => {
      expect(leaveGame).toHaveBeenCalledWith('game456', 'player123');
      expect(mockRedirect).toHaveBeenCalled();
    });
  });

  it('debería mostrar un error en consola si gameId o playerID no están definidos', async () => {
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

  it('debería mostrar una alerta y registrar el error en consola si leaveGame falla', async () => {
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
});
