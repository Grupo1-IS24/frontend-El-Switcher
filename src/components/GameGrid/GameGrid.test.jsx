import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GameGrid from './GameGrid';
import GameCard from '../GameCard/GameCard';

// Mock del componente GameCard
vi.mock('../GameCard/GameCard', () => ({
  default: vi.fn(
    ({ gameName, maxPlayers, connectedPlayers, onPressButton }) => (
      <div>
        <h2>{gameName}</h2>
        <p>Conectados: {connectedPlayers}</p>
        <p>Max. jugadores: {maxPlayers}</p>
        <button onClick={onPressButton}>Unirme</button>
      </div>
    )
  ),
}));

describe('GameGrid', () => {
  const mockSelectGame = vi.fn();

  const renderComponent = (props) =>
    render(<GameGrid {...props} selectGame={mockSelectGame} />);

  it('should render the GameGrid component', () => {
    const gameList = [
      { gameId: 1, gameName: 'Game 1', maxPlayers: 4, connectedPlayers: 2 },
      { gameId: 2, gameName: 'Game 2', maxPlayers: 4, connectedPlayers: 4 },
    ];

    renderComponent({ gameList });

    expect(screen.getByText('Game 1')).toBeInTheDocument();
    expect(screen.queryByText('Game 2')).not.toBeInTheDocument();
  });

  it('should pass the correct props to GameCard', () => {
    const gameList = [
      { gameId: 1, gameName: 'Game 1', maxPlayers: 4, connectedPlayers: 2 },
    ];

    renderComponent({ gameList });

    expect(GameCard).toHaveBeenCalledWith(
      expect.objectContaining({
        gameName: 'Game 1',
        maxPlayers: 4,
        connectedPlayers: 2,
        onPressButton: expect.any(Function),
      }),
      expect.anything()
    );
  });

  it('should call selectGame when the button is clicked', () => {
    const gameList = [
      { gameId: 1, gameName: 'Game 1', maxPlayers: 4, connectedPlayers: 2 },
    ];

    renderComponent({ gameList });

    const button = screen.getByText('Unirme');
    fireEvent.click(button);
    expect(mockSelectGame).toHaveBeenCalledWith(gameList[0]);
  });
});
