import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BackMovCardHand from './BackMovCardHand';

describe('BackMovCardHand', () => {
  it('should render the BackMovCardHand component without movement cards', () => {
    render(<BackMovCardHand totalMovCards={0} />);
    const container = screen.getByTestId('back-mov-card-hand');
    expect(container).toBeInTheDocument();
    expect(container.children.length).toBe(0);
  });

  it('should render the BackMovCardHand component with the correct number of movement cards', () => {
    const totalMovCards = 5;
    render(<BackMovCardHand totalMovCards={totalMovCards} />);
    const container = screen.getByTestId('back-mov-card-hand');
    expect(container).toBeInTheDocument();
    expect(container.children.length).toBe(totalMovCards);
  });

  it('should render the movement cards with the "back" movement', () => {
    const totalMovCards = 3;
    render(<BackMovCardHand totalMovCards={totalMovCards} />);
    const movementCards = screen.getAllByTestId('movement-card');
    movementCards.forEach((card) => {
      expect(card).toHaveAttribute('data-movement', 'back');
    });
  });
});
