import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import JoinGameForm from './JoinGameForm';
import { PlayerContext } from '../../contexts/PlayerProvider';
import useRouteNavigation from '../../hooks/useRouteNavigation';
import { handleJoinGame } from '../../utils/gameHandlers';
import showToast from '../../utils/toastUtil';

vi.mock('../../hooks/useRouteNavigation');
vi.mock('../../utils/gameHandlers');
vi.mock('../../utils/toastUtil');

describe('JoinGameForm', () => {
  const mockCreatePlayer = vi.fn();
  const mockRedirectToLobbyPage = vi.fn();
  const mockOnClose = vi.fn();

  const publicGame = {
    gameName: 'Public Game',
    isPublic: true,
    gameId: 1,
  };

  const privateGame = {
    gameName: 'Private Game',
    isPublic: false,
    gameId: 2,
  };

  const renderComponent = (selectedGame) =>
    render(
      <PlayerContext.Provider value={{ createPlayer: mockCreatePlayer }}>
        <JoinGameForm selectedGame={selectedGame} onClose={mockOnClose} />
      </PlayerContext.Provider>
    );

  beforeEach(() => {
    vi.resetAllMocks();
    useRouteNavigation.mockReturnValue({
      redirectToLobbyPage: mockRedirectToLobbyPage,
    });
  });

  it('does not render anything if selectedGame is null', () => {
    const { container } = renderComponent(null);
    expect(container.firstChild).toBeNull();
  });

  it('renders correctly when selectedGame is provided', () => {
    renderComponent(publicGame);
    expect(
      screen.getByText(`Unirse a "${publicGame.gameName}"`)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Ingresa tu nombre')
    ).toBeInTheDocument();
  });

  it('shows the password field if the game is not public', () => {
    renderComponent(privateGame);
    expect(
      screen.getByPlaceholderText('Ingresa la contraseña')
    ).toBeInTheDocument();
  });

  it('does not show the password field if the game is public', () => {
    renderComponent(publicGame);
    expect(
      screen.queryByPlaceholderText('Ingresa la contraseña')
    ).not.toBeInTheDocument();
  });

  it('shows a warning toast if playerName is empty on form submission', () => {
    renderComponent(publicGame);
    fireEvent.click(screen.getByText('Unirse'));
    expect(showToast).toHaveBeenCalledWith({
      type: 'warning',
      message: 'El nombre del jugador no puede estar vacío',
      autoClose: 3000,
    });
    expect(handleJoinGame).not.toHaveBeenCalled();
  });

  it('calls handleJoinGame with correct parameters on form submission', () => {
    renderComponent(publicGame);
    const playerNameInput = screen.getByPlaceholderText('Ingresa tu nombre');
    fireEvent.change(playerNameInput, { target: { value: 'Jugador 1' } });
    fireEvent.click(screen.getByText('Unirse'));
    expect(handleJoinGame).toHaveBeenCalledWith(
      expect.any(Object),
      publicGame,
      mockCreatePlayer,
      mockRedirectToLobbyPage
    );
  });

  it('calls onClose when the close button is clicked', () => {
    renderComponent(publicGame);
    fireEvent.click(screen.getByText('x'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('handles form submission correctly in a private game', () => {
    renderComponent(privateGame);
    const playerNameInput = screen.getByPlaceholderText('Ingresa tu nombre');
    const passwordInput = screen.getByPlaceholderText('Ingresa la contraseña');
    fireEvent.change(playerNameInput, { target: { value: 'Jugador 1' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Unirse'));
    expect(handleJoinGame).toHaveBeenCalledWith(
      expect.any(Object),
      privateGame,
      mockCreatePlayer,
      mockRedirectToLobbyPage
    );
  });
});
