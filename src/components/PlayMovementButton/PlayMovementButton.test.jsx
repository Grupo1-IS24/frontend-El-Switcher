import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PlayMovementButton from './PlayMovementButton';
import { useParams } from 'react-router-dom';
import { playMovementCard } from '../../service/PlayMovementCardService';
import { PlayerContext } from '../../contexts/PlayerProvider';
import usePlayMovementLogic from '../../hooks/usePlayMovementLogic';

// Mock useParams
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

// Mock playMovementCard
vi.mock('../../service/PlayMovementCardService', () => ({
  playMovementCard: vi.fn(),
}));

// Mock usePlayMovementLogic
vi.mock('../../hooks/usePlayMovementLogic', () => ({
  default: vi.fn(),
}));

describe('PlayMovementButton', () => {
  const mockPlayMovementCard = vi.fn();
  const mockResetMovementCards = vi.fn();
  const mockCanPlayMovement = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useParams.mockReturnValue({ gameId: '1' });
    playMovementCard.mockImplementation(mockPlayMovementCard);
    usePlayMovementLogic.mockReturnValue({
      canPlayMovement: mockCanPlayMovement,
      selectedMovementCard: { movementcardId: 1 },
      selectedColorCards: [{ squarePieceId: 1 }, { squarePieceId: 2 }],
      resetMovementCards: mockResetMovementCards,
    });
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  const renderComponent = () => {
    render(
      <PlayerContext.Provider value={{ playerID: 1 }}>
        <PlayMovementButton />
      </PlayerContext.Provider>
    );
  };

  it('should render the button with the correct text when canPlayMovement is true', () => {
    mockCanPlayMovement.mockReturnValue(true);
    renderComponent();
    expect(screen.getByText('Jugar movimiento')).toBeInTheDocument();
  });

  it('should not render the button when canPlayMovement is false', () => {
    mockCanPlayMovement.mockReturnValue(false);
    renderComponent();
    expect(screen.queryByText('Jugar movimiento')).not.toBeInTheDocument();
  });

  it('should call playMovementCard and resetMovementCards when the button is clicked', async () => {
    mockCanPlayMovement.mockReturnValue(true);
    mockPlayMovementCard.mockResolvedValue();
    renderComponent();
    const button = screen.getByText('Jugar movimiento');
    fireEvent.click(button);
    await waitFor(() => {
      expect(playMovementCard).toHaveBeenCalledWith('1', 1, 1, 1, 2);
      expect(mockResetMovementCards).toHaveBeenCalled();
    });
  });

  it('should handle errors in playMovementCard', async () => {
    mockCanPlayMovement.mockReturnValue(true);
    const errorMessage = 'Error al jugar la carta';
    mockPlayMovementCard.mockRejectedValue(new Error(errorMessage));
    renderComponent();
    const button = screen.getByText('Jugar movimiento');
    fireEvent.click(button);
    await waitFor(() => {
      expect(playMovementCard).toHaveBeenCalledWith('1', 1, 1, 1, 2);
      expect(window.alert).toHaveBeenCalledWith(
        `Error jugando carta de movimiento: ${errorMessage}`
      );
    });
  });
});
