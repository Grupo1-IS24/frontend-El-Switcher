import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, it, vi, expect } from 'vitest';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { useParams } from 'react-router-dom';
import { leaveGame } from '../../service/LeaveGame';
import LeaveButton from './LeaveButton';
import useRouteNavigation from '../../hooks/useRouteNavigation';
import showToast from '../../utils/toastUtil';

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

vi.mock('../../utils/toastUtil', () => ({
  default: vi.fn(),
}));

describe('LeaveButton', () => {
  const mockRedirect = vi.fn();
  const mockLeaveGame = vi.fn();

  const mockPlayerID = { playerID: 'player123' };
  const mockUseParams = { gameId: 'game456' };

  const LOBBY_TEXT = 'Abandonar lobby';
  const GAME_TEXT = 'x';

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

  const clickButtonAndWait = async (text) => {
    fireEvent.click(screen.getByText(text));
    await waitFor(() => {
      expect(leaveGame).toHaveBeenCalledWith('game456', 'player123');
      expect(mockRedirect).toHaveBeenCalled();
    });
  };

  const logErrorAndWait = async (text) => {
    console.error = vi.fn();
    useParams.mockReturnValue({ gameId: null });
    renderLeaveButton(text === LOBBY_TEXT ? 'lobby' : 'game');
    fireEvent.click(screen.getByText(text));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'gameId o playerID no están definidos.'
      );
      expect(leaveGame).not.toHaveBeenCalled();
      expect(mockRedirect).not.toHaveBeenCalled();
    });
  };

  const handleLeaveGameError = async (text) => {
    console.error = vi.fn();
    showToast.mockImplementation(() => {});

    leaveGame.mockRejectedValue(new Error('Error en el servidor'));
    renderLeaveButton(text === LOBBY_TEXT ? 'lobby' : 'game');
    fireEvent.click(screen.getByText(text));

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith({
        type: 'error',
        message: 'Error al abandonar el juego. Intente nuevamente.',
        autoClose: 3000,
      });
      expect(console.error).toHaveBeenCalledWith(
        'Error al abandonar el juego',
        expect.any(Error)
      );
    });
  };

  it(`should render the button with the text "${LOBBY_TEXT}" when the type is "lobby"`, () => {
    renderLeaveButton('lobby');
    expect(screen.getByText(LOBBY_TEXT)).toBeInTheDocument();
  });

  it(`should render the button with the text "${GAME_TEXT}" when the type is "game"`, () => {
    renderLeaveButton('game');
    expect(screen.getByText(GAME_TEXT)).toBeInTheDocument();
  });

  it('should call leaveGame and redirectToHomePage when clicking the button when the type is "lobby"', async () => {
    renderLeaveButton('lobby');
    await clickButtonAndWait(LOBBY_TEXT);
  });

  it('should call leaveGame and redirectToHomePage when clicking the button when the type is "game"', async () => {
    renderLeaveButton('game');
    await clickButtonAndWait(GAME_TEXT);
  });

  it('should log an error to the console if gameId or playerID are not defined when the type is "lobby"', async () => {
    await logErrorAndWait(LOBBY_TEXT);
  });

  it('should log an error to the console if gameId or playerID are not defined when the type is "game"', async () => {
    await logErrorAndWait(GAME_TEXT);
  });

  it('should display a toast and log the error to the console if leaveGame fails when the type is "lobby"', async () => {
    await handleLeaveGameError(LOBBY_TEXT);
  });

  it('should display a toast and log the error to the console if leaveGame fails when the type is "game"', async () => {
    await handleLeaveGameError(GAME_TEXT);
  });
});
