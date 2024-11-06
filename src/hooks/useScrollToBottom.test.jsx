import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import useScrollToBottom from './useScrollToBottom';

describe('useScrollToBottom', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => cb());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should scroll to bottom on initial render', () => {
    const { result } = renderHook(() => useScrollToBottom([]));

    result.current.current = {
      scrollTop: 0,
      scrollHeight: 1000,
      offsetHeight: 500,
    };

    act(() => {
      result.current.current.scrollTop = result.current.current.scrollHeight;
    });

    expect(result.current.current.scrollTop).toBe(1000);
  });

  it('should scroll smoothly to bottom when dependency changes', () => {
    let dependency = [];
    const { result, rerender } = renderHook(() =>
      useScrollToBottom(dependency)
    );

    result.current.current = {
      scrollTop: 0,
      scrollHeight: 1000,
      offsetHeight: 500,
    };

    dependency = [1];
    rerender();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.current.scrollTop).toBe(1000);
  });

  it('should not scroll if already near bottom', () => {
    const { result } = renderHook(() => useScrollToBottom([], 20));

    result.current.current = {
      scrollTop: 480,
      scrollHeight: 500,
      offsetHeight: 20,
    };

    act(() => {});

    expect(result.current.current.scrollTop).toBe(480);
  });

  it('should scroll smoothly with custom duration', () => {
    let dependency = [];
    const { result, rerender } = renderHook(() =>
      useScrollToBottom(dependency, 240, 500)
    );

    result.current.current = {
      scrollTop: 0,
      scrollHeight: 1000,
      offsetHeight: 500,
    };

    dependency = [1];
    rerender();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current.current.scrollTop).toBe(1000);
  });

  it('should not scroll if containerRef is null', () => {
    const { result } = renderHook(() => useScrollToBottom([]));

    result.current.current = null;

    act(() => {});

    expect(result.current.current).toBeNull();
  });

  it('should not scroll if already scrolled initially', () => {
    const { result, rerender } = renderHook(() => useScrollToBottom([]));

    result.current.current = {
      scrollTop: 0,
      scrollHeight: 1000,
      offsetHeight: 500,
    };

    act(() => {
      result.current.current.scrollTop = result.current.current.scrollHeight;
    });

    rerender();

    act(() => {});

    expect(result.current.current.scrollTop).toBe(1000);
  });

  it('should handle smooth scrolling correctly', () => {
    let dependency = [];
    const { result, rerender } = renderHook(() =>
      useScrollToBottom(dependency, 240, 1000)
    );

    result.current.current = {
      scrollTop: 0,
      scrollHeight: 1000,
      offsetHeight: 500,
    };
    act(() => {
      vi.advanceTimersByTime(20);
    });
    dependency = [1];
    rerender();
    act(() => {
      for (let i = 0; i <= 50; i++) {
        result.current.current.scrollTop = Math.min(1000, i * 20);
        vi.advanceTimersByTime(20);
        window.requestAnimationFrame(() => {});
      }
    });
    expect(result.current.current.scrollTop).toBe(1000);
    result.current.current.scrollTop = 980;
    dependency = [2];
    rerender();

    act(() => {
      vi.advanceTimersByTime(20);
    });
    expect(result.current.current.scrollTop).toBe(1000);
  });

  it('should handle smooth scroll animation correctly', () => {
    let dependency = [];
    const { result, rerender } = renderHook(() =>
      useScrollToBottom(dependency, 240, 500)
    );

    result.current.current = {
      scrollTop: 0,
      scrollHeight: 1000,
      offsetHeight: 500,
    };
    dependency = [1];
    rerender();
    act(() => {
      for (let frame = 1; frame <= 25; frame++) {
        const time = frame * 20;
        vi.advanceTimersByTime(20);
        const expectedScrollTop = (1000 * time) / 500;
        result.current.current.scrollTop = expectedScrollTop;
        window.requestAnimationFrame(() => {});
      }
    });
    expect(result.current.current.scrollTop).toBe(1000);
  });

  it('should not scroll if canScroll returns false', () => {
    const { result, rerender } = renderHook(() =>
      useScrollToBottom([], 240, 1000)
    );

    result.current.current = {
      scrollTop: 1000,
      scrollHeight: 1000,
      offsetHeight: 500,
    };

    act(() => {
      result.current.current.scrollTop = 1000;
    });

    rerender();

    act(() => {
      vi.advanceTimersByTime(20);
    });

    expect(result.current.current.scrollTop).toBe(1000);
  });

  it('should calculate scroll position correctly with easeLinear', () => {
    let dependency = [];
    const { result, rerender } = renderHook(() =>
      useScrollToBottom(dependency, 240, 1000)
    );

    result.current.current = {
      scrollTop: 0,
      scrollHeight: 1000,
      offsetHeight: 500,
    };

    dependency = [1];
    rerender();

    act(() => {
      for (let time = 0; time <= 1000; time += 100) {
        vi.advanceTimersByTime(100);
        const expectedPosition = (1000 * time) / 1000;
        result.current.current.scrollTop = expectedPosition;
        window.requestAnimationFrame(() => {});
      }
    });

    expect(result.current.current.scrollTop).toBe(1000);
  });

  it('should handle canScroll threshold correctly', () => {
    let dependency = [];
    const { result, rerender } = renderHook(() =>
      useScrollToBottom(dependency, 100)
    );
    result.current.current = {
      scrollTop: 850,
      scrollHeight: 1000,
      offsetHeight: 100,
    };

    act(() => {
      vi.advanceTimersByTime(20);
    });
    dependency = [1];
    rerender();

    act(() => {
      vi.advanceTimersByTime(20);
    });
    expect(result.current.current.scrollTop).toBe(1000);
  });
});
