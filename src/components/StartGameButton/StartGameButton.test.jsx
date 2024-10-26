import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import StartGameButton from './StartGameButton';
import { useParams } from 'react-router-dom';
import { startGame } from '../../service/StartGameService';
import useRouteNavigation from '../../hooks/useRouteNavigation';
import showToast from '../../utils/toastUtil';

// Mock useParams
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

// Mock startGame
vi.mock('../../service/StartGameService', () => ({
  startGame: vi.fn(),
}));

// Mock useRouteNavigation
vi.mock('../../hooks/useRouteNavigation', () => ({
  default: vi.fn(),
}));

// Mock showToast
vi.mock('../../utils/toastUtil', () => ({
  default: vi.fn(),
}));

describe('StartGameButton', () => {
  const mockRedirectToGamePage = vi.fn();
  const mockStartGame = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useParams.mockReturnValue({ gameId: '1' });
    startGame.mockImplementation(mockStartGame);
    useRouteNavigation.mockReturnValue({
      redirectToGamePage: mockRedirectToGamePage,
    });
  });

  const renderComponent = (isDisabled = true) => {
    render(<StartGameButton isDisabled={isDisabled} />);
  };

  const expectButtonToHaveCommonClasses = (button) => {
    expect(button.className).toContain('w-[18rem]');
    expect(button.className).toContain('h-[4.375rem]');
    expect(button.className).toContain('text-3xl');
    expect(button.className).toContain('border-2');
    expect(button.className).toContain('border-[#f1f1f1]');
    expect(button.className).toContain('bg-[#f1f1f1]');
  };

  it('should render the button with the correct text', () => {
    renderComponent();
    expect(screen.getByText('Iniciar partida')).toBeInTheDocument();
  });

  it('should apply the correct style when the button is disabled', () => {
    renderComponent(true);
    const button = screen.getByText('Iniciar partida');
    expectButtonToHaveCommonClasses(button);
    expect(button.className).toContain('text-[#C0C0C0]');
    expect(button.className).toContain('cursor-not-allowed');
    expect(button.className).toContain('disabled');
  });

  it('should apply the correct style when the button is not disabled', () => {
    renderComponent(false);
    const button = screen.getByText('Iniciar partida');
    expectButtonToHaveCommonClasses(button);
    expect(button.className).toContain('text-[#0c0c0c]');
    expect(button.className).toContain('hover:bg-transparent');
    expect(button.className).toContain('hover:text-[#f1f1f1]');
  });

  it('should call startGame and redirectToGamePage when the button is clicked', async () => {
    mockStartGame.mockResolvedValue({ gameId: '1' });
    renderComponent(false);
    const button = screen.getByText('Iniciar partida');
    fireEvent.click(button);
    await waitFor(() => {
      expect(startGame).toHaveBeenCalledWith('1');
      expect(mockRedirectToGamePage).toHaveBeenCalledWith({ gameId: '1' });
    });
  });

  it('should handle errors in startGame', async () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mockStartGame.mockRejectedValue(new Error('Error al iniciar la partida'));
    renderComponent(false);
    const button = screen.getByText('Iniciar partida');
    fireEvent.click(button);
    await waitFor(() => {
      expect(startGame).toHaveBeenCalledWith('1');
      expect(showToast).toHaveBeenCalledWith({
        type: 'error',
        message: 'Error al iniciar la partida. Intente nuevamente.',
        autoClose: 3000,
      });
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error al iniciar la partida',
        expect.any(Error)
      );
    });
    consoleErrorSpy.mockRestore();
  });
});
