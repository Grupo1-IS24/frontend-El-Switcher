import { describe, it, expect } from 'vitest';
import { isEqualColorCard } from './isEqualColorCard';

describe('isEqualColorCard', () => {
  it('should return true for equal color cards', () => {
    const card1 = { row: 1, column: 1, color: 'red' };
    const card2 = { row: 1, column: 1, color: 'red' };

    expect(isEqualColorCard(card1, card2)).toBe(true);
  });

  it('should return false for color cards with different rows', () => {
    const card1 = { row: 1, column: 1, color: 'red' };
    const card2 = { row: 2, column: 1, color: 'red' };

    expect(isEqualColorCard(card1, card2)).toBe(false);
  });

  it('should return false for color cards with different columns', () => {
    const card1 = { row: 1, column: 1, color: 'red' };
    const card2 = { row: 1, column: 2, color: 'red' };

    expect(isEqualColorCard(card1, card2)).toBe(false);
  });

  it('should return false for color cards with different colors', () => {
    const card1 = { row: 1, column: 1, color: 'red' };
    const card2 = { row: 1, column: 1, color: 'blue' };

    expect(isEqualColorCard(card1, card2)).toBe(false);
  });
});
