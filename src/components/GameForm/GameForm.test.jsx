import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import GameForm from './GameForm';
import { PlayerContext } from '../../contexts/PlayerProvider';
import useRouteNavigation from '../../hooks/useRouteNavigation';
import { handleCreateGame, handleJoinGame } from '../../utils/gameHandlers';
import showToast from '../../utils/toastUtil';

vi.mock('../../hooks/useRouteNavigation', () => ({
  default: vi.fn(),
}));

vi.mock('../../service/JoinGameService', () => ({
  joinGame: vi.fn(),
}));

vi.mock('../../utils/gameHandlers', () => ({
  handleCreateGame: vi.fn(),
  handleJoinGame: vi.fn(),
}));

vi.mock('../../utils/toastUtil', () => ({
  default: vi.fn(),
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

  const renderForm = (type, additionalProps = {}) => {
    const defaultProps = {
      type,
      onClose: mockOnClose,
      ...(type === 'join' && {
        selectedGame: { gameId: '123', gameName: 'Test Game' },
      }),
      ...(type === 'create' && { setshowForm: mockSetShowForm }),
    };
    setup({ ...defaultProps, ...additionalProps });
  };

  describe('Common functionality', () => {
    it('should render the close button correctly', () => {
      renderForm('join');
      expect(screen.getByText('x')).toBeInTheDocument();
    });

    it('should call onClose when the close button is clicked', () => {
      renderForm('join');
      fireEvent.click(screen.getByText('x'));
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should call setshowForm when the close button is clicked in the create form', () => {
      renderForm('create');
      fireEvent.click(screen.getByText('x'));
      expect(mockSetShowForm).toHaveBeenCalledTimes(1);
      expect(mockSetShowForm).toHaveBeenCalledWith(false);
    });
  });

  describe('Join form', () => {
    it('should render the join form correctly', () => {
      renderForm('join');
      expect(screen.getByText(`Unirse a "Test Game"`)).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Ingresa tu nombre')
      ).toBeInTheDocument();
      expect(screen.getByText('Unirse')).toBeInTheDocument();
    });

    it('should have the correct number and types of inputs and buttons', () => {
      renderForm('join');
      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(2);
      expect(inputs[0]).toHaveAttribute('name', 'playerName');

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2);
      expect(buttons[0]).toHaveTextContent('Unirse');
      expect(buttons[1]).toHaveTextContent('x');
    });

    it('should call handleJoinGame with the correct arguments when the form is submitted', () => {
      renderForm('join');
      fireEvent.change(screen.getByPlaceholderText('Ingresa tu nombre'), {
        target: { value: 'Player' },
      });
      fireEvent.submit(screen.getByRole('form'));
      expect(handleJoinGame).toHaveBeenCalledWith(
        expect.any(Object),
        { gameId: '123', gameName: 'Test Game' },
        mockCreatePlayer,
        mockRedirectToLobbyPage
      );
    });
  });

  describe('Create form', () => {
    it('should render the create form correctly', () => {
      renderForm('create');
      expect(screen.getByText('Crear partida')).toBeInTheDocument();
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
      expect(screen.getByText('Crear partida')).toBeInTheDocument();
    });

    it('should have the correct number and types of inputs and buttons', () => {
      renderForm('create');
      const textInputs = screen.getAllByRole('textbox');
      expect(textInputs).toHaveLength(3);
      expect(textInputs[0]).toHaveAttribute('name', 'ownerName');
      expect(textInputs[1]).toHaveAttribute('name', 'gameName');
      expect(textInputs[2]).toHaveAttribute('name', 'gamePassword');

      const numberInputs = screen.getAllByRole('spinbutton');
      expect(numberInputs).toHaveLength(2);
      expect(numberInputs[0]).toHaveAttribute('name', 'minPlayers');
      expect(numberInputs[1]).toHaveAttribute('name', 'maxPlayers');

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
      expect(screen.getByText('Crear partida')).toBeInTheDocument();
      expect(screen.getByText('x')).toBeInTheDocument();
    });

    it('should call handleCreateGame with the correct arguments when the form is submitted', () => {
      renderForm('create');
      fireEvent.change(screen.getByPlaceholderText('Ingresa tu nombre'), {
        target: { value: 'Host' },
      });
      fireEvent.change(
        screen.getByPlaceholderText('Ingresa el nombre de la partida'),
        {
          target: { value: 'Test Game' },
        }
      );
      fireEvent.change(screen.getByPlaceholderText('Cant. min. jugadores'), {
        target: { value: '2' },
      });
      fireEvent.change(screen.getByPlaceholderText('Cant. max. jugadores'), {
        target: { value: '4' },
      });
      fireEvent.submit(screen.getByRole('form'));
      expect(handleCreateGame).toHaveBeenCalledWith(
        expect.any(Object),
        mockCreatePlayer,
        mockRedirectToLobbyPage
      );
    });

    it('should show a warning toast if mandatory fields are missing', () => {
      renderForm('create');

      fireEvent.submit(screen.getByRole('form'));

      expect(showToast).toHaveBeenCalledWith({
        type: 'warning',
        message: 'Todos los campos son obligatorios',
        autoClose: 3000,
      });
    });

    it('should show a warning toast if game is locked and no password is provided', () => {
      renderForm('create');

      fireEvent.change(screen.getByPlaceholderText('Ingresa tu nombre'), {
        target: { value: 'Host' },
      });
      fireEvent.change(
        screen.getByPlaceholderText('Ingresa el nombre de la partida'),
        {
          target: { value: 'Test Game' },
        }
      );
      fireEvent.change(screen.getByPlaceholderText('Cant. min. jugadores'), {
        target: { value: '2' },
      });
      fireEvent.change(screen.getByPlaceholderText('Cant. max. jugadores'), {
        target: { value: '4' },
      });
      const lockButton = screen.getByRole('button', {
        name: 'Icono de candado',
      });
      fireEvent.click(lockButton);

      fireEvent.submit(screen.getByRole('form'));

      expect(showToast).toHaveBeenCalledWith({
        type: 'warning',
        message: 'Ingrese una contraseña o pongala pública',
        autoClose: 3000,
      });
    });
  });

  describe('Conditional behavior', () => {
    it('should not render the component when type is "join" and selectedGame is null', () => {
      const { container } = render(
        <PlayerContext.Provider value={{ createPlayer: mockCreatePlayer }}>
          <GameForm type='join' selectedGame={null} onClose={mockOnClose} />
        </PlayerContext.Provider>
      );
      expect(container.firstChild).toBeNull();
    });
  });
});
