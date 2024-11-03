import { renderHook, act } from '@testing-library/react';
import useChatBox from './useChatBox';
import { describe, expect, it } from 'vitest';

describe('useChatBox', () => {
  const setupHook = () => renderHook(() => useChatBox());

  it('should initialize with chat closed', () => {
    const { result } = setupHook();

    expect(result.current.isOpen).toBe(false);
  });

  it('should open the chat when toggleChat is called', () => {
    const { result } = setupHook();

    act(() => {
      result.current.toggleChat();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('should close the chat when toggleChat is called twice', () => {
    const { result } = setupHook();

    act(() => {
      result.current.toggleChat(); // Open chat
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggleChat(); // Close chat
    });

    expect(result.current.isOpen).toBe(false);
  });
});
