import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FigureCardHand from './FigureCardHand';
import useFigureCards from '../../hooks/useFigureCards';
import usePlayFigureLogic from '../../hooks/usePlayFigureLogic';

// Mock de los hooks
vi.mock('../../hooks/useFigureCards');
vi.mock('../../hooks/usePlayFigureLogic');

describe('FigureCardHand', () => {
  const mockFigureCards = [
    { figureType: 1, difficulty: 'easy', figureCardId: 1 },
    { figureType: 2, difficulty: 'hard', figureCardId: 2 },
  ];

  const mockUseFigureCards = {
    currentPlayerFigureCards: mockFigureCards,
  };

  const mockUsePlayFigureLogic = {
    selectFigureCard: vi.fn(),
    isSelectedFigureCard: vi.fn().mockReturnValue(false),
    canSelectFigureCard: vi.fn().mockReturnValue(true),
  };

  beforeEach(() => {
    useFigureCards.mockReturnValue(mockUseFigureCards);
    usePlayFigureLogic.mockReturnValue(mockUsePlayFigureLogic);
  });

  it('should render the FigureCardHand component', () => {
    render(<FigureCardHand />);
    const figureCards = screen.getAllByRole('button');
    expect(figureCards).toHaveLength(mockFigureCards.length);
  });

  it('should pass the correct props to FigureCard', () => {
    render(<FigureCardHand />);
    const figureCards = screen.getAllByRole('button');

    figureCards.forEach((figureCard) => {
      expect(figureCard).not.toHaveAttribute('disabled');
      expect(figureCard).toHaveClass('transition-transform duration-300');
    });
  });

  it('should call selectFigureCard when a FigureCard is clicked', () => {
    render(<FigureCardHand />);
    const figureCards = screen.getAllByRole('button');

    fireEvent.click(figureCards[0]);
    expect(mockUsePlayFigureLogic.selectFigureCard).toHaveBeenCalledWith(
      mockFigureCards[0]
    );
  });

  it('should disable FigureCard if canSelectFigureCard returns false', () => {
    mockUsePlayFigureLogic.canSelectFigureCard.mockReturnValueOnce(false);
    render(<FigureCardHand />);
    const figureCards = screen.getAllByRole('button');

    expect(figureCards[0]).toHaveAttribute('disabled');
  });

  it('should mark FigureCard as selected if isSelectedFigureCard returns true', () => {
    mockUsePlayFigureLogic.isSelectedFigureCard.mockReturnValueOnce(true);
    render(<FigureCardHand />);
    const figureCards = screen.getAllByRole('button');

    expect(figureCards[0]).toHaveClass('translate-y-[-20px]');
  });
});
