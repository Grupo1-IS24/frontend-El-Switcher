import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CancelMovementButton from './CancelMovementButton';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { PlayCardLogicContext } from '../../contexts/PlayCardLogicProvider';
import { useParams } from 'react-router-dom';
import { cancelMovement } from '../../service/CancelMovementService';
import usePlayMovementLogic from '../../hooks/usePlayMovementLogic';

// Mock useParams
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

// Mock cancelMovement
vi.mock('../../service/CancelMovementService', () => ({
  cancelMovement: vi.fn(),
}));

// Mock usePlayMovementLogic
vi.mock('../../hooks/usePlayMovementLogic', () => ({
  default: vi.fn(),
}));

describe('CancelMovementButton', () => {
  const mockResetAllCards = vi.fn();
  const mockCancelMovement = vi.fn();
  const mockCanCancelMovement = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useParams.mockReturnValue({ gameId: '1' });
    cancelMovement.mockImplementation(mockCancelMovement);
    usePlayMovementLogic.mockReturnValue({
      canCancelMovement: mockCanCancelMovement,
    });
  });

  const renderComponent = (canCancel = true) => {
    mockCanCancelMovement.mockReturnValue(canCancel);
    render(
      <PlayerContext.Provider value={{ playerID: '123' }}>
        <PlayCardLogicContext.Provider value={{ resetAllCards: mockResetAllCards }}>
          <CancelMovementButton />
        </PlayCardLogicContext.Provider>
      </PlayerContext.Provider>
    );
  };

  it('should render the button when canCancelMovement is true', () => {
    renderComponent(true);
    expect(screen.getByText('Cancelar movimiento')).toBeInTheDocument();
  });

  it('should not render the button when canCancelMovement is false', () => {
    renderComponent(false);
    expect(screen.queryByText('Cancelar movimiento')).not.toBeInTheDocument();
  });

  it('should call resetAllCards and cancelMovement when the button is clicked', async () => {
    renderComponent(true);
    const button = screen.getByText('Cancelar movimiento');
    fireEvent.click(button);
    expect(mockResetAllCards).toHaveBeenCalled();
    expect(cancelMovement).toHaveBeenCalledWith(1, '123');
  });

  it('should handle errors in cancelMovement', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockCancelMovement.mockRejectedValue(new Error('Error cancelando movimiento'));
    renderComponent(true);
    const button = screen.getByText('Cancelar movimiento');
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockResetAllCards).toHaveBeenCalled();
      expect(cancelMovement).toHaveBeenCalledWith(1, '123');
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error cancelando movimiento:', expect.any(Error));
    });
    consoleErrorSpy.mockRestore();
  });
});