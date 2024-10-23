import { describe, it, expect, beforeEach } from 'vitest';
import {
  getSessionStorageValue,
  setSessionStorageValue,
  removeSessionStorageValue,
} from './sessionStorageUtils';

describe('sessionStorageUtils', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  describe('getSessionStorageValue', () => {
    it('should return the stored value', () => {
      sessionStorage.setItem('key', JSON.stringify('value'));
      const result = getSessionStorageValue('key', 'default');
      expect(result).toBe('value');
    });

    it('should return the default value if key is not found', () => {
      const result = getSessionStorageValue('key', 'default');
      expect(result).toBe('default');
    });
  });

  describe('setSessionStorageValue', () => {
    it('should store the value', () => {
      setSessionStorageValue('key', 'value');
      const storedValue = sessionStorage.getItem('key');
      expect(storedValue).toBe(JSON.stringify('value'));
    });
  });

  describe('removeSessionStorageValue', () => {
    it('should remove the value', () => {
      sessionStorage.setItem('key', 'value');
      removeSessionStorageValue('key');
      const storedValue = sessionStorage.getItem('key');
      expect(storedValue).toBeNull();
    });
  });
});
