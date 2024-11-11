import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ColorCard from './ColorCard';

describe('ColorCard', () => {
  const renderComponent = (props) => render(<ColorCard {...props} />);

  it('should render the ColorCard component with the correct color', () => {
    const colors = ['RED', 'BLUE', 'GREEN', 'YELLOW'];
    const colorClasses = {
      RED: 'bg-red-500',
      BLUE: 'bg-blue-500',
      GREEN: 'bg-green-500',
      YELLOW: 'bg-yellow-500',
    };

    colors.forEach((color) => {
      renderComponent({ color });
      const buttons = screen.getAllByRole('button');
      const button = buttons[buttons.length - 1];
      expect(button).toHaveClass(colorClasses[color]);
    });
  });

  it('should render the ColorCard component with the default color when the color is invalid', () => {
    renderComponent({ color: 'INVALID_COLOR' });
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-500');
  });

  it('should apply the "cursor-not-allowed" class when the button is disabled', () => {
    renderComponent({ disabled: true });
    const button = screen.getByRole('button');
    expect(button).toHaveClass('cursor-not-allowed');
  });

  it('should apply the "animate-shriggle" class when the button is selected', () => {
    renderComponent({ isSelected: true });
    const button = screen.getByRole('button');
    expect(button).toHaveClass('animate-shriggleNotebook pc:animate-shriggle');
  });

  it('should apply the "border-4" class when the button is part of a figure', () => {
    renderComponent({ isPartOfFigure: true });
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-4');
  });

  it('should call the onClick function when the button is clicked', () => {
    const mockOnClick = vi.fn();
    renderComponent({ onClick: mockOnClick, disabled: false });
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should not call the onClick function when the button is disabled', () => {
    const mockOnClick = vi.fn();
    renderComponent({ onClick: mockOnClick, disabled: true });
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
