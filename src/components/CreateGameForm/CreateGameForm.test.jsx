import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreateGameForm from './CreateGameForm';
import { PlayerContext } from '../../contexts/PlayerProvider';
import useRouteNavigation from '../../hooks/useRouteNavigation';
import { handleCreateGame } from '../../utils/gameHandlers';
import showToast from '../../utils/toastUtil';

vi.mock('../../assets/Icons/padlock-locked.svg', () => ({
  default: 'locked-icon',
}));
vi.mock('../../assets/Icons/padlock-unlocked.svg', () => ({
  default: 'unlocked-icon',
}));

vi.mock('../../hooks/useRouteNavigation');
vi.mock('../../utils/gameHandlers');
vi.mock('../../utils/toastUtil');

describe('CreateGameForm', () => {
  const mockCreatePlayer = vi.fn();
  const mockRedirectToLobbyPage = vi.fn();
  const mockSetShowForm = vi.fn();

  const renderComponent = () =>
    render(
      <PlayerContext.Provider value={{ createPlayer: mockCreatePlayer }}>
        <CreateGameForm setShowForm={mockSetShowForm} />
      </PlayerContext.Provider>
    );

  beforeEach(() => {
    vi.resetAllMocks();
    useRouteNavigation.mockReturnValue({
      redirectToLobbyPage: mockRedirectToLobbyPage,
    });
  });

  it('renders the form correctly', () => {
    renderComponent();
    expect(screen.getByText('Crear Partida')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ingresa tu nombre')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Ingresa el nombre de la partida')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('La partida es pública')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Cant. min. jugadores')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Cant. max. jugadores')
    ).toBeInTheDocument();
  });

  it('shows a warning message if required fields are missing', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Crear partida'));
    expect(showToast).toHaveBeenCalledWith({
      type: 'warning',
      message: 'Todos los campos son obligatorios',
      autoClose: 3000,
    });
    expect(handleCreateGame).not.toHaveBeenCalled();
  });

  it('handles lock and unlock state correctly', () => {
    renderComponent();
    const lockButton = screen.getByRole('button', { name: /Icono de candado/i });
    const passwordInput = screen.getByPlaceholderText('La partida es pública');

    expect(passwordInput).toBeDisabled();

    fireEvent.click(lockButton);
    expect(passwordInput).not.toBeDisabled();
    expect(passwordInput).toHaveAttribute('placeholder', 'Ingresa la contraseña');

    fireEvent.click(lockButton);
    expect(passwordInput).toBeDisabled();
    expect(passwordInput).toHaveAttribute('placeholder', 'La partida es pública');
  });

  it('shows a warning message if the game is private but no password is provided', () => {
    renderComponent();
    const lockButton = screen.getByRole('button', { name: /Icono de candado/i });

    fireEvent.click(lockButton);

    fireEvent.change(screen.getByPlaceholderText('Ingresa tu nombre'), {
      target: { value: 'Jugador 1' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingresa el nombre de la partida'), {
      target: { value: 'Partida Privada' },
    });
    fireEvent.change(screen.getByPlaceholderText('Cant. min. jugadores'), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByPlaceholderText('Cant. max. jugadores'), {
      target: { value: '4' },
    });

    fireEvent.click(screen.getByText('Crear partida'));

    expect(showToast).toHaveBeenCalledWith({
      type: 'warning',
      message: 'Ingrese una contraseña o póngala pública',
      autoClose: 3000,
    });
    expect(handleCreateGame).not.toHaveBeenCalled();
  });

  it('calls handleCreateGame with correct parameters when form is submitted', () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText('Ingresa tu nombre'), {
      target: { value: 'Jugador 1' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingresa el nombre de la partida'), {
      target: { value: 'Partida Pública' },
    });
    fireEvent.change(screen.getByPlaceholderText('Cant. min. jugadores'), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByPlaceholderText('Cant. max. jugadores'), {
      target: { value: '4' },
    });

    fireEvent.click(screen.getByText('Crear partida'));

    expect(handleCreateGame).toHaveBeenCalledWith(
      expect.any(Object),
      mockCreatePlayer,
      mockRedirectToLobbyPage
    );
  });

  it('calls setShowForm(false) when the form is closed', () => {
    renderComponent();
    fireEvent.click(screen.getByText('x'));
    expect(mockSetShowForm).toHaveBeenCalledWith(false);
  });

  it('submits the form correctly when the game is private', () => {
    renderComponent();
    const lockButton = screen.getByRole('button', { name: /Icono de candado/i });

    fireEvent.click(lockButton);

    fireEvent.change(screen.getByPlaceholderText('Ingresa tu nombre'), {
      target: { value: 'Jugador 1' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingresa el nombre de la partida'), {
      target: { value: 'Partida Privada' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingresa la contraseña'), {
      target: { value: 'contraseña123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Cant. min. jugadores'), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByPlaceholderText('Cant. max. jugadores'), {
      target: { value: '4' },
    });

    fireEvent.click(screen.getByText('Crear partida'));

    expect(handleCreateGame).toHaveBeenCalledWith(
      expect.any(Object),
      mockCreatePlayer,
      mockRedirectToLobbyPage
    );
  });

  it('updates the gamePassword value correctly', () => {
    renderComponent();
    const lockButton = screen.getByRole('button', { name: /Icono de candado/i });

    fireEvent.click(lockButton);

    const passwordInput = screen.getByPlaceholderText('Ingresa la contraseña');

    fireEvent.change(passwordInput, { target: { value: 'contraseña123' } });
    expect(passwordInput).toHaveValue('contraseña123');

    fireEvent.click(lockButton);
    expect(passwordInput).toHaveValue('');
  });

  it('does not allow minPlayers, maxPlayers, ownerName or gameName to be empty', () => {
    renderComponent();

    fireEvent.click(screen.getByText('Crear partida'));

    expect(showToast).toHaveBeenCalledWith({
      type: 'warning',
      message: 'Todos los campos son obligatorios',
      autoClose: 3000,
    });
    expect(handleCreateGame).not.toHaveBeenCalled();
  });

  it('does not show a warning message if the game is public and no password is provided', () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText('Ingresa tu nombre'), {
      target: { value: 'Jugador 1' },
    });
    fireEvent.change(screen.getByPlaceholderText('Ingresa el nombre de la partida'), {
      target: { value: 'Partida Pública' },
    });
    fireEvent.change(screen.getByPlaceholderText('Cant. min. jugadores'), {
      target: { value: '2' },
    });
    fireEvent.change(screen.getByPlaceholderText('Cant. max. jugadores'), {
      target: { value: '4' },
    });

    fireEvent.click(screen.getByText('Crear partida'));

    expect(showToast).not.toHaveBeenCalledWith({
      type: 'warning',
      message: 'Ingrese una contraseña o póngala pública',
      autoClose: 3000,
    });
    expect(handleCreateGame).toHaveBeenCalled();
  });
});