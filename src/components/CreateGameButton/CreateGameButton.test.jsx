import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CreateGameButton from './CreateGameButton';
import GameForm from '../GameForm/GameForm';

// Mock GameForm
vi.mock('../GameForm/GameForm', () => ({
  default: vi.fn(() => <div data-testid='game-form'>Game Form</div>),
}));

describe('CreateGameButton', () => {
  const renderComponent = () => render(<CreateGameButton />);

  it('should render the CreateGameButton component', () => {
    renderComponent();
    const button = screen.getByText('Crear partida');
    expect(button).toBeInTheDocument();
  });

  it('should have the correct text', () => {
    renderComponent();
    const button = screen.getByText('Crear partida');
    expect(button).toHaveTextContent('Crear partida');
  });

  it('should show the GameForm when the button is clicked', () => {
    renderComponent();
    const button = screen.getByText('Crear partida');
    fireEvent.click(button);
    const form = screen.getByTestId('game-form');
    expect(form).toBeInTheDocument();
  });

  it('should render the GameForm component when showForm is true', () => {
    renderComponent();
    const button = screen.getByText('Crear partida');
    fireEvent.click(button);
    expect(GameForm).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'create',
        setshowForm: expect.any(Function),
      }),
      {}
    );
  });
});
