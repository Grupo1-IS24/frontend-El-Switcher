import { describe, it, expect, vi, afterEach } from 'vitest';
import { toast } from 'react-toastify';
import showToast from './toastUtil';

vi.mock('react-toastify', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    toast: Object.assign(
      vi.fn(),
      {
        success: vi.fn(),
        error: vi.fn(),
        info: vi.fn(),
        warn: vi.fn(),
        default: vi.fn(),
      }
    ),
    Flip: actual.Flip,
  };
});

describe('showToast', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const message = 'Test message';

  it('should call toast.success with correct parameters', () => {
    showToast({ type: 'success', message });
    expect(toast.success).toHaveBeenCalledWith(message, expect.any(Object));
  });

  it('should call toast.error with correct parameters', () => {
    showToast({ type: 'error', message });
    expect(toast.error).toHaveBeenCalledWith(message, expect.any(Object));
  });

  it('should call toast.info with correct parameters', () => {
    showToast({ type: 'info', message });
    expect(toast.info).toHaveBeenCalledWith(message, expect.any(Object));
  });

  it('should call toast.warn with correct parameters', () => {
    showToast({ type: 'warning', message });
    expect(toast.warn).toHaveBeenCalledWith(message, expect.any(Object));
  });

  it('should call toast.default with correct parameters for unknown type', () => {
    showToast({ type: 'unknown', message });
    expect(toast).toHaveBeenCalledWith(message, expect.any(Object));
  });

  it('should use default autoClose value if not provided', () => {
    showToast({ type: 'success', message });
    expect(toast.success).toHaveBeenCalledWith(
      message,
      expect.objectContaining({ autoClose: 5000 })
    );
  });

  it('should override default autoClose value if provided', () => {
    const autoClose = 3000;
    showToast({ type: 'success', message, autoClose });
    expect(toast.success).toHaveBeenCalledWith(
      message,
      expect.objectContaining({ autoClose })
    );
  });
});