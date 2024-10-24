import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import usePlayMovementLogic from './usePlayMovementLogic';
import usePlayedMovCards from './usePlayedMovCards';
import usePlayerTurn from './usePlayerTurn';
import { PlayCardLogicContext } from '../contexts/PlayCardLogicProvider';

vi.mock('./usePlayedMovCards');
vi.mock('./usePlayerTurn');
vi.mock('../utils/isEqualColorCard', () => ({
  isEqualColorCard: vi.fn(),
}));

describe('usePlayMovementLogic', () => {
  const mockIsCurrentPlayerTurn = vi.fn();
  const mockIsMovementCardPlayed = vi.fn();
  const mockHasAnyMovementCardPlayed = vi.fn();
  const mockAreAllMovementCardsPlayed = vi.fn();
  const mockSetSelectedMovementCard = vi.fn();
  const mockSetSelectedColorCards = vi.fn();
  const mockResetMovementCards = vi.fn();
  const mockResetFigureCards = vi.fn();
  const mockIsEqualColorCard = vi.fn();

  const mockPlayCardLogicContext = {
    selectedMovementCard: null,
    selectedColorCards: [],
    setSelectedMovementCard: mockSetSelectedMovementCard,
    setSelectedColorCards: mockSetSelectedColorCards,
    resetMovementCards: mockResetMovementCards,
    resetFigureCards: mockResetFigureCards,
  };

  beforeEach(() => {
    usePlayedMovCards.mockReturnValue({
      isMovementCardPlayed: mockIsMovementCardPlayed,
      hasAnyMovementCardPlayed: mockHasAnyMovementCardPlayed,
      areAllMovementCardsPlayed: mockAreAllMovementCardsPlayed,
    });

    usePlayerTurn.mockReturnValue({
      isCurrentPlayerTurn: mockIsCurrentPlayerTurn,
    });

    vi.spyOn(React, 'useContext').mockImplementation((context) => {
      if (context === PlayCardLogicContext) {
        return mockPlayCardLogicContext;
      }
      return null;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Movement Card Selection', () => {
    it('should determine if a movement card is selected', () => {
      const { result } = renderHook(() => usePlayMovementLogic(), {
        wrapper: ({ children }) => (
          <PlayCardLogicContext.Provider value={mockPlayCardLogicContext}>
            {children}
          </PlayCardLogicContext.Provider>
        ),
      });
      const movementCard = { movementcardId: 1 };
      expect(result.current.isSelectedMovementCard(movementCard)).toBe(false);
    });

    it('should select a movement card', () => {
      const { result } = renderHook(() => usePlayMovementLogic(), {
        wrapper: ({ children }) => (
          <PlayCardLogicContext.Provider value={mockPlayCardLogicContext}>
            {children}
          </PlayCardLogicContext.Provider>
        ),
      });
      const movementCard = { movementcardId: 1 };
      act(() => {
        result.current.selectMovementCard(movementCard);
      });
      expect(mockSetSelectedMovementCard).toHaveBeenCalledWith(movementCard);
      expect(mockSetSelectedColorCards).toHaveBeenCalledWith([]);
      expect(mockResetFigureCards).toHaveBeenCalled();
    });

    it('should deselect a movement card', () => {
      mockPlayCardLogicContext.selectedMovementCard = { movementcardId: 1 };
      const { result } = renderHook(() => usePlayMovementLogic(), {
        wrapper: ({ children }) => (
          <PlayCardLogicContext.Provider value={mockPlayCardLogicContext}>
            {children}
          </PlayCardLogicContext.Provider>
        ),
      });
      const movementCard = { movementcardId: 1 };
      act(() => {
        result.current.selectMovementCard(movementCard);
      });
      expect(mockSetSelectedMovementCard).toHaveBeenCalledWith(null);
      expect(mockSetSelectedColorCards).toHaveBeenCalledWith([]);
      expect(mockResetFigureCards).toHaveBeenCalled();
    });

    it('should determine if a movement card can be selected', () => {
      const { result } = renderHook(() => usePlayMovementLogic(), {
        wrapper: ({ children }) => (
          <PlayCardLogicContext.Provider value={mockPlayCardLogicContext}>
            {children}
          </PlayCardLogicContext.Provider>
        ),
      });
      const movementCard = { movementcardId: 1 };
      act(() => {
        mockIsCurrentPlayerTurn.mockReturnValue(true);
        mockIsMovementCardPlayed.mockReturnValue(false);
      });
      expect(result.current.canSelectMovementCard(movementCard)).toBe(true);
    });
  });

  describe('Color Card Selection', () => {
    it('should select a color card', () => {
      const { result } = renderHook(() => usePlayMovementLogic(), {
        wrapper: ({ children }) => (
          <PlayCardLogicContext.Provider value={mockPlayCardLogicContext}>
            {children}
          </PlayCardLogicContext.Provider>
        ),
      });
      const colorCard = { row: 1, column: 1, color: 'BLUE' };
      act(() => {
        result.current.selectColorCard(colorCard);
      });
      expect(mockSetSelectedColorCards).toHaveBeenCalledWith(expect.any(Function));
      act(() => {
        const updateFn = mockSetSelectedColorCards.mock.calls[0][0];
        expect(updateFn([])).toEqual([colorCard]);
      });
    });

    it('should determine if a color card is not selected', () => {
      const { result } = renderHook(() => usePlayMovementLogic(), {
        wrapper: ({ children }) => (
          <PlayCardLogicContext.Provider value={mockPlayCardLogicContext}>
            {children}
          </PlayCardLogicContext.Provider>
        ),
      });
      const colorCard = { row: 1, column: 1, color: 'BLUE' };
      mockIsEqualColorCard.mockReturnValue(false);
      expect(result.current.isSelectedColorCard(colorCard)).toBe(false);
    });

    it('should determine if a color card cannot be selected', () => {
      const { result } = renderHook(() => usePlayMovementLogic(), {
        wrapper: ({ children }) => (
          <PlayCardLogicContext.Provider value={mockPlayCardLogicContext}>
            {children}
          </PlayCardLogicContext.Provider>
        ),
      });
      const colorCard = { row: 1, column: 1, color: 'BLUE' };
      act(() => {
        mockIsCurrentPlayerTurn.mockReturnValue(false);
        mockAreAllMovementCardsPlayed.mockReturnValue(true);
      });
      expect(result.current.canSelectColorCard(colorCard)).toBe(false);
    });
  });

  describe('Movement Logic', () => {
    it('should determine if a movement can be canceled', () => {
      const { result } = renderHook(() => usePlayMovementLogic(), {
        wrapper: ({ children }) => (
          <PlayCardLogicContext.Provider value={mockPlayCardLogicContext}>
            {children}
          </PlayCardLogicContext.Provider>
        ),
      });
      act(() => {
        mockIsCurrentPlayerTurn.mockReturnValue(true);
        mockHasAnyMovementCardPlayed.mockReturnValue(true);
      });
      expect(result.current.canCancelMovement()).toBe(true);
    });

    it('should reset movement cards', () => {
      const { result } = renderHook(() => usePlayMovementLogic(), {
        wrapper: ({ children }) => (
          <PlayCardLogicContext.Provider value={mockPlayCardLogicContext}>
            {children}
          </PlayCardLogicContext.Provider>
        ),
      });
      act(() => {
        result.current.resetMovementCards();
      });
      expect(mockResetMovementCards).toHaveBeenCalled();
    });

    it('should determine if a movement can be played', () => {
      mockPlayCardLogicContext.selectedMovementCard = { movementcardId: 1 };
      mockPlayCardLogicContext.selectedColorCards = [{}, {}];
      const { result } = renderHook(() => usePlayMovementLogic(), {
        wrapper: ({ children }) => (
          <PlayCardLogicContext.Provider value={mockPlayCardLogicContext}>
            {children}
          </PlayCardLogicContext.Provider>
        ),
      });
      act(() => {
        mockIsCurrentPlayerTurn.mockReturnValue(true);
        mockAreAllMovementCardsPlayed.mockReturnValue(false);
      });

      expect(result.current.canPlayMovement()).toBe(true);
    });

    it('should determine if a movement cannot be played', () => {
      const { result } = renderHook(() => usePlayMovementLogic(), {
        wrapper: ({ children }) => (
          <PlayCardLogicContext.Provider value={mockPlayCardLogicContext}>
            {children}
          </PlayCardLogicContext.Provider>
        ),
      });
      act(() => {
        mockIsCurrentPlayerTurn.mockReturnValue(false);
        mockAreAllMovementCardsPlayed.mockReturnValue(true);
        mockPlayCardLogicContext.selectedMovementCard = null;
        mockPlayCardLogicContext.selectedColorCards = [{}];
      });
      expect(result.current.canPlayMovement()).toBe(false);
    });

    it('should determine if a movement cannot be canceled', () => {
      const { result } = renderHook(() => usePlayMovementLogic(), {
        wrapper: ({ children }) => (
          <PlayCardLogicContext.Provider value={mockPlayCardLogicContext}>
            {children}
          </PlayCardLogicContext.Provider>
        ),
      });
      act(() => {
        mockIsCurrentPlayerTurn.mockReturnValue(false);
        mockHasAnyMovementCardPlayed.mockReturnValue(false);
      });
      expect(result.current.canCancelMovement()).toBe(false);
    });

    it('should determine if a movement cannot be played when conditions are not met', () => {
      const { result } = renderHook(() => usePlayMovementLogic(), {
        wrapper: ({ children }) => (
          <PlayCardLogicContext.Provider value={mockPlayCardLogicContext}>
            {children}
          </PlayCardLogicContext.Provider>
        ),
      });
      act(() => {
        mockIsCurrentPlayerTurn.mockReturnValue(false);
        mockAreAllMovementCardsPlayed.mockReturnValue(true);
        mockPlayCardLogicContext.selectedMovementCard = null;
        mockPlayCardLogicContext.selectedColorCards = [{}];
      });
      expect(result.current.canPlayMovement()).toBe(false);
    });
  });
});