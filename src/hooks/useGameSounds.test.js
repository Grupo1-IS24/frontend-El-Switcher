import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useGameSounds } from './useGameSounds';
import useSound from 'use-sound';
import loser from '../assets/Sounds/loser.mp3';
import winner from '../assets/Sounds/winner.mp3';

vi.mock('use-sound');

describe('useGameSounds', () => {
  let playLoserMock, stopLoserMock, playWinnerMock, stopWinnerMock;

  beforeEach(() => {
    playLoserMock = vi.fn();
    stopLoserMock = vi.fn();
    playWinnerMock = vi.fn();
    stopWinnerMock = vi.fn();

    useSound.mockImplementation((sound) => {
      if (sound === loser) {
        return [playLoserMock, { stop: stopLoserMock }];
      }
      if (sound === winner) {
        return [playWinnerMock, { stop: stopWinnerMock }];
      }
      return [vi.fn(), { stop: vi.fn() }];
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should play winner sound when isWinner is true', () => {
    const { result } = renderHook(() => useGameSounds());

    act(() => {
      result.current.playSound(true);
    });

    expect(playWinnerMock).toHaveBeenCalled();
    expect(playLoserMock).not.toHaveBeenCalled();
  });

  it('should play loser sound when isWinner is false', () => {
    const { result } = renderHook(() => useGameSounds());

    act(() => {
      result.current.playSound(false);
    });

    expect(playLoserMock).toHaveBeenCalled();
    expect(playWinnerMock).not.toHaveBeenCalled();
  });

  it('should stop winner sound when isWinner is true', () => {
    const { result } = renderHook(() => useGameSounds());

    act(() => {
      result.current.stopSound(true);
    });

    expect(stopWinnerMock).toHaveBeenCalled();
    expect(stopLoserMock).not.toHaveBeenCalled();
  });

  it('should stop loser sound when isWinner is false', () => {
    const { result } = renderHook(() => useGameSounds());

    act(() => {
      result.current.stopSound(false);
    });

    expect(stopLoserMock).toHaveBeenCalled();
    expect(stopWinnerMock).not.toHaveBeenCalled();
  });
});
