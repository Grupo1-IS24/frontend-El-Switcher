import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useContext } from 'react';
import usePlayMovementLogic from './usePlayMovementLogic';
import { PlayCardLogicContext } from '../contexts/PlayCardLogicProvider';
import usePlayerTurn from './usePlayerTurn';
import usePlayedMovCards from './usePlayedMovCards';
import { isEqualColorCard } from '../utils/isEqualColorCard';

// Mock all dependencies
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

vi.mock('./usePlayedMovCards', () => ({
  default: vi.fn(),
}));

vi.mock('../utils/isEqualColorCard', () => ({
  isEqualColorCard: vi.fn(),
}));

describe('usePlayMovementLogic', () => {
  const mockPlayCardLogicContext = {
    selectedMovementCard: null,
    selectedColorCards: [],
    setSelectedMovementCard: vi.fn(),
    setSelectedColorCards: vi.fn(),
    resetMovementCards: vi.fn(),
    resetFigureCards: vi.fn(),
  };

  const mockUsePlayerTurn = {
    isCurrentPlayerTurn: vi.fn(),
  };

  const mockUsePlayedMovCards = {
    isMovementCardPlayed: vi.fn(),
    hasAnyMovementCardPlayed: vi.fn(),
    areAllMovementCardsPlayed: vi.fn(),
  };

  beforeEach(() => {
    useContext.mockImplementation((context) => {
      if (context === PlayCardLogicContext) {
        return mockPlayCardLogicContext;
      }
    });

    usePlayerTurn.mockReturnValue(mockUsePlayerTurn);
    usePlayedMovCards.mockReturnValue(mockUsePlayedMovCards);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('isSelectedMovementCard', () => {
    it('should return true when movement card is selected', () => {
      const movementCard = { movementcardId: 1 };
      mockPlayCardLogicContext.selectedMovementCard = movementCard;
      const { result } = renderHook(() => usePlayMovementLogic());

      expect(result.current.isSelectedMovementCard(movementCard)).toBe(true);
    });

    it('should return false when movement card is not selected', () => {
      mockPlayCardLogicContext.selectedMovementCard = { movementcardId: 1 };
      const { result } = renderHook(() => usePlayMovementLogic());

      expect(result.current.isSelectedMovementCard({ movementcardId: 2 })).toBe(
        false
      );
    });
  });

  describe('canSelectMovementCard', () => {
    it('should return true when conditions are met', () => {
      mockUsePlayerTurn.isCurrentPlayerTurn.mockReturnValue(true);
      mockUsePlayedMovCards.isMovementCardPlayed.mockReturnValue(false);
      const { result } = renderHook(() => usePlayMovementLogic());

      expect(result.current.canSelectMovementCard({})).toBe(true);
    });

    it('should return false when not player turn', () => {
      mockUsePlayerTurn.isCurrentPlayerTurn.mockReturnValue(false);
      const { result } = renderHook(() => usePlayMovementLogic());

      expect(result.current.canSelectMovementCard({})).toBe(false);
    });
  });

  describe('selectMovementCard', () => {
    it('should deselect card if already selected', () => {
      const movementCard = { movementcardId: 1 };
      mockPlayCardLogicContext.selectedMovementCard = movementCard;
      const { result } = renderHook(() => usePlayMovementLogic());

      act(() => {
        result.current.selectMovementCard(movementCard);
      });

      expect(
        mockPlayCardLogicContext.setSelectedMovementCard
      ).toHaveBeenCalledWith(null);
      expect(
        mockPlayCardLogicContext.setSelectedColorCards
      ).toHaveBeenCalledWith([]);
      expect(mockPlayCardLogicContext.resetFigureCards).toHaveBeenCalled();
    });

    it('should select new card if none was selected', () => {
      const movementCard = { movementcardId: 1 };
      mockPlayCardLogicContext.selectedMovementCard = null;
      const { result } = renderHook(() => usePlayMovementLogic());

      act(() => {
        result.current.selectMovementCard(movementCard);
      });

      expect(
        mockPlayCardLogicContext.setSelectedMovementCard
      ).toHaveBeenCalledWith(movementCard);
      expect(
        mockPlayCardLogicContext.setSelectedColorCards
      ).toHaveBeenCalledWith([]);
      expect(mockPlayCardLogicContext.resetFigureCards).toHaveBeenCalled();
    });

    it('should select different card if another was selected', () => {
      const oldCard = { movementcardId: 1 };
      const newCard = { movementcardId: 2 };
      mockPlayCardLogicContext.selectedMovementCard = oldCard;
      const { result } = renderHook(() => usePlayMovementLogic());

      act(() => {
        result.current.selectMovementCard(newCard);
      });

      expect(
        mockPlayCardLogicContext.setSelectedMovementCard
      ).toHaveBeenCalledWith(newCard);
      expect(
        mockPlayCardLogicContext.setSelectedColorCards
      ).toHaveBeenCalledWith([]);
      expect(mockPlayCardLogicContext.resetFigureCards).toHaveBeenCalled();
    });
  });

  describe('isSelectedColorCard', () => {
    it('should return true when color card is selected', () => {
      const colorCard = { row: 1, column: 1, color: 'red' };
      mockPlayCardLogicContext.selectedColorCards = [colorCard];
      isEqualColorCard.mockReturnValue(true);
      const { result } = renderHook(() => usePlayMovementLogic());

      expect(result.current.isSelectedColorCard(colorCard)).toBe(true);
    });

    it('should return false when color card is not selected', () => {
      isEqualColorCard.mockReturnValue(false);
      const { result } = renderHook(() => usePlayMovementLogic());

      expect(
        result.current.isSelectedColorCard({ row: 1, column: 1, color: 'red' })
      ).toBe(false);
    });
  });

  describe('canSelectColorCard', () => {
    it('should return true when all conditions are met', () => {
      mockUsePlayerTurn.isCurrentPlayerTurn.mockReturnValue(true);
      mockUsePlayedMovCards.areAllMovementCardsPlayed.mockReturnValue(false);
      mockPlayCardLogicContext.selectedMovementCard = { movementcardId: 1 };
      mockPlayCardLogicContext.selectedColorCards = [{ color: 'red' }];
      const { result } = renderHook(() => usePlayMovementLogic());

      expect(result.current.canSelectColorCard({})).toBe(true);
    });

    it('should return false when not player turn', () => {
      mockUsePlayerTurn.isCurrentPlayerTurn.mockReturnValue(false);
      const { result } = renderHook(() => usePlayMovementLogic());

      expect(result.current.canSelectColorCard({})).toBe(false);
    });

    it('should return true when trying to select an already selected card even if two cards are selected', () => {
      const selectedCard = { row: 1, column: 1, color: 'red' };
      mockUsePlayerTurn.isCurrentPlayerTurn.mockReturnValue(true);
      mockUsePlayedMovCards.areAllMovementCardsPlayed.mockReturnValue(false);
      mockPlayCardLogicContext.selectedMovementCard = { movementcardId: 1 };
      mockPlayCardLogicContext.selectedColorCards = [
        selectedCard,
        { row: 2, column: 2, color: 'blue' },
      ];
      isEqualColorCard.mockReturnValue(true);

      const { result } = renderHook(() => usePlayMovementLogic());

      expect(result.current.canSelectColorCard(selectedCard)).toBe(true);
    });
  });

  describe('selectColorCard', () => {
    it('should deselect card if already selected', () => {
      const colorCard = { row: 1, column: 1, color: 'red' };
      mockPlayCardLogicContext.selectedColorCards = [colorCard];
      isEqualColorCard.mockReturnValue(true);
      const { result } = renderHook(() => usePlayMovementLogic());

      act(() => {
        result.current.selectColorCard(colorCard);
      });
      const updateFunction =
        mockPlayCardLogicContext.setSelectedColorCards.mock.calls[0][0];
      const newState = updateFunction([colorCard]);
      expect(newState).toEqual([]);
    });

    it('should select first card when none selected', () => {
      const colorCard = { row: 1, column: 1, color: 'red' };
      mockPlayCardLogicContext.selectedColorCards = [];
      isEqualColorCard.mockReturnValue(false);
      const { result } = renderHook(() => usePlayMovementLogic());

      act(() => {
        result.current.selectColorCard(colorCard);
      });

      expect(mockPlayCardLogicContext.setSelectedColorCards).toHaveBeenCalled();
      const setterCallback =
        mockPlayCardLogicContext.setSelectedColorCards.mock.calls[0][0];
      const newState = setterCallback([]);
      expect(newState).toEqual([colorCard]);
    });

    it('should select second card when one is selected', () => {
      const colorCard1 = { row: 1, column: 1, color: 'red' };
      const colorCard2 = { row: 2, column: 2, color: 'blue' };
      mockPlayCardLogicContext.selectedColorCards = [colorCard1];
      isEqualColorCard.mockReturnValue(false);
      const { result } = renderHook(() => usePlayMovementLogic());

      act(() => {
        result.current.selectColorCard(colorCard2);
      });

      expect(mockPlayCardLogicContext.setSelectedColorCards).toHaveBeenCalled();
      const setterCallback =
        mockPlayCardLogicContext.setSelectedColorCards.mock.calls[0][0];
      const newState = setterCallback([colorCard1]);
      expect(newState).toEqual([colorCard1, colorCard2]);
    });

    it('should not select card when two cards are already selected', () => {
      const colorCard1 = { row: 1, column: 1, color: 'red' };
      const colorCard2 = { row: 2, column: 2, color: 'blue' };
      const colorCard3 = { row: 3, column: 3, color: 'green' };
      mockPlayCardLogicContext.selectedColorCards = [colorCard1, colorCard2];
      isEqualColorCard.mockReturnValue(false);
      const { result } = renderHook(() => usePlayMovementLogic());

      act(() => {
        result.current.selectColorCard(colorCard3);
      });

      expect(
        mockPlayCardLogicContext.setSelectedColorCards
      ).not.toHaveBeenCalled();
    });
  });

  describe('canPlayMovement', () => {
    it('should return true when all conditions are met', () => {
      mockUsePlayerTurn.isCurrentPlayerTurn.mockReturnValue(true);
      mockUsePlayedMovCards.areAllMovementCardsPlayed.mockReturnValue(false);
      mockPlayCardLogicContext.selectedMovementCard = { movementcardId: 1 };
      mockPlayCardLogicContext.selectedColorCards = [
        { color: 'red' },
        { color: 'blue' },
      ];
      const { result } = renderHook(() => usePlayMovementLogic());

      expect(result.current.canPlayMovement()).toBe(true);
    });

    it('should return false when conditions are not met', () => {
      mockUsePlayerTurn.isCurrentPlayerTurn.mockReturnValue(false);
      const { result } = renderHook(() => usePlayMovementLogic());

      expect(result.current.canPlayMovement()).toBe(false);
    });
  });

  describe('canCancelMovement', () => {
    it('should return true when conditions are met', () => {
      mockUsePlayerTurn.isCurrentPlayerTurn.mockReturnValue(true);
      mockUsePlayedMovCards.hasAnyMovementCardPlayed.mockReturnValue(true);
      const { result } = renderHook(() => usePlayMovementLogic());

      expect(result.current.canCancelMovement()).toBe(true);
    });

    it('should return false when conditions are not met', () => {
      mockUsePlayerTurn.isCurrentPlayerTurn.mockReturnValue(false);
      const { result } = renderHook(() => usePlayMovementLogic());

      expect(result.current.canCancelMovement()).toBe(false);
    });
  });
});
