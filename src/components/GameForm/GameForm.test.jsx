import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import GameForm from './GameForm';
import { PlayerContext } from '../../contexts/PlayerProvider';
import useRouteNavigation from '../../hooks/useRouteNavigation';

vi.mock('../../hooks/useRouteNavigation', () => ({
  default: vi.fn(),
}));

vi.mock('../../service/JoinGameService', () => ({
  joinGame: vi.fn(),
}));

describe('GameForm', () => {
  const mockRedirectToLobbyPage = vi.fn();
  const mockCreatePlayer = vi.fn();
  const mockOnClose = vi.fn();
  const mockSetShowForm = vi.fn();

  beforeEach(() => {
    useRouteNavigation.mockReturnValue({
      redirectToLobbyPage: mockRedirectToLobbyPage,
    });
  });

  const setup = (props) => {
    render(
      <PlayerContext.Provider value={{ createPlayer: mockCreatePlayer }}>
        <GameForm {...props} />
      </PlayerContext.Provider>
    );
  };

  describe('Funcionalidad común', () => {
    it('debería renderizar el botón de cerrar correctamente', () => {
      setup({ type: 'join', selectedGame: { gameId: '123', gameName: 'Juego de Prueba' }, onClose: mockOnClose });
      expect(screen.getByText('x')).toBeInTheDocument();
    });

    it('debería llamar a onClose cuando se hace clic en el botón de cerrar', () => {
      setup({ type: 'join', selectedGame: { gameId: '123', gameName: 'Juego de Prueba' }, onClose: mockOnClose });
      fireEvent.click(screen.getByText('x'));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Formulario de unirse', () => {
    it('debería renderizar el formulario de unirse correctamente', () => {
      setup({ type: 'join', selectedGame: { gameId: '123', gameName: 'Juego de Prueba' }, onClose: mockOnClose });
      expect(screen.getByText(`Unirse a "Juego de Prueba"`)).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Ingresa tu nombre')).toBeInTheDocument();
      expect(screen.getByText('Unirse')).toBeInTheDocument();
    });

    it('debería tener el número y tipos correctos de inputs y botones', () => {
      setup({ type: 'join', selectedGame: { gameId: '123', gameName: 'Juego de Prueba' }, onClose: mockOnClose });
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(1);
      expect(inputs[0]).toHaveAttribute('name', 'playerName');

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent('Unirse');
      expect(buttons[1]).toHaveTextContent('x');
    });
  });

  describe('Formulario de crear', () => {
    it('debería renderizar el formulario de crear correctamente', () => {
      setup({ type: 'create', onClose: mockOnClose, setshowForm: mockSetShowForm });
      expect(screen.getByText('Crear Partida')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Ingresa tu nombre')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Ingresa el nombre de la partida')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Cant. min. jugadores')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Cant. max. jugadores')).toBeInTheDocument();
      expect(screen.getByText('Crear partida')).toBeInTheDocument();
    });

    it('debería tener el número y tipos correctos de inputs y botones', () => {
      setup({ type: 'create', onClose: mockOnClose, setshowForm: mockSetShowForm });
      const textInputs = screen.getAllByRole('textbox');
      expect(textInputs).toHaveLength(2);
      expect(textInputs[0]).toHaveAttribute('name', 'ownerName');
      expect(textInputs[1]).toHaveAttribute('name', 'gameName');

      const numberInputs = screen.getAllByRole('spinbutton');
      expect(numberInputs).toHaveLength(2);
      expect(numberInputs[0]).toHaveAttribute('name', 'minPlayers');
      expect(numberInputs[1]).toHaveAttribute('name', 'maxPlayers');

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent('Crear partida');
      expect(buttons[1]).toHaveTextContent('x');
    });
  });
});