import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useSelectedGame from './useSelectedGame';

describe('useSelectedGame', () => {
  it('should initialize with null selectedGame', () => {
    const { result } = renderHook(() => useSelectedGame());
    expect(result.current.selectedGame).toBeNull();
  });

  it('should set selectedGame when selectGame is called', () => {
    const { result } = renderHook(() => useSelectedGame());
    const game = { gameId: 1, gameName: 'Test Game' };

    act(() => {
      result.current.selectGame(game);
    });

    expect(result.current.selectedGame).toEqual(game);
  });

  it('should clear selectedGame when clearSelectedGame is called', () => {
    const { result } = renderHook(() => useSelectedGame());
    const game = { gameId: 1, gameName: 'Test Game' };

    act(() => {
      result.current.selectGame(game);
    });

    expect(result.current.selectedGame).toEqual(game);

    act(() => {
      result.current.clearSelectedGame();
    });

    expect(result.current.selectedGame).toBeNull();
  });
});