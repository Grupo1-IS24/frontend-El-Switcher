import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import GamePage from './GamePage';
import { GameContext } from '../contexts/GameProvider';
import { PlayerContext } from '../contexts/PlayerProvider';
import { MemoryRouter } from 'react-router-dom';
import useWebsocketGame from '../hooks/useWebsocketGame';
import useGetGame from '../hooks/useGetGame';

// Mock los componentes
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

vi.mock('../components/LoadingSpinner/LoadingSpinner', () => ({
  default: () => <div data-testid='loading-spinner'>LoadingSpinner</div>,
}));

// Mock los hooks
vi.mock('../hooks/useWebsocketGame');
vi.mock('../hooks/useGetGame');

describe('GamePage', () => {
  const renderGamePage = (gameContextValue, playerContextValue) => {
    return render(
      <MemoryRouter>
        <PlayerContext.Provider value={playerContextValue}>
          <GameContext.Provider value={gameContextValue}>
            <GamePage />
          </GameContext.Provider>
        </PlayerContext.Provider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render all components correctly', () => {
    useWebsocketGame.mockReturnValue({ isLoading: false });
    useGetGame.mockReturnValue({
      game: { id: 1 },
      gameError: null,
      refreshGame: vi.fn(),
    });

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
    useWebsocketGame.mockReturnValue({ isLoading: false });
    useGetGame.mockReturnValue({
      game: { id: 1 },
      gameError: null,
      refreshGame: vi.fn(),
    });

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
    useWebsocketGame.mockReturnValue({ isLoading: false });
    useGetGame.mockReturnValue({
      game: { id: 1 },
      gameError: null,
      refreshGame: vi.fn(),
    });

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

  it('should render LoadingSpinner when isLoading is true and game is null', () => {
    useWebsocketGame.mockReturnValue({ isLoading: true });
    useGetGame.mockReturnValue({
      game: null,
      gameError: null,
      refreshGame: vi.fn(),
    });

    const gameContextValue = {
      listOfPlayers: [],
      board: [],
      timer: 0,
    };
    const playerContextValue = {
      playerID: 'player123',
    };

    renderGamePage(gameContextValue, playerContextValue);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('should navigate to error page when gameError is true', () => {
    useWebsocketGame.mockReturnValue({ isLoading: false });
    useGetGame.mockReturnValue({
      game: null,
      gameError: true,
      refreshGame: vi.fn(),
    });

    const gameContextValue = {
      listOfPlayers: [],
      board: [],
      timer: 0,
    };
    const playerContextValue = {
      playerID: 'player123',
    };

    renderGamePage(gameContextValue, playerContextValue);

    expect(screen.queryByTestId('bg-overlay')).not.toBeInTheDocument();
    expect(screen.queryByTestId('blocked-color')).not.toBeInTheDocument();
    expect(screen.queryByTestId('timer')).not.toBeInTheDocument();
    expect(screen.queryByTestId('display-players')).not.toBeInTheDocument();
    expect(screen.queryByTestId('board')).not.toBeInTheDocument();
    expect(screen.queryByTestId('winner-message')).not.toBeInTheDocument();
    expect(screen.queryByTestId('leave-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('chat-box')).not.toBeInTheDocument();
  });
});
