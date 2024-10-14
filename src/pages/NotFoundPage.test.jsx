import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import NotFoundPage from './NotFoundPage';

// Mock the useRouteNavigation hook
const mockRedirectToHomePage = vi.fn();
vi.mock('../hooks/useRouteNavigation', () => ({
  default: () => ({
    redirectToHomePage: mockRedirectToHomePage,
  }),
}));

describe('NotFoundPage', () => {
  beforeEach(() => {
    render(<NotFoundPage />);
  });

  it('renders the heading with correct text', () => {
    const heading = screen.getByText('404 - Page Not Found');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-4xl font-bold text-red-600 mb-4');
  });

  it('renders the paragraph with correct text', () => {
    const paragraph = screen.getByText('La página solicitada no existe.');
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass('text-lg text-gray-700 mb-6');
  });

  it('renders the button with correct text and class', () => {
    const button = screen.getByText('Ir al inicio');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('px-4 py-2 bg-black text-white font-medium rounded border border-transparent hover:bg-gray-800');
  });

  it('calls redirectToHomePage when the button is clicked', () => {
    const button = screen.getByText('Ir al inicio');
    fireEvent.click(button);
    expect(mockRedirectToHomePage).toHaveBeenCalled();
  });
});