import { renderHook, act, cleanup } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import FilterGameListProvider from '../contexts/FilterGameListProvider';
import useFilterGameList from './useFilterGameList';
import showToast from '../utils/toastUtil';

vi.mock('../utils/toastUtil', () => ({
  default: vi.fn(),
}));

describe('useFilterGameList', () => {
  const renderUseFilterGameListHook = () => {
    return renderHook(() => useFilterGameList(), {
      wrapper: FilterGameListProvider,
    });
  };

  const expectToastError = (message) => {
    expect(showToast).toHaveBeenCalledWith({
      type: 'error',
      message,
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  describe('Initial State', () => {
    it('should have initial state', () => {
      const { result } = renderUseFilterGameListHook();

      expect(result.current.searchGameName).toBe('');
      expect(result.current.searchMinPlayers).toBe('');
      expect(result.current.searchMaxPlayers).toBe('');
    });
  });

  describe('Updating Search Parameters', () => {
    it('should update the game name correctly', () => {
      const { result } = renderUseFilterGameListHook();

      act(() => {
        result.current.handleSearchGameName({
          target: { value: 'Juego Test' },
        });
      });

      expect(result.current.searchGameName).toBe('Juego Test');
    });

    it('should update the minimum players correctly', () => {
      const { result } = renderUseFilterGameListHook();

      act(() => {
        result.current.handleSearchMinPlayers({ target: { value: '2' } });
      });

      expect(result.current.searchMinPlayers).toBe(2);
    });

    it('should update the maximum players correctly', () => {
      const { result } = renderUseFilterGameListHook();

      act(() => {
        result.current.handleSearchMaxPlayers({ target: { value: '3' } });
      });

      expect(result.current.searchMaxPlayers).toBe(3);
    });

    it('should display an error message when the minimum players are not between 1 and 4', () => {
      const { result } = renderUseFilterGameListHook();

      act(() => {
        result.current.handleSearchMinPlayers({ target: { value: '5' } });
      });

      expectToastError('El valor debe estar entre 1 y 4.');
      expect(result.current.searchMinPlayers).toBe('');

      act(() => {
        result.current.handleSearchMinPlayers({ target: { value: '0' } });
      });

      expectToastError('El valor debe estar entre 1 y 4.');
      expect(result.current.searchMinPlayers).toBe('');
    });

    it('should display an error message when the maximum players are not between 1 and 4', () => {
      const { result } = renderUseFilterGameListHook();

      act(() => {
        result.current.handleSearchMaxPlayers({ target: { value: '0' } });
      });

      expectToastError('El valor debe estar entre 1 y 4.');
      expect(result.current.searchMaxPlayers).toBe('');

      act(() => {
        result.current.handleSearchMaxPlayers({ target: { value: '5' } });
      });

      expectToastError('El valor debe estar entre 1 y 4.');
      expect(result.current.searchMaxPlayers).toBe('');
    });

    it('should set the minimum players to an empty string when the value is not a number', () => {
      const { result } = renderUseFilterGameListHook();

      act(() => {
        result.current.handleSearchMinPlayers({ target: { value: 'abc' } });
      });

      expect(result.current.searchMinPlayers).toBe('');
    });

    it('should set the maximum players to an empty string when the value is not a number', () => {
      const { result } = renderUseFilterGameListHook();

      act(() => {
        result.current.handleSearchMaxPlayers({ target: { value: 'def' } });
      });

      expect(result.current.searchMaxPlayers).toBe('');
    });
  });

  describe('Filtering Game List', () => {
    it('should not filter the game list when no search parameters are set', () => {
      const { result } = renderUseFilterGameListHook();

      const gameList = [
        { gameName: 'Juego A', connectedPlayers: 3 },
        { gameName: 'Juego B', connectedPlayers: 2 },
        { gameName: 'Juego C', connectedPlayers: 4 },
      ];

      const filteredList = result.current.filterGameList(gameList);

      expect(filteredList.length).toBe(3);

      gameList.forEach(({ gameName, connectedPlayers }, index) => {
        expect(filteredList[index].gameName).toBe(gameName);
        expect(filteredList[index].connectedPlayers).toBe(connectedPlayers);
      });
    });

    it('should filter the game list by game name correctly', () => {
      const { result } = renderUseFilterGameListHook();

      const gameList = [
        { gameName: 'Juego A', connectedPlayers: 3 },
        { gameName: 'Juego B', connectedPlayers: 2 },
        { gameName: 'Juego C', connectedPlayers: 4 },
      ];

      act(() => {
        result.current.handleSearchGameName({
          target: { value: 'Juego A' },
        });
      });

      const filteredList = result.current.filterGameList(gameList);

      expect(filteredList.length).toBe(1);
      expect(filteredList[0].gameName).toBe('Juego A');
    });

    it('should filter the game list matching first characters of the game name', () => {
      const { result } = renderUseFilterGameListHook();

      const gameList = [
        { gameName: 'Juego A', connectedPlayers: 3 },
        { gameName: 'Juego B', connectedPlayers: 2 },
        { gameName: 'Juego C', connectedPlayers: 4 },
        { gameName: 'Random D', connectedPlayers: 3 },
      ];

      act(() => {
        result.current.handleSearchGameName({
          target: { value: 'Juego' },
        });
      });

      const filteredList = result.current.filterGameList(gameList);

      expect(filteredList.length).toBe(3);
      expect(filteredList[0].gameName).toBe('Juego A');
      expect(filteredList[1].gameName).toBe('Juego B');
      expect(filteredList[2].gameName).toBe('Juego C');
    });

    it('should filter the game list by minimum players correctly', () => {
      const { result } = renderUseFilterGameListHook();

      const gameList = [
        { gameName: 'Juego A', connectedPlayers: 3 },
        { gameName: 'Juego B', connectedPlayers: 2 },
        { gameName: 'Juego C', connectedPlayers: 4 },
      ];

      act(() => {
        result.current.handleSearchMinPlayers({ target: { value: '3' } });
      });

      const filteredList = result.current.filterGameList(gameList);

      expect(filteredList.length).toBe(2);
      expect(filteredList[0].gameName).toBe('Juego A');
      expect(filteredList[1].gameName).toBe('Juego C');
    });

    it('should filter the game list by maximum players correctly', () => {
      const { result } = renderUseFilterGameListHook();

      const gameList = [
        { gameName: 'Juego A', connectedPlayers: 3 },
        { gameName: 'Juego B', connectedPlayers: 2 },
        { gameName: 'Juego C', connectedPlayers: 4 },
      ];

      act(() => {
        result.current.handleSearchMaxPlayers({ target: { value: '3' } });
      });

      const filteredList = result.current.filterGameList(gameList);

      expect(filteredList.length).toBe(2);
      expect(filteredList[0].gameName).toBe('Juego A');
      expect(filteredList[1].gameName).toBe('Juego B');
    });

    it('should filter the game list by game name and minimum players correctly', () => {
      const { result } = renderUseFilterGameListHook();

      const gameList = [
        { gameName: 'Juego A', connectedPlayers: 3 },
        { gameName: 'Juego B', connectedPlayers: 2 },
        { gameName: 'Juego C', connectedPlayers: 4 },
        { gameName: 'Random D', connectedPlayers: 3 },
      ];

      act(() => {
        result.current.handleSearchGameName({
          target: { value: 'Juego' },
        });

        result.current.handleSearchMinPlayers({ target: { value: '3' } });
      });

      const filteredList = result.current.filterGameList(gameList);

      expect(filteredList.length).toBe(2);
      expect(filteredList[0].gameName).toBe('Juego A');
      expect(filteredList[1].gameName).toBe('Juego C');
    });

    it('should filter the game list by game name and maximum players correctly', () => {
      const { result } = renderUseFilterGameListHook();

      const gameList = [
        { gameName: 'Juego A', connectedPlayers: 3 },
        { gameName: 'Juego B', connectedPlayers: 2 },
        { gameName: 'Juego C', connectedPlayers: 4 },
        { gameName: 'Random D', connectedPlayers: 3 },
      ];

      act(() => {
        result.current.handleSearchGameName({
          target: { value: 'Juego' },
        });

        result.current.handleSearchMaxPlayers({ target: { value: '3' } });
      });

      const filteredList = result.current.filterGameList(gameList);

      expect(filteredList.length).toBe(2);
      expect(filteredList[0].gameName).toBe('Juego A');
      expect(filteredList[1].gameName).toBe('Juego B');
    });

    it('should filter the game list by minimum and maximum players correctly', () => {
      const { result } = renderUseFilterGameListHook();

      const gameList = [
        { gameName: 'Juego A', connectedPlayers: 1 },
        { gameName: 'Juego B', connectedPlayers: 2 },
        { gameName: 'Juego C', connectedPlayers: 3 },
        { gameName: 'Random D', connectedPlayers: 4 },
      ];

      act(() => {
        result.current.handleSearchMinPlayers({ target: { value: '2' } });
        result.current.handleSearchMaxPlayers({ target: { value: '3' } });
      });

      const filteredList = result.current.filterGameList(gameList);

      expect(filteredList.length).toBe(2);
      expect(filteredList[0].gameName).toBe('Juego B');
      expect(filteredList[1].gameName).toBe('Juego C');
    });

    it('should filter the game list by game name, minimum and maximum players correctly', () => {
      const { result } = renderUseFilterGameListHook();

      const gameList = [
        { gameName: 'Juego A', connectedPlayers: 1 },
        { gameName: 'Juego B', connectedPlayers: 2 },
        { gameName: 'Random C', connectedPlayers: 3 },
        { gameName: 'Random D', connectedPlayers: 4 },
      ];

      act(() => {
        result.current.handleSearchGameName({
          target: { value: 'Juego' },
        });

        result.current.handleSearchMinPlayers({ target: { value: '2' } });
        result.current.handleSearchMaxPlayers({ target: { value: '3' } });
      });

      const filteredList = result.current.filterGameList(gameList);

      expect(filteredList.length).toBe(1);
      expect(filteredList[0].gameName).toBe('Juego B');
    });
  });

  describe('Resetting Filters', () => {
    it('should reset the search parameters correctly', () => {
      const { result } = renderUseFilterGameListHook();

      act(() => {
        result.current.handleSearchGameName({
          target: { value: 'Juego Test' },
        });

        result.current.handleSearchMinPlayers({ target: { value: '2' } });

        result.current.handleSearchMaxPlayers({ target: { value: '3' } });
      });

      act(() => {
        result.current.resetFilter();
      });

      expect(result.current.searchGameName).toBe('');
      expect(result.current.searchMinPlayers).toBe('');
      expect(result.current.searchMaxPlayers).toBe('');
    });
  });
});
