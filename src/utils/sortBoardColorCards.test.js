import { describe, it, expect } from 'vitest';
import { sortBoardColorCards } from './sortBoardColorCards';

describe('sortBoardColorCards', () => {
  it('should sort color cards by row and column', () => {
    const board = [
      { row: 2, column: 3 },
      { row: 1, column: 2 },
      { row: 1, column: 1 },
      { row: 2, column: 1 },
    ];

    const sortedBoard = sortBoardColorCards(board);

    expect(sortedBoard).toEqual([
      { row: 1, column: 1 },
      { row: 1, column: 2 },
      { row: 2, column: 1 },
      { row: 2, column: 3 },
    ]);
  });

  it('should sort color cards with the same row by column', () => {
    const board = [
      { row: 1, column: 3 },
      { row: 1, column: 1 },
      { row: 1, column: 2 },
    ];

    const sortedBoard = sortBoardColorCards(board);

    expect(sortedBoard).toEqual([
      { row: 1, column: 1 },
      { row: 1, column: 2 },
      { row: 1, column: 3 },
    ]);
  });

  it('should sort color cards with different rows by row', () => {
    const board = [
      { row: 3, column: 1 },
      { row: 1, column: 1 },
      { row: 2, column: 1 },
    ];

    const sortedBoard = sortBoardColorCards(board);

    expect(sortedBoard).toEqual([
      { row: 1, column: 1 },
      { row: 2, column: 1 },
      { row: 3, column: 1 },
    ]);
  });
});
