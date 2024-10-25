import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import JoinGameButton from './JoinGameButton';
import useRouteNavigation from '../../hooks/useRouteNavigation';

// Mock useRouteNavigation
vi.mock('../../hooks/useRouteNavigation', () => ({
  default: vi.fn(),
}));

describe('JoinGameButton', () => {
  const mockRedirectToGameListPage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useRouteNavigation.mockReturnValue({
      redirectToGameListPage: mockRedirectToGameListPage,
    });
  });

  const renderComponent = () => render(<JoinGameButton />);

  it('should render the JoinGameButton component', () => {
    renderComponent();
    const button = screen.getByText('Unirse a partida');
    expect(button).toBeInTheDocument();
  });

  it('should have the correct text', () => {
    renderComponent();
    const button = screen.getByText('Unirse a partida');
    expect(button).toHaveTextContent('Unirse a partida');
  });

  it('should have the correct class names', () => {
    renderComponent();
    const button = screen.getByText('Unirse a partida');
    expect(button).toHaveClass(
      'lekton-bold',
      'rounded-xl',
      'transition-all',
      'text-3xl',
      'w-80',
      'py-6',
      'bg-white',
      'text-black',
      'hover:bg-black',
      'hover:text-white'
    );
  });

  it('should call redirectToGameListPage when the button is clicked', () => {
    renderComponent();
    const button = screen.getByText('Unirse a partida');
    fireEvent.click(button);
    expect(mockRedirectToGameListPage).toHaveBeenCalled();
  });
});