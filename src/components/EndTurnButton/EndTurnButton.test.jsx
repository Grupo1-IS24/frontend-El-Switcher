import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import EndTurnButton from './EndTurnButton';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { PlayCardLogicContext } from '../../contexts/PlayCardLogicProvider';
import usePlayerTurn from '../../hooks/usePlayerTurn';
import useDisableButton from '../../hooks/useDisableButton';
import { endTurn } from '../../service/EndTurnService';
import showToast from '../../utils/toastUtil';
import { useParams } from 'react-router-dom';

// Mock de los hooks y funciones
vi.mock('../../hooks/usePlayerTurn');
vi.mock('../../hooks/useDisableButton');
vi.mock('../../service/EndTurnService');
vi.mock('../../utils/toastUtil');
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

describe('EndTurnButton', () => {
  const mockPlayerID = 'player123';
  const mockGameID = 'game123';
  const mockResetAllCards = vi.fn();
  const mockIsCurrentPlayerTurn = vi.fn();
  let consoleErrorSpy;

  beforeEach(() => {
    useParams.mockReturnValue({ gameId: mockGameID });
    usePlayerTurn.mockReturnValue({ isCurrentPlayerTurn: mockIsCurrentPlayerTurn });
    useDisableButton.mockImplementation((asyncFunction) => {
      const handleClick = async () => {
        await asyncFunction();
      };
      return [false, handleClick];
    });
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
    consoleErrorSpy.mockRestore();
  });

  const renderComponent = () =>
    render(
      <PlayerContext.Provider value={{ playerID: mockPlayerID }}>
        <PlayCardLogicContext.Provider value={{ resetAllCards: mockResetAllCards }}>
          <EndTurnButton />
        </PlayCardLogicContext.Provider>
      </PlayerContext.Provider>
    );

  it('should render the button when it is the current player\'s turn', () => {
    mockIsCurrentPlayerTurn.mockReturnValue(true);
    renderComponent();
    expect(screen.getByText('Pasar turno')).toBeInTheDocument();
  });

  it('should not render the button when it is not the current player\'s turn', () => {
    mockIsCurrentPlayerTurn.mockReturnValue(false);
    renderComponent();
    expect(screen.queryByText('Pasar turno')).not.toBeInTheDocument();
  });

  it('should call endTurn and resetAllCards when the button is clicked', async () => {
    mockIsCurrentPlayerTurn.mockReturnValue(true);
    renderComponent();
    fireEvent.click(screen.getByText('Pasar turno'));
    await waitFor(() => {
      expect(mockResetAllCards).toHaveBeenCalled();
      expect(endTurn).toHaveBeenCalledWith(mockGameID, mockPlayerID);
    });
  });

  it('should show an error toast when endTurn fails', async () => {
    mockIsCurrentPlayerTurn.mockReturnValue(true);
    endTurn.mockRejectedValue(new Error('Test error'));
    renderComponent();
    fireEvent.click(screen.getByText('Pasar turno'));
    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith({
        type: 'error',
        message: 'Error al terminar el turno. Intente nuevamente.',
        autoClose: 3000,
      });
      expect(console.error).toHaveBeenCalledWith('Error al terminar el turno', expect.any(Error));
    });
  });
});