import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreateGameButton from './CreateGameButton';
import CreateGameForm from '../CreateGameForm/CreateGameForm';

vi.mock('../CreateGameForm/CreateGameForm', () => ({
  default: vi.fn(() => <div>CreateGameForm</div>),
}));

describe('CreateGameButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () => render(<CreateGameButton />);

  it('renders the "Crear partida" button initially', () => {
    renderComponent();
    expect(screen.getByText('Crear partida')).toBeInTheDocument();
  });

  it('renders the CreateGameForm when the button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Crear partida'));
    expect(screen.getByText('CreateGameForm')).toBeInTheDocument();
  });

  it('hides the "Crear partida" button when the form is shown', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Crear partida'));
    expect(screen.queryByText('Crear partida')).not.toBeInTheDocument();
  });

  it('shows the "Crear partida" button when the form is closed', () => {
    CreateGameForm.mockImplementation(({ setShowForm }) => (
      <div>
        CreateGameForm
        <button onClick={() => setShowForm(false)}>Close Form</button>
      </div>
    ));

    renderComponent();
    fireEvent.click(screen.getByText('Crear partida'));
    fireEvent.click(screen.getByText('Close Form'));
    expect(screen.getByText('Crear partida')).toBeInTheDocument();
  });
});
