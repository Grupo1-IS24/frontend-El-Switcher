import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MovementCard from './MovementCard';

describe('MovementCard', () => {
  const renderComponent = (props) => render(<MovementCard {...props} />);

  it('should render the MovementCard component with the correct image path and alt text for valid movement', () => {
    renderComponent({ movement: 3 });
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/src/assets/MovementCards/mov3.svg');
    expect(img).toHaveAttribute('alt', 'Movimiento 3');
  });

  it('should render the default image path and alt text for invalid movement', () => {
    renderComponent({ movement: 10 });
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute(
      'src',
      '/src/assets/MovementCards/back-mov.svg'
    );
    expect(img).toHaveAttribute('alt', 'Movimiento de espaldas');
  });

  it('should apply the correct class when the card is selected', () => {
    renderComponent({ isSelected: true });
    const button = screen.getByTestId('movement-card');
    expect(button).toHaveClass('animate-shriggleNotebook pc:animate-shriggle');
  });

  it('should apply the correct class when the card is disabled', () => {
    renderComponent({ disabled: true });
    const button = screen.getByTestId('movement-card');
    expect(button).toHaveClass('cursor-not-allowed');
  });

  it('should apply the correct class when the card is played', () => {
    renderComponent({ isPlayed: true });
    const img = screen.getByRole('img');
    expect(img).toHaveClass('grayscale');
  });

  it('should call the onClick function when the card is clicked', () => {
    const mockOnClick = vi.fn();
    renderComponent({ onClick: mockOnClick, disabled: false });
    const button = screen.getByTestId('movement-card');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('should not call the onClick function when the card is disabled', () => {
    const mockOnClick = vi.fn();
    renderComponent({ onClick: mockOnClick, disabled: true });
    const button = screen.getByTestId('movement-card');
    fireEvent.click(button);
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
