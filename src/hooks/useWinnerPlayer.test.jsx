import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { GameContext } from '../contexts/GameProvider';
import { PlayerContext } from '../contexts/PlayerProvider';
import useWinnerPlayer from './useWinnerPlayer';

describe('useWinnerPlayer', () => {
  const renderUseWinnerPlayer = (gameContextValue, playerContextValue) => {
    return renderHook(() => useWinnerPlayer(), {
      wrapper: ({ children }) => (
        <GameContext.Provider value={gameContextValue}>
          <PlayerContext.Provider value={playerContextValue}>
            {children}
          </PlayerContext.Provider>
        </GameContext.Provider>
      ),
    }).result.current;
  };

  it('should return thereIsWinner as false when there is no winner', () => {
    const { thereIsWinner, isCurrentPlayerWinner, winnerName } =
      renderUseWinnerPlayer({ winnerInfo: null }, { playerID: 123 });

    expect(thereIsWinner).toBe(false);
    expect(isCurrentPlayerWinner).toBe(false);
    expect(winnerName).toBe('');
  });

  it('should return isCurrentPlayerWinner as true when the current player is the winner', () => {
    const { thereIsWinner, isCurrentPlayerWinner, winnerName } =
      renderUseWinnerPlayer(
        { winnerInfo: { idWinner: 123, nameWinner: 'Player 1' } },
        { playerID: 123 }
      );

    expect(thereIsWinner).toBe(true);
    expect(isCurrentPlayerWinner).toBe(true);
    expect(winnerName).toBe('Player 1');
  });

  it('should return isCurrentPlayerWinner as false when another player is the winner', () => {
    const { thereIsWinner, isCurrentPlayerWinner, winnerName } =
      renderUseWinnerPlayer(
        { winnerInfo: { idWinner: 456, nameWinner: 'Player 2' } },
        { playerID: 123 }
      );

    expect(thereIsWinner).toBe(true);
    expect(isCurrentPlayerWinner).toBe(false);
    expect(winnerName).toBe('Player 2');
  });
});
