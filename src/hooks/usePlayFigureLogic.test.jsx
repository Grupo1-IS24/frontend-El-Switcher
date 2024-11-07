import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useContext } from 'react';
import usePlayFigureLogic from './usePlayFigureLogic';
import { PlayCardLogicContext } from '../contexts/PlayCardLogicProvider';
import usePlayerTurn from './usePlayerTurn';
import useFoundFigures from './useFoundFigures';
import { isEqualColorCard } from '../utils/isEqualColorCard';
import { isFigureCardBlocked } from '../utils/figureCardUtils';

// Mock useContext to return custom values for PlayCardLogicContext
vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: vi.fn(),
  };
});

vi.mock('./usePlayerTurn', () => ({
  default: vi.fn(),
}));

vi.mock('./useFoundFigures', () => ({
  default: vi.fn(),
}));

vi.mock('../utils/isEqualColorCard', () => ({
  isEqualColorCard: vi.fn(),
}));

vi.mock('../utils/figureCardUtils', () => ({
  isFigureCardBlocked: vi.fn(),
}));

describe('usePlayFigureLogic', () => {
  const mockPlayCardLogicContext = {
    selectedFigureCard: null,
    selectedFigureColorCards: [],
    setSelectedFigureCard: vi.fn(),
    setSelectedFigureColorCards: vi.fn(),
    resetMovementCards: vi.fn(),
    resetFigureCards: vi.fn(),
  };

  const mockUsePlayerTurn = {
    isCurrentPlayerTurn: vi.fn(),
  };

  const mockUseFoundFigures = {
    findFigureByColorCard: vi.fn(),
    isColorCardInAnyFigure: vi.fn(),
  };

  beforeEach(() => {
    useContext.mockImplementation((context) => {
      if (context === PlayCardLogicContext) {
        return mockPlayCardLogicContext;
      }
    });

    usePlayerTurn.mockReturnValue(mockUsePlayerTurn);
    useFoundFigures.mockReturnValue(mockUseFoundFigures);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should return true if the figure card is selected', () => {
    mockPlayCardLogicContext.selectedFigureCard = { figureCardId: 1 };
    const { result } = renderHook(() => usePlayFigureLogic());
    expect(result.current.isSelectedFigureCard({ figureCardId: 1 })).toBe(true);
  });

  it('should return false if the figure card is not selected', () => {
    mockPlayCardLogicContext.selectedFigureCard = { figureCardId: 1 };
    const { result } = renderHook(() => usePlayFigureLogic());
    expect(result.current.isSelectedFigureCard({ figureCardId: 2 })).toBe(
      false
    );
  });

  it('should return true if the player can select a figure card', () => {
    mockUsePlayerTurn.isCurrentPlayerTurn.mockReturnValue(true);
    isFigureCardBlocked.mockReturnValue(false);
    const { result } = renderHook(() => usePlayFigureLogic());
    expect(result.current.canSelectFigureCard()).toBe(true);
  });

  it('should return false if the player cannot select a figure card', () => {
    mockUsePlayerTurn.isCurrentPlayerTurn.mockReturnValue(false);
    const { result } = renderHook(() => usePlayFigureLogic());
    expect(result.current.canSelectFigureCard()).toBe(false);
  });

  it('should return true if the figure color card is selected', () => {
    mockPlayCardLogicContext.selectedFigureColorCards = [
      { row: 1, column: 1, color: 'red' },
    ];
    isEqualColorCard.mockReturnValue(true);
    const { result } = renderHook(() => usePlayFigureLogic());
    expect(
      result.current.isSelectedFigureColorCard({
        row: 1,
        column: 1,
        color: 'red',
      })
    ).toBe(true);
  });

  it('should return false if the figure color card is not selected', () => {
    mockPlayCardLogicContext.selectedFigureColorCards = [
      { row: 1, column: 1, color: 'red' },
    ];
    isEqualColorCard.mockReturnValue(false);
    const { result } = renderHook(() => usePlayFigureLogic());
    expect(
      result.current.isSelectedFigureColorCard({
        row: 2,
        column: 2,
        color: 'blue',
      })
    ).toBe(false);
  });

  it('should return true if the player can select a figure color card', () => {
    mockUsePlayerTurn.isCurrentPlayerTurn.mockReturnValue(true);
    mockPlayCardLogicContext.selectedFigureCard = { figureCardId: 1 };
    mockUseFoundFigures.isColorCardInAnyFigure.mockReturnValue(true);
    const { result } = renderHook(() => usePlayFigureLogic());
    expect(
      result.current.canSelectFigureColorCard({
        row: 1,
        column: 1,
        color: 'red',
      })
    ).toBe(true);
  });

  it('should return false if the player cannot select a figure color card', () => {
    mockUsePlayerTurn.isCurrentPlayerTurn.mockReturnValue(false);
    const { result } = renderHook(() => usePlayFigureLogic());
    expect(
      result.current.canSelectFigureColorCard({
        row: 1,
        column: 1,
        color: 'red',
      })
    ).toBe(false);
  });

  it('should return true if the player can play a figure', () => {
    mockUsePlayerTurn.isCurrentPlayerTurn.mockReturnValue(true);
    mockPlayCardLogicContext.selectedFigureCard = { figureCardId: 1 };
    mockPlayCardLogicContext.selectedFigureColorCards = [
      { row: 1, column: 1, color: 'red' },
    ];
    const { result } = renderHook(() => usePlayFigureLogic());
    expect(result.current.canPlayFigure()).toBe(true);
  });

  it('should return false if the player cannot play a figure', () => {
    mockUsePlayerTurn.isCurrentPlayerTurn.mockReturnValue(false);
    const { result } = renderHook(() => usePlayFigureLogic());
    expect(result.current.canPlayFigure()).toBe(false);
  });

  it('should select a figure card', () => {
    const figureCard = [{ figureCardId: 1 }];
    const { result } = renderHook(() => usePlayFigureLogic());

    act(() => {
      result.current.selectFigureCard(figureCard);
    });

    expect(mockPlayCardLogicContext.setSelectedFigureCard).toHaveBeenCalledWith(
      figureCard
    );
    expect(
      mockPlayCardLogicContext.setSelectedFigureColorCards
    ).toHaveBeenCalledWith([]);
    expect(mockPlayCardLogicContext.resetMovementCards).toHaveBeenCalled();
  });

  it('should deselect a figure card', () => {
    const figureCard = { figureCardId: 1 };
    mockPlayCardLogicContext.selectedFigureCard = figureCard;
    const { result } = renderHook(() => usePlayFigureLogic());

    act(() => {
      result.current.selectFigureCard(figureCard);
    });

    expect(mockPlayCardLogicContext.setSelectedFigureCard).toHaveBeenCalledWith(
      null
    );
    expect(
      mockPlayCardLogicContext.setSelectedFigureColorCards
    ).toHaveBeenCalledWith([]);
    expect(mockPlayCardLogicContext.resetMovementCards).toHaveBeenCalled();
  });

  it('should select a figure color card', () => {
    const colorCard = { row: 1, column: 1, color: 'red' };
    const figureColorCards = [colorCard];
    mockUseFoundFigures.findFigureByColorCard.mockReturnValue(figureColorCards);
    const { result } = renderHook(() => usePlayFigureLogic());

    act(() => {
      result.current.selectFigureColorCard(colorCard);
    });

    expect(
      mockPlayCardLogicContext.setSelectedFigureColorCards
    ).toHaveBeenCalledWith(figureColorCards);
  });

  it('should deselect a figure color card', () => {
    const colorCard = { row: 1, column: 1, color: 'red' };
    mockPlayCardLogicContext.selectedFigureColorCards = [colorCard];
    isEqualColorCard.mockReturnValue(true);
    const { result } = renderHook(() => usePlayFigureLogic());

    act(() => {
      result.current.selectFigureColorCard(colorCard);
    });

    expect(
      mockPlayCardLogicContext.setSelectedFigureColorCards
    ).toHaveBeenCalledWith([]);
  });
});
