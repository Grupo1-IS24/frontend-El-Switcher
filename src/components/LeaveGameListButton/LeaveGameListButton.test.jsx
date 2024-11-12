import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LeaveGameListButton from './LeaveGameListButton';
import useRouteNavigation from '../../hooks/useRouteNavigation';
import showToast from '../../utils/toastUtil';

vi.mock('../../hooks/useRouteNavigation');
vi.mock('../../utils/toastUtil');

describe('LeaveGameListButton', () => {
  const mockRedirectToHomePage = vi.fn();
  let consoleErrorSpy;

  beforeEach(() => {
    useRouteNavigation.mockReturnValue({
      redirectToHomePage: mockRedirectToHomePage,
    });
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.resetAllMocks();
    consoleErrorSpy.mockRestore();
  });

  it('should render the button with the correct text', () => {
    render(<LeaveGameListButton />);
    expect(screen.getByText('⭠')).toBeInTheDocument();
  });

  it('should call redirectToHomePage when the button is clicked', () => {
    render(<LeaveGameListButton />);
    fireEvent.click(screen.getByText('⭠'));
    expect(mockRedirectToHomePage).toHaveBeenCalledTimes(1);
  });

  it('should call showToast with correct parameters when an error occurs', async () => {
    mockRedirectToHomePage.mockImplementation(() => {
      throw new Error('Test error');
    });

    render(<LeaveGameListButton />);
    fireEvent.click(screen.getByText('⭠'));

    expect(showToast).toHaveBeenCalledWith({
      type: 'error',
      message: 'Error al abandonar el listado de partidas. Intente nuevamente.',
      autoClose: 3000,
    });
    expect(console.error).toHaveBeenCalledWith(
      'Error al abandonar el listado de partidas',
      expect.any(Error)
    );
  });
});
