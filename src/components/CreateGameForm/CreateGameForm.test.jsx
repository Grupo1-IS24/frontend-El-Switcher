import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CreateGameForm from './CreateGameForm';

describe('CreateGameForm', () => {
  const renderComponent = (props = {}) => render(<CreateGameForm {...props} />);

  it('should render the CreateGameForm component', () => {
    renderComponent();
    expect(
      screen.getByPlaceholderText('Ingresa tu nombre')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Ingresa el nombre de la partida')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Cant. min. jugadores')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Cant. max. jugadores')
    ).toBeInTheDocument();
  });

  it('should render the TextInput components with the correct attributes', () => {
    renderComponent();
    const ownerNameInput = screen.getByPlaceholderText('Ingresa tu nombre');
    const gameNameInput = screen.getByPlaceholderText(
      'Ingresa el nombre de la partida'
    );

    expect(ownerNameInput).toHaveAttribute('name', 'ownerName');
    expect(gameNameInput).toHaveAttribute('name', 'gameName');
  });

  it('should render the NumberInput components with the correct attributes', () => {
    renderComponent();
    const minPlayersInput = screen.getByPlaceholderText('Cant. min. jugadores');
    const maxPlayersInput = screen.getByPlaceholderText('Cant. max. jugadores');

    expect(minPlayersInput).toHaveAttribute('name', 'minPlayers');
    expect(minPlayersInput).toHaveAttribute('min', '2');
    expect(minPlayersInput).toHaveAttribute('max', '4');

    expect(maxPlayersInput).toHaveAttribute('name', 'maxPlayers');
    expect(maxPlayersInput).toHaveAttribute('min', '2');
    expect(maxPlayersInput).toHaveAttribute('max', '4');
  });

  it('should toggle isLocked state when lock button is clicked', () => {
    const setIsLocked = vi.fn();
    const setGamePassword = vi.fn();
    const isLocked = false;

    renderComponent({
      setIsLocked,
      setGamePassword,
      isLocked,
      gamePassword: '',
    });

    const lockButton = screen.getByRole('button');
    fireEvent.click(lockButton);

    expect(setIsLocked).toHaveBeenCalledWith(true);
  });

  it('should clear gamePassword when unlocking the form', () => {
    const setIsLocked = vi.fn();
    const setGamePassword = vi.fn();
    const isLocked = true;

    renderComponent({
      setIsLocked,
      setGamePassword,
      isLocked,
      gamePassword: 'secret',
    });

    const lockButton = screen.getByRole('button');
    fireEvent.click(lockButton);

    expect(setIsLocked).toHaveBeenCalledWith(false);
    expect(setGamePassword).toHaveBeenCalledWith('');
  });

  it('should enable gamePassword input when isLocked is true', () => {
    const setGamePassword = vi.fn();
    const isLocked = true;

    renderComponent({ setGamePassword, isLocked, gamePassword: '' });

    const gamePasswordInput = screen.getByPlaceholderText(
      'Ingresa la contraseña'
    );
    expect(gamePasswordInput).not.toBeDisabled();
  });

  it('should disable gamePassword input when isLocked is false', () => {
    const setGamePassword = vi.fn();
    const isLocked = false;

    renderComponent({ setGamePassword, isLocked, gamePassword: '' });

    const gamePasswordInput = screen.getByPlaceholderText(
      'La partida es pública'
    );
    expect(gamePasswordInput).toBeDisabled();
  });

  it('should update gamePassword value on change', () => {
    const setGamePassword = vi.fn();
    const isLocked = true;

    renderComponent({ setGamePassword, isLocked, gamePassword: '' });

    const gamePasswordInput = screen.getByPlaceholderText(
      'Ingresa la contraseña'
    );
    fireEvent.change(gamePasswordInput, { target: { value: 'newpassword' } });

    expect(setGamePassword).toHaveBeenCalledWith('newpassword');
  });
});
