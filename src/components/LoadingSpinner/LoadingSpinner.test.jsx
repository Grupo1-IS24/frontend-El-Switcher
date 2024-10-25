import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner', () => {
  const renderComponent = () => render(<LoadingSpinner />);

  it('should render the LoadingSpinner component', () => {
    renderComponent();
    const spinnerElement = screen.getByTestId('loading-spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  it('should have the correct class names for the container', () => {
    renderComponent();
    const spinnerElement = screen.getByTestId('loading-spinner');
    expect(spinnerElement).toHaveClass(
      'fixed',
      'inset-0',
      'flex',
      'justify-center',
      'items-center'
    );
  });

  it('should have the correct class names for the spinner', () => {
    renderComponent();
    const spinnerElement = screen.getByTestId('loading-spinner').firstChild;
    expect(spinnerElement).toHaveClass(
      'animate-spin',
      'rounded-full',
      'h-32',
      'w-32',
      'border-t-2',
      'border-b-2',
      'border-gray-200'
    );
  });
});