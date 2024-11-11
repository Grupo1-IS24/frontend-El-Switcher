import { describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PlayerContext } from '../contexts/PlayerProvider';
import HomePage from './HomePage';

// Mock de componentes y contexto
vi.mock('../components/CreateGameForm/CreateGameForm', () => ({
  default: ({ setShowForm }) => (
    <div data-testid='create-game-form'>
      <h2>Crear Partida</h2>
      <button onClick={() => setShowForm(false)}>x</button>
    </div>
  ),
}));

describe('HomePage', () => {
  const mockCreatePlayer = vi.fn();

  const renderHomePage = () => {
    return render(
      <PlayerContext.Provider value={{ createPlayer: mockCreatePlayer }}>
        <Router>
          <HomePage />
        </Router>
      </PlayerContext.Provider>
    );
  };

  describe('Initial render', () => {
    it('renders initial components correctly', () => {
      renderHomePage();
      expect(screen.getByText('El switcher')).toBeInTheDocument();
      expect(screen.getByText('Crear partida')).toBeInTheDocument();
      expect(screen.getByText('Unirse a partida')).toBeInTheDocument();
    });

    it('renders BackgroundOverlay component', () => {
      const { container } = renderHomePage();
      expect(container.querySelector('.absolute.inset-0')).toBeInTheDocument();
    });
  });

  describe('Form visibility and interaction', () => {
    it('shows CreateGameForm when CreateGameButton is clicked', () => {
      renderHomePage();
      const createButton = screen.getByText('Crear partida');
      fireEvent.click(createButton);

      expect(screen.getByTestId('create-game-form')).toBeInTheDocument();
      expect(screen.getByText('Crear Partida')).toBeInTheDocument();
      expect(screen.queryByText('El switcher')).not.toBeInTheDocument();
      expect(screen.queryByText('Unirse a partida')).not.toBeInTheDocument();
    });

    it('hides CreateGameForm when form is closed', () => {
      renderHomePage();

      fireEvent.click(screen.getByText('Crear partida'));
      expect(screen.getByTestId('create-game-form')).toBeInTheDocument();

      fireEvent.click(screen.getByText('x'));

      expect(screen.getByText('El switcher')).toBeInTheDocument();
      expect(screen.getByText('Crear partida')).toBeInTheDocument();
      expect(screen.getByText('Unirse a partida')).toBeInTheDocument();
    });
  });

  describe('Layout and styling', () => {
    it('maintains proper layout classes', () => {
      const { container } = renderHomePage();
      expect(container.firstChild).toHaveClass('w-screen', 'h-screen');
    });

    it('maintains BackgroundOverlay visibility regardless of form state', () => {
      const { container } = renderHomePage();
      const overlay = container.querySelector('.absolute.inset-0');
      expect(overlay).toBeInTheDocument();

      fireEvent.click(screen.getByText('Crear partida'));
      expect(overlay).toBeInTheDocument();
    });

    it('maintains proper button layout', () => {
      renderHomePage();
      const buttonContainer = screen
        .getByText('Crear partida')
        .closest('.flex.flex-row');
      expect(buttonContainer).toHaveClass(
        'flex',
        'flex-row',
        'items-center',
        'justify-center',
        'gap-10',
        'mb-20'
      );
    });
  });
});
