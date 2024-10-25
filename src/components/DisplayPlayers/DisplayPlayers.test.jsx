import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import DisplayPlayers from './DisplayPlayers';
import usePlayerTurn from '../../hooks/usePlayerTurn';
import PlayerInfo from '../PlayerInfo/PlayerInfo';

// Mock usePlayerTurn
vi.mock('../../hooks/usePlayerTurn', () => ({
  default: vi.fn(),
}));

// Mock PlayerInfo
vi.mock('../PlayerInfo/PlayerInfo', () => ({
  default: vi.fn(() => <div data-testid="player-info">Player Info</div>),
}));

describe('DisplayPlayers', () => {
  const mockIsPlayerTurn = vi.fn();
  const players = [
    { playerName: 'Player 1', playerId: '1' },
    { playerName: 'Player 2', playerId: '2' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    usePlayerTurn.mockReturnValue({
      isPlayerTurn: mockIsPlayerTurn,
    });
  });

  const renderComponent = (listOfPlayers) => render(<DisplayPlayers listOfPlayers={listOfPlayers} />);

  it('should render the DisplayPlayers component', () => {
    renderComponent(players);
    const playerInfos = screen.getAllByTestId('player-info');
    expect(playerInfos.length).toBe(players.length);
  });

  it('should call isPlayerTurn for each player', () => {
    renderComponent(players);
    expect(mockIsPlayerTurn).toHaveBeenCalledTimes(players.length);
    players.forEach(player => {
      expect(mockIsPlayerTurn).toHaveBeenCalledWith(player.playerId);
    });
  });

  it('should render PlayerInfo components with the correct props', () => {
    renderComponent(players);
    players.forEach((player, index) => {
      expect(PlayerInfo).toHaveBeenCalledWith(
        expect.objectContaining({
          playerName: player.playerName,
          playerId: player.playerId,
          index: index,
          isTurn: mockIsPlayerTurn(player.playerId),
        }),
        {}
      );
    });
  });
});