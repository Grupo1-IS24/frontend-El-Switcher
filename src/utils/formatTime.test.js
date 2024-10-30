import { describe, it, expect } from 'vitest';
import formatTime from './formatTime';

describe('formatTime', () => {
  it('should format 0 seconds as "00:00"', () => {
    expect(formatTime(0)).toBe('00:00');
  });

  it('should format 59 seconds as "00:59"', () => {
    expect(formatTime(59)).toBe('00:59');
  });

  it('should format 60 seconds as "01:00"', () => {
    expect(formatTime(60)).toBe('01:00');
  });

  it('should format 3599 seconds as "59:59"', () => {
    expect(formatTime(3599)).toBe('59:59');
  });

  it('should format 3600 seconds as "60:00"', () => {
    expect(formatTime(3600)).toBe('60:00');
  });

  it('should format 3661 seconds as "61:01"', () => {
    expect(formatTime(3661)).toBe('61:01');
  });

  it('should format 86399 seconds as "1439:59"', () => {
    expect(formatTime(86399)).toBe('1439:59');
  });

  it('should format 86400 seconds as "1440:00"', () => {
    expect(formatTime(86400)).toBe('1440:00');
  });
});
