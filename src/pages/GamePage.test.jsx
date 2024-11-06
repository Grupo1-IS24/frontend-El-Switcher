import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import GamePage from './GamePage';
import { GameContext } from '../contexts/GameProvider';
import { PlayerContext } from '../contexts/PlayerProvider';

// Mock components
vi.mock('../components/DisplayPlayers/DisplayPlayers', () => ({
  default: () => <div data-testid='display-players'>DisplayPlayers</div>,
}));

vi.mock('../components/Board/Board', () => ({
  default: () => <div data-testid='board'>Board</div>,
}));

vi.mock('../components/WinnerMessage/WinnerMessage', () => ({
  default: () => <div data-testid='winner-message'>WinnerMessage</div>,
}));

vi.mock('../components/BgOverlay/BgOverlay', () => ({
  default: () => <div data-testid='bg-overlay'>BgOverlay</div>,
}));

vi.mock('../components/LeaveButton/LeaveButton', () => ({
  default: () => <div data-testid='leave-button'>LeaveButton</div>,
}));

vi.mock('../components/Timer/Timer', () => ({
  default: ({ time }) => <div data-testid='timer'>Timer: {time}</div>,
}));

vi.mock('../components/ChatBox/ChatBox', () => ({
  default: () => <div data-testid='chat-box'>ChatBox</div>,
}));

vi.mock('../components/BlockedColor/BlockedColor', () => ({
  default: () => <div data-testid='blocked-color'>BlockedColor</div>,
}));

describe('GamePage', () => {
  const renderGamePage = (gameContextValue, playerContextValue) => {
    return render(
      <PlayerContext.Provider value={playerContextValue}>
        <GameContext.Provider value={gameContextValue}>
          <GamePage />
        </GameContext.Provider>
      </PlayerContext.Provider>
    );
  };

  it('should render all components correctly', () => {
    const gameContextValue = {
      listOfPlayers: [],
      board: [],
      timer: 0,
    };
    const playerContextValue = {
      playerID: 'player123',
    };

    renderGamePage(gameContextValue, playerContextValue);

    expect(screen.getByTestId('bg-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('blocked-color')).toBeInTheDocument();
    expect(screen.queryByTestId('timer')).not.toBeInTheDocument();
    expect(screen.getByTestId('display-players')).toBeInTheDocument();
    expect(screen.getByTestId('board')).toBeInTheDocument();
    expect(screen.getByTestId('winner-message')).toBeInTheDocument();
    expect(screen.getByTestId('leave-button')).toBeInTheDocument();
    expect(screen.getByTestId('chat-box')).toBeInTheDocument();
  });

  it('should render Timer component when timer is greater than 0', () => {
    const gameContextValue = {
      listOfPlayers: [],
      board: [],
      timer: 30,
    };
    const playerContextValue = {
      playerID: 'player123',
    };

    renderGamePage(gameContextValue, playerContextValue);

    expect(screen.getByTestId('timer')).toBeInTheDocument();
    expect(screen.getByText('Timer: 30')).toBeInTheDocument();
  });

  it('should not render Timer component when timer is 0', () => {
    const gameContextValue = {
      listOfPlayers: [],
      board: [],
      timer: 0,
    };
    const playerContextValue = {
      playerID: 'player123',
    };

    renderGamePage(gameContextValue, playerContextValue);

    expect(screen.queryByTestId('timer')).not.toBeInTheDocument();
  });
});
