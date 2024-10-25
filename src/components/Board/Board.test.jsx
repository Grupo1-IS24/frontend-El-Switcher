import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Board from './Board';
import usePlayMovementLogic from '../../hooks/usePlayMovementLogic';
import usePlayFigureLogic from '../../hooks/usePlayFigureLogic';
import useFoundFigures from '../../hooks/useFoundFigures';

// Mock hooks
vi.mock('../../hooks/usePlayMovementLogic', () => ({
  default: vi.fn(),
}));

vi.mock('../../hooks/usePlayFigureLogic', () => ({
  default: vi.fn(),
}));

vi.mock('../../hooks/useFoundFigures', () => ({
  default: vi.fn(),
}));

describe('Board', () => {
  const mockSelectColorCard = vi.fn();
  const mockCanSelectColorCard = vi.fn();
  const mockIsSelectedColorCard = vi.fn();
  const mockSelectFigureColorCard = vi.fn();
  const mockCanSelectFigureColorCard = vi.fn();
  const mockIsSelectedFigureColorCard = vi.fn();
  const mockIsColorCardInAnyFigure = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    usePlayMovementLogic.mockReturnValue({
      selectColorCard: mockSelectColorCard,
      canSelectColorCard: mockCanSelectColorCard,
      isSelectedColorCard: mockIsSelectedColorCard,
    });
    usePlayFigureLogic.mockReturnValue({
      selectFigureColorCard: mockSelectFigureColorCard,
      canSelectFigureColorCard: mockCanSelectFigureColorCard,
      isSelectedFigureColorCard: mockIsSelectedFigureColorCard,
    });
    useFoundFigures.mockReturnValue({
      isColorCardInAnyFigure: mockIsColorCardInAnyFigure,
    });
  });

  const renderComponent = (board) => render(<Board board={board} />);

  it('should render the Board component', () => {
    const board = [{ color: 'RED' }, { color: 'BLUE' }];
    renderComponent(board);
    const container = screen.getByTestId('board');
    expect(container).toBeInTheDocument();
  });

  it('should render the correct number of ColorCard components', () => {
    const board = [{ color: 'RED' }, { color: 'BLUE' }, { color: 'GREEN' }];
    renderComponent(board);
    const colorCards = screen.getAllByRole('button');
    expect(colorCards.length).toBe(board.length);
  });

  it('should call selectColorCard when a ColorCard is clicked and canSelectColorCard returns true', () => {
    const board = [{ color: 'RED' }];
    mockCanSelectColorCard.mockReturnValue(true);
    renderComponent(board);
    const colorCard = screen.getByRole('button');
    fireEvent.click(colorCard);
    expect(mockSelectColorCard).toHaveBeenCalledWith(board[0]);
  });

  it('should call selectFigureColorCard when a ColorCard is clicked and canSelectFigureColorCard returns true', () => {
    const board = [{ color: 'RED' }];
    mockCanSelectColorCard.mockReturnValue(false);
    mockCanSelectFigureColorCard.mockReturnValue(true);
    renderComponent(board);
    const colorCard = screen.getByRole('button');
    fireEvent.click(colorCard);
    expect(mockSelectFigureColorCard).toHaveBeenCalledWith(board[0]);
  });

  it('should not call any select function when a ColorCard is clicked and both canSelectColorCard and canSelectFigureColorCard return false', () => {
    const board = [{ color: 'RED' }];
    mockCanSelectColorCard.mockReturnValue(false);
    mockCanSelectFigureColorCard.mockReturnValue(false);
    renderComponent(board);
    const colorCard = screen.getByRole('button');
    fireEvent.click(colorCard);
    expect(mockSelectColorCard).not.toHaveBeenCalled();
    expect(mockSelectFigureColorCard).not.toHaveBeenCalled();
  });

  it('should render ColorCard components with the correct props', () => {
    const board = [{ color: 'RED' }];
    mockCanSelectColorCard.mockReturnValue(true);
    mockIsSelectedColorCard.mockReturnValue(true);
    mockIsColorCardInAnyFigure.mockReturnValue(true);
    renderComponent(board);
    const colorCard = screen.getByRole('button');
    expect(colorCard).toHaveClass('bg-red-500');
    expect(colorCard).toHaveClass('animate-shriggle');
    expect(colorCard).toHaveClass('border-4');
  });
});