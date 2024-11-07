import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PlayFigureButton from './PlayFigureButton';
import { useParams } from 'react-router-dom';
import { playFigureCard } from '../../service/PlayFigureCardService';
import { PlayerContext } from '../../contexts/PlayerProvider';
import usePlayFigureLogic from '../../hooks/usePlayFigureLogic';
import showToast from '../../utils/toastUtil';
import useFigureCards from '../../hooks/useFigureCards';

// Mock useParams
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

// Mock playFigureCard
vi.mock('../../service/PlayFigureCardService', () => ({
  playFigureCard: vi.fn(),
}));

// Mock usePlayFigureLogic
vi.mock('../../hooks/usePlayFigureLogic', () => ({
  default: vi.fn(),
}));

// Mock useFigureCards
vi.mock('../../hooks/useFigureCards', () => ({
  default: vi.fn(),
}));

// Mock showToast
vi.mock('../../utils/toastUtil', () => ({
  default: vi.fn(),
}));

describe('PlayFigureButton', () => {
  const mockPlayFigureCard = vi.fn();
  const mockResetFigureCards = vi.fn();
  const mockCanPlayFigure = vi.fn();
  const mockIsCurrentPlayerOwnerFigureCard = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useParams.mockReturnValue({ gameId: '1' });
    playFigureCard.mockImplementation(mockPlayFigureCard);
    usePlayFigureLogic.mockReturnValue({
      canPlayFigure: mockCanPlayFigure,
      selectedFigureCard: { figureCardId: 1 },
      selectedFigureColorCards: [
        { color: 'red', row: 1, column: 1 },
        { color: 'blue', row: 2, column: 2 },
      ],
      resetFigureCards: mockResetFigureCards,
    });
    useFigureCards.mockReturnValue({
      isCurrentPlayerOwnerFigureCard: mockIsCurrentPlayerOwnerFigureCard,
    });
  });

  const renderComponent = () => {
    render(
      <PlayerContext.Provider value={{ playerID: 1 }}>
        <PlayFigureButton />
      </PlayerContext.Provider>
    );
  };

  it('should render the button with text "Jugar figura" when canPlayFigure is true and player owns the card', () => {
    mockCanPlayFigure.mockReturnValue(true);
    mockIsCurrentPlayerOwnerFigureCard.mockReturnValue(true);
    renderComponent();
    expect(screen.getByText('Jugar figura')).toBeInTheDocument();
  });

  it('should render the button with text "Bloquear figura" when canPlayFigure is true and player does not own the card', () => {
    mockCanPlayFigure.mockReturnValue(true);
    mockIsCurrentPlayerOwnerFigureCard.mockReturnValue(false);
    renderComponent();
    expect(screen.getByText('Bloquear figura')).toBeInTheDocument();
  });

  it('should not render the button when canPlayFigure is false', () => {
    mockCanPlayFigure.mockReturnValue(false);
    renderComponent();
    expect(screen.queryByText('Jugar figura')).not.toBeInTheDocument();
    expect(screen.queryByText('Bloquear figura')).not.toBeInTheDocument();
  });

  it('should call playFigureCard and resetFigureCards when the button is clicked', async () => {
    mockCanPlayFigure.mockReturnValue(true);
    mockPlayFigureCard.mockResolvedValue();
    mockIsCurrentPlayerOwnerFigureCard.mockReturnValue(true);
    renderComponent();
    const button = screen.getByText('Jugar figura');
    fireEvent.click(button);
    await waitFor(() => {
      expect(playFigureCard).toHaveBeenCalledWith('1', 1, 1, [
        { color: 'red', row: 1, column: 1 },
        { color: 'blue', row: 2, column: 2 },
      ]);
      expect(mockResetFigureCards).toHaveBeenCalled();
    });
  });

  it('should handle errors in playFigureCard', async () => {
    mockCanPlayFigure.mockReturnValue(true);
    const errorMessage = 'Error al jugar la carta';
    mockPlayFigureCard.mockRejectedValue(new Error(errorMessage));
    mockIsCurrentPlayerOwnerFigureCard.mockReturnValue(true);
    renderComponent();
    const button = screen.getByText('Jugar figura');
    fireEvent.click(button);
    await waitFor(() => {
      expect(playFigureCard).toHaveBeenCalledWith('1', 1, 1, [
        { color: 'red', row: 1, column: 1 },
        { color: 'blue', row: 2, column: 2 },
      ]);
      expect(showToast).toHaveBeenCalledWith({
        type: 'error',
        message: `Error jugando carta de figura: ${errorMessage}`,
        autoClose: 3000,
      });
    });
  });
});
