import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MovCardHand from './MovCardHand';
import { GameContext } from '../../contexts/GameProvider';
import usePlayedMovCards from '../../hooks/usePlayedMovCards';
import usePlayMovementLogic from '../../hooks/usePlayMovementLogic';

// Mock de los hooks
const mockIsMovementCardPlayed = vi.fn(() => false);
const mockSelectMovementCard = vi.fn();
const mockIsSelectedMovementCard = vi.fn(() => false);
const mockCanSelectMovementCard = vi.fn(() => true);

vi.mock('../../hooks/usePlayedMovCards', () => ({
  default: vi.fn(() => ({
    isMovementCardPlayed: mockIsMovementCardPlayed,
  })),
}));

vi.mock('../../hooks/usePlayMovementLogic', () => ({
  default: vi.fn(() => ({
    selectMovementCard: mockSelectMovementCard,
    isSelectedMovementCard: mockIsSelectedMovementCard,
    canSelectMovementCard: mockCanSelectMovementCard,
  })),
}));

describe('MovCardHand', () => {
  const mockMovementCards = [
    { movementcardId: 1, moveType: 1 },
    { movementcardId: 2, moveType: 2 },
    { movementcardId: 3, moveType: 3 },
  ];

  const renderComponent = () =>
    render(
      <GameContext.Provider value={{ movementCards: mockMovementCards }}>
        <MovCardHand />
      </GameContext.Provider>
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the MovCardHand component', () => {
    renderComponent();
    expect(screen.getByRole('button', { name: /Movimiento 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Movimiento 2/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Movimiento 3/i })).toBeInTheDocument();
  });

  it('should pass the correct props to MovementCard', () => {
    renderComponent();

    mockMovementCards.forEach((movementCard) => {
      const button = screen.getByRole('button', { name: new RegExp(`Movimiento ${movementCard.moveType}`, 'i') });
      expect(button).toHaveAttribute('data-movement', `${movementCard.moveType}`);
      expect(mockIsSelectedMovementCard).toHaveBeenCalledWith(movementCard);
      expect(mockCanSelectMovementCard).toHaveBeenCalledWith(movementCard);
      expect(mockIsMovementCardPlayed).toHaveBeenCalledWith(movementCard);
    });
  });

  it('should call selectMovementCard when a MovementCard is clicked', () => {
    renderComponent();

    const button = screen.getByRole('button', { name: /Movimiento 1/i });
    fireEvent.click(button);

    expect(mockSelectMovementCard).toHaveBeenCalledWith(mockMovementCards[0]);
  });
});