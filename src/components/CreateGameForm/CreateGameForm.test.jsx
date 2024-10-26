import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CreateGameForm from './CreateGameForm';

describe('CreateGameForm', () => {
  const renderComponent = () => render(<CreateGameForm />);

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
});
