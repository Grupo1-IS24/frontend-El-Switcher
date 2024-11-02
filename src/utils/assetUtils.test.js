import { describe, it, expect } from 'vitest';
import { getBlockedCardImagePath } from './assetUtils';
import {
  BLOCKED_CARD_IMAGE_PREFIX,
  IMAGE_FILE_EXTENSION,
} from '../constants/assetConstants';

describe('assetUtils', () => {
  it('should getBlockedCardImagePath return the correct image path for a valid color', () => {
    const blockedColor = 'red';
    const expectedPath = `${BLOCKED_CARD_IMAGE_PREFIX}${blockedColor.toLowerCase()}${IMAGE_FILE_EXTENSION}`;
    expect(getBlockedCardImagePath(blockedColor)).toBe(expectedPath);
  });

  it('should getBlockedCardImagePath return the correct image path for a color with mixed case', () => {
    const blockedColor = 'GReeN';
    const expectedPath = `${BLOCKED_CARD_IMAGE_PREFIX}green${IMAGE_FILE_EXTENSION}`;
    expect(getBlockedCardImagePath(blockedColor)).toBe(expectedPath);
  });

  it('should getBlockedCardImagePath return an empty string for an empty string input', () => {
    expect(getBlockedCardImagePath('')).toBe('');
  });

  it('should getBlockedCardImagePath return an empty string for a non-string input (null)', () => {
    expect(getBlockedCardImagePath(null)).toBe('');
  });

  it('should getBlockedCardImagePath return an empty string for a non-string input (undefined)', () => {
    expect(getBlockedCardImagePath(undefined)).toBe('');
  });

  it('should getBlockedCardImagePath return an empty string for a non-string input (number)', () => {
    expect(getBlockedCardImagePath(123)).toBe('');
  });

  it('should getBlockedCardImagePath return an empty string for a non-string input (object)', () => {
    expect(getBlockedCardImagePath({})).toBe('');
  });

  it('should getBlockedCardImagePath return an empty string for an invalid color', () => {
    const blockedColor = 'purple';
    expect(getBlockedCardImagePath(blockedColor)).toBe('');
  });
});
