import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreateGameButton from './CreateGameButton';

vi.mock('../CreateGameForm/CreateGameForm', () => ({
  default: vi.fn(() => <div>CreateGameForm</div>),
}));

describe('CreateGameButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockSetShowForm = vi.fn();

  const renderComponent = () =>
    render(<CreateGameButton setShowForm={mockSetShowForm} />);

  it('renders the "Crear partida" button initially', () => {
    renderComponent();
    expect(screen.getByText('Crear partida')).toBeInTheDocument();
  });

  it('calls setShowForm with true when button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByText('Crear partida'));
    expect(mockSetShowForm).toHaveBeenCalledWith(true);
  });

  it('handles form visibility through props', () => {
    const { rerender } = render(
      <CreateGameButton setShowForm={mockSetShowForm} />
    );
    expect(screen.getByText('Crear partida')).toBeInTheDocument();

    rerender(
      <CreateGameButton setShowForm={mockSetShowForm} showForm={true} />
    );
  });

  it('handles form closing through props', () => {
    const { rerender } = render(
      <CreateGameButton setShowForm={mockSetShowForm} showForm={true} />
    );

    rerender(
      <CreateGameButton setShowForm={mockSetShowForm} showForm={false} />
    );
    expect(screen.getByText('Crear partida')).toBeInTheDocument();
  });
});
