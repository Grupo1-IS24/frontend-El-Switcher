import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import OpponentFigureCardHand from './OpponentFigureCardHand';
import useFigureCards from '../../hooks/useFigureCards';
import usePlayFigureLogic from '../../hooks/usePlayFigureLogic';
import { isFigureCardBlocked } from '../../utils/figureCardUtils';

// Mock useFigureCards
vi.mock('../../hooks/useFigureCards', () => ({
  default: vi.fn(),
}));

// Mock usePlayFigureLogic
vi.mock('../../hooks/usePlayFigureLogic', () => ({
  default: vi.fn(),
}));

// Mock isFigureCardBlocked utility
vi.mock('../../utils/figureCardUtils', () => ({
  isFigureCardBlocked: vi.fn(),
}));

describe('OpponentFigureCardHand', () => {
  const mockGetFigureCardsByPlayerId = vi.fn();
  const mockHasBlockedFigureCardByPlayerId = vi.fn();
  const mockSelectFigureCard = vi.fn();
  const mockIsSelectedFigureCard = vi.fn();
  const mockCanSelectFigureCard = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useFigureCards.mockReturnValue({
      getFigureCardsByPlayerId: mockGetFigureCardsByPlayerId,
      hasBlockedFigureCardByPlayerId: mockHasBlockedFigureCardByPlayerId,
    });
    usePlayFigureLogic.mockReturnValue({
      selectFigureCard: mockSelectFigureCard,
      isSelectedFigureCard: mockIsSelectedFigureCard,
      canSelectFigureCard: mockCanSelectFigureCard,
    });
  });

  const renderComponent = (playerId) => {
    render(<OpponentFigureCardHand playerId={playerId} />);
  };

  it('should render the component correctly when there are no figure cards', () => {
    mockGetFigureCardsByPlayerId.mockReturnValue([]);
    renderComponent('player1');
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('should render the correct number of FigureCard components', () => {
    const figureCards = [
      { figureType: 1, difficulty: 'easy', isBlocked: false },
      { figureType: 2, difficulty: 'hard', isBlocked: false },
    ];
    mockGetFigureCardsByPlayerId.mockReturnValue(figureCards);
    renderComponent('player1');
    expect(screen.getAllByRole('img').length).toBe(2);
  });

  it('should pass the correct props to FigureCard components', () => {
    const figureCards = [
      { figureType: 1, difficulty: 'easy', isBlocked: false },
      { figureType: 2, difficulty: 'hard', isBlocked: false },
    ];
    mockGetFigureCardsByPlayerId.mockReturnValue(figureCards);
    mockIsSelectedFigureCard.mockImplementation(
      (card) => card.figureType === 1
    );
    mockCanSelectFigureCard.mockImplementation((card) => card.figureType !== 2);
    mockHasBlockedFigureCardByPlayerId.mockReturnValue(false);
    isFigureCardBlocked.mockImplementation((card) => card.isBlocked);

    renderComponent('player1');
    const figureCardElements = screen.getAllByRole('img');

    expect(figureCardElements[0]).toHaveAttribute(
      'src',
      '/src/assets/FigureCards/Easy/fig1.svg'
    );
    expect(figureCardElements[0]).toHaveAttribute('alt', 'Figura easy 1');
    expect(figureCardElements[1]).toHaveAttribute(
      'src',
      '/src/assets/FigureCards/Hard/fig2.svg'
    );
    expect(figureCardElements[1]).toHaveAttribute('alt', 'Figura hard 2');
  });

  it('should call selectFigureCard when FigureCard is clicked', () => {
    const figureCards = [
      { figureType: 1, difficulty: 'easy', isBlocked: false },
    ];
    mockGetFigureCardsByPlayerId.mockReturnValue(figureCards);
    mockCanSelectFigureCard.mockReturnValue(true);
    renderComponent('player1');

    const figureCardElement = screen.getByRole('img');
    fireEvent.click(figureCardElement);

    expect(mockSelectFigureCard).toHaveBeenCalledWith(figureCards[0]);
  });
});
