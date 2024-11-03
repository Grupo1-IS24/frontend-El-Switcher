import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import LeaveGameListButton from './LeaveGameListButton';
import useRouteNavigation from '../../hooks/useRouteNavigation';

vi.mock('../../hooks/useRouteNavigation', () => ({
  __esModule: true,
  default: () => ({
    redirectToHomePage: vi.fn(),
  }),
}));

const showToast = vi.fn();

describe('LeaveGameListButton', () => {
  let redirectToHomePage;

  beforeEach(() => {
    redirectToHomePage = useRouteNavigation().redirectToHomePage;
    vi.clearAllMocks();
  });

  it('renders the button with correct text', () => {
    render(<LeaveGameListButton />);
    const button = screen.getByText('⭠');
    expect(button).toBeInTheDocument();
  });

  it('calls redirectToHomePage on button click', () => {
    render(<LeaveGameListButton />);
    const button = screen.getByText('⭠');
    fireEvent.click(button);

    expect(redirectToHomePage);
  });

  it('shows error toast on click if an error occurs', () => {
    redirectToHomePage.mockImplementation(() => {
      throw new Error('Test error');
    });

    render(<LeaveGameListButton />);

    const button = screen.getByText('⭠');
    fireEvent.click(button);

    expect(showToast);
  });

  it('does not show toast or call console.error if no error occurs', () => {
    render(<LeaveGameListButton />);

    const button = screen.getByText('⭠');
    fireEvent.click(button);

    expect(showToast);
    expect(console.error);
  });
});