import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import OpponentFigureCardHand from './OpponentFigureCardHand';
import useFigureCards from '../../hooks/useFigureCards';

// Mock useFigureCards
vi.mock('../../hooks/useFigureCards', () => ({
  default: vi.fn(),
}));

describe('OpponentFigureCardHand', () => {
  const mockGetFigureCardsByPlayerId = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useFigureCards.mockReturnValue({
      getFigureCardsByPlayerId: mockGetFigureCardsByPlayerId,
    });
  });

  const renderComponent = (playerId) => {
    render(<OpponentFigureCardHand playerId={playerId} />);
  };

  it('should render the component correctly', () => {
    mockGetFigureCardsByPlayerId.mockReturnValue([]);
    renderComponent('player1');
    expect(screen.queryByRole('img')).toBeNull();
  });

  it('should render the correct number of FigureCard components', () => {
    const figureCards = [
      { figureType: 1, difficulty: 'easy' },
      { figureType: 2, difficulty: 'hard' },
    ];
    mockGetFigureCardsByPlayerId.mockReturnValue(figureCards);
    renderComponent('player1');
    expect(screen.getAllByRole('img').length).toBe(2);
  });

  it('should pass the correct props to FigureCard components', () => {
    const figureCards = [
      { figureType: 1, difficulty: 'easy' },
      { figureType: 2, difficulty: 'hard' },
    ];
    mockGetFigureCardsByPlayerId.mockReturnValue(figureCards);
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
});
