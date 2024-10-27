import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import GameGrid from './GameGrid';
import useFilterGameList from '../../hooks/useFilterGameList';

// Mock del hook useFilterGameList
vi.mock('../../hooks/useFilterGameList');

describe('GameGrid', () => {
  const mockSelectGame = vi.fn();

  const renderComponent = (props) =>
    render(<GameGrid {...props} selectGame={mockSelectGame} />);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders only games that match the filter', () => {
    const gameList = [
      { gameId: 1, gameName: 'Game 1', maxPlayers: 4, connectedPlayers: 2 },
      { gameId: 2, gameName: 'Game 2', maxPlayers: 4, connectedPlayers: 4 },
    ];

    useFilterGameList.mockReturnValue({
      filterGameList: (games) =>
        games.filter((game) => game.gameName.includes('Game 1')),
    });

    renderComponent({ gameList });

    expect(screen.getByText('Game 1')).toBeInTheDocument();
    expect(screen.queryByText('Game 2')).not.toBeInTheDocument();
  });

  it('renders a message when no games match the filter', () => {
    const gameList = [
      { gameId: 1, gameName: 'Game 1', maxPlayers: 4, connectedPlayers: 2 },
    ];

    useFilterGameList.mockReturnValue({
      filterGameList: () => [],
    });

    renderComponent({ gameList });

    expect(
      screen.getByText('No se encontró ninguna partida.')
    ).toBeInTheDocument();
    expect(screen.queryByText('Game 1')).not.toBeInTheDocument();
  });

  it('passes the correct props to GameCard', () => {
    const gameList = [
      { gameId: 1, gameName: 'Game 1', maxPlayers: 4, connectedPlayers: 2 },
    ];

    useFilterGameList.mockReturnValue({
      filterGameList: (games) => games,
    });

    renderComponent({ gameList });

    expect(screen.getByText('Game 1')).toBeInTheDocument();
    expect(screen.getByText('Conectados: 2')).toBeInTheDocument();
    expect(screen.getByText('Max. jugadores: 4')).toBeInTheDocument();
  });
});
