import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RefeshButton from './RefeshButton';

describe('RefeshButton', () => {
  let mockOnPress;

  beforeEach(() => {
    mockOnPress = vi.fn();
  });

  const renderComponent = (isVisible = true) => {
    render(<RefeshButton isVisible={isVisible} onPress={mockOnPress} />);
  };

  it('should render the button when isVisible is true', () => {
    renderComponent(true);
    expect(screen.getByText('🗘')).toBeInTheDocument();
  });

  it('should not render the button when isVisible is false', () => {
    renderComponent(false);
    expect(screen.queryByText('🗘')).toBeNull();
  });

  it('should call onPress when the button is clicked', () => {
    renderComponent(true);
    const button = screen.getByText('🗘');
    fireEvent.click(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});