import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useNavigate } from 'react-router-dom';
import useRouteNavigation from './useRouteNavigation';

// Mock useNavigate from react-router-dom
vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('useRouteNavigation', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  it('should navigate to home page', () => {
    const { result } = renderHook(() => useRouteNavigation());
    result.current.redirectToHomePage();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('should navigate to game list page', () => {
    const { result } = renderHook(() => useRouteNavigation());
    result.current.redirectToGameListPage();
    expect(mockNavigate).toHaveBeenCalledWith('/game-list');
  });

  it('should navigate to lobby page with gameId', () => {
    const { result } = renderHook(() => useRouteNavigation());
    const gameId = '123';
    result.current.redirectToLobbyPage(gameId);
    expect(mockNavigate).toHaveBeenCalledWith(`/lobby/${gameId}`);
  });

  it('should navigate to game page with gameId', () => {
    const { result } = renderHook(() => useRouteNavigation());
    const gameId = '123';
    result.current.redirectToGamePage(gameId);
    expect(mockNavigate).toHaveBeenCalledWith(`/game/${gameId}`);
  });

  it('should navigate to not found page', () => {
    const { result } = renderHook(() => useRouteNavigation());
    result.current.redirectToNotFoundPage();
    expect(mockNavigate).toHaveBeenCalledWith('*');
  });
});
