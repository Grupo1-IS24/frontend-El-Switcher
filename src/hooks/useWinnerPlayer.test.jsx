import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GameContext } from '../contexts/GameProvider';
import { PlayerContext } from '../contexts/PlayerProvider';
import useWinnerPlayer from './useWinnerPlayer';

describe('useWinnerPlayer', () => {
  const renderWithContexts = (gameContextValue, playerContextValue) =>
    renderHook(() => useWinnerPlayer(), {
      wrapper: ({ children }) => (
        <GameContext.Provider value={gameContextValue}>
          <PlayerContext.Provider value={playerContextValue}>
            {children}
          </PlayerContext.Provider>
        </GameContext.Provider>
      ),
    }).result.current;

  const testCases = [
    {
      description: 'returns thereIsWinner as false when no winner exists',
      gameValue: { winnerInfo: null },
      playerValue: { playerID: 123 },
      expected: {
        thereIsWinner: false,
        isCurrentPlayerWinner: false,
        winnerName: '',
      },
    },
    {
      description:
        'returns isCurrentPlayerWinner as true when the current player is the winner',
      gameValue: { winnerInfo: { idWinner: 123, nameWinner: 'Player 1' } },
      playerValue: { playerID: 123 },
      expected: {
        thereIsWinner: true,
        isCurrentPlayerWinner: true,
        winnerName: 'Player 1',
      },
    },
    {
      description:
        'returns isCurrentPlayerWinner as false when another player is the winner',
      gameValue: { winnerInfo: { idWinner: 456, nameWinner: 'Player 2' } },
      playerValue: { playerID: 123 },
      expected: {
        thereIsWinner: true,
        isCurrentPlayerWinner: false,
        winnerName: 'Player 2',
      },
    },
  ];

  testCases.forEach(({ description, gameValue, playerValue, expected }) => {
    it(description, () => {
      const result = renderWithContexts(gameValue, playerValue);
      expect(result).toEqual(expected);
    });
  });
});
