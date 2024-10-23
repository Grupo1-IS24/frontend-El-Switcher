import { describe, it, expect } from 'vitest';
import { sortListOfPlayers } from './sortListOfPlayers';

describe('sortListOfPlayers', () => {
  const players = [
    { playerId: 1, name: 'Player 1' },
    { playerId: 2, name: 'Player 2' },
    { playerId: 3, name: 'Player 3' },
  ];

  it('should place the actual player first', () => {
    const sortedPlayers = sortListOfPlayers(players, 2);

    expect(sortedPlayers[0].playerId).toBe(2);
  });

  it('should place other players after the actual player', () => {
    const sortedPlayers = sortListOfPlayers(players, 2);

    expect(sortedPlayers.slice(1)).toEqual([
      { playerId: 1, name: 'Player 1' },
      { playerId: 3, name: 'Player 3' },
    ]);
  });

  it('should not modify the original list', () => {
    const originalPlayers = [...players];
    sortListOfPlayers(players, 2);

    expect(players).toEqual(originalPlayers);
  });
});
