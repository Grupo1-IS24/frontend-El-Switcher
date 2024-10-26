import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PlayerInfo from './PlayerInfo';
import { PlayerContext } from '../../contexts/PlayerProvider';
import useOpponentMovCards from '../../hooks/useOpponentMovCards';

// Mock de los componentes y hooks
vi.mock('../../hooks/useOpponentMovCards');
vi.mock('../FigureCardHand/FigureCardHand', () => ({
  default: vi.fn(() => <div>FigureCardHand</div>),
}));
vi.mock('../MovCardHand/MovCardHand', () => ({
  default: vi.fn(() => <div>MovCardHand</div>),
}));
vi.mock('../BackMovCardHand/BackMovCardHand', () => ({
  default: vi.fn(() => <div>BackMovCardHand</div>),
}));
vi.mock('../OpponentFigureCardHand/OpponentFigureCardHand', () => ({
  default: vi.fn(() => <div>OpponentFigureCardHand</div>),
}));
vi.mock('../PlayMovementButton/PlayMovementButton', () => ({
  default: vi.fn(() => <button>PlayMovementButton</button>),
}));
vi.mock('../CancelMovementButton/CancelMovementButton', () => ({
  default: vi.fn(() => <button>CancelMovementButton</button>),
}));
vi.mock('../EndTurnButton/EndTurnButton', () => ({
  default: vi.fn(() => <button>EndTurnButton</button>),
}));
vi.mock('../PlayFigureButton/PlayFigureButton', () => ({
  default: vi.fn(() => <button>PlayFigureButton</button>),
}));

describe('PlayerInfo', () => {
  const mockGetTotalMovCardsForOpponent = vi.fn();

  beforeEach(() => {
    useOpponentMovCards.mockReturnValue({
      getTotalMovCardsForOpponent: mockGetTotalMovCardsForOpponent,
    });
  });

  const renderComponent = (props, currentPlayerID) =>
    render(
      <PlayerContext.Provider value={{ playerID: currentPlayerID }}>
        <PlayerInfo {...props} />
      </PlayerContext.Provider>
    );

  it('should render the PlayerInfo component', () => {
    renderComponent(
      { playerName: 'Player 1', playerId: '1', index: 0, isTurn: true },
      '1'
    );
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('(En turno)')).toBeInTheDocument();
  });

  it('should render action buttons when currentPlayerID is equal to playerId', () => {
    renderComponent(
      { playerName: 'Player 1', playerId: '1', index: 0, isTurn: true },
      '1'
    );
    expect(screen.getByText('EndTurnButton')).toBeInTheDocument();
    expect(screen.getByText('PlayMovementButton')).toBeInTheDocument();
    expect(screen.getByText('PlayFigureButton')).toBeInTheDocument();
    expect(screen.getByText('CancelMovementButton')).toBeInTheDocument();
  });

  it('should render MovCardHand when currentPlayerID is equal to playerId', () => {
    renderComponent(
      { playerName: 'Player 1', playerId: '1', index: 0, isTurn: true },
      '1'
    );
    expect(screen.getByText('MovCardHand')).toBeInTheDocument();
  });

  it('should render BackMovCardHand when currentPlayerID is not equal to playerId', () => {
    renderComponent(
      { playerName: 'Player 1', playerId: '1', index: 0, isTurn: true },
      '2'
    );
    expect(screen.getByText('BackMovCardHand')).toBeInTheDocument();
    expect(mockGetTotalMovCardsForOpponent).toHaveBeenCalledWith('1');
  });

  it('should render FigureCardHand when currentPlayerID is equal to playerId', () => {
    renderComponent(
      { playerName: 'Player 1', playerId: '1', index: 0, isTurn: true },
      '1'
    );
    expect(screen.getByText('FigureCardHand')).toBeInTheDocument();
  });

  it('should render OpponentFigureCardHand when currentPlayerID is not equal to playerId', () => {
    renderComponent(
      { playerName: 'Player 1', playerId: '1', index: 0, isTurn: true },
      '2'
    );
    expect(screen.getByText('OpponentFigureCardHand')).toBeInTheDocument();
  });

  it('should display player name and turn status', () => {
    renderComponent(
      { playerName: 'Player 1', playerId: '1', index: 0, isTurn: true },
      '1'
    );
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('(En turno)')).toBeInTheDocument();
    cleanup();
    renderComponent(
      { playerName: 'Player 2', playerId: '2', index: 1, isTurn: false },
      '1'
    );
    expect(screen.getByText('Player 2')).toBeInTheDocument();
    expect(screen.queryByText('(En turno)')).not.toBeInTheDocument();
  });
});
