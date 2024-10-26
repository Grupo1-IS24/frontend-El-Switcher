import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import EndTurnButton from './EndTurnButton';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { PlayCardLogicContext } from '../../contexts/PlayCardLogicProvider';
import usePlayerTurn from '../../hooks/usePlayerTurn';
import useDisableButton from '../../hooks/useDisableButton';
import { useParams } from 'react-router-dom';

// Mock hooks and services
vi.mock('../../hooks/usePlayerTurn', () => ({
  default: vi.fn(),
}));

vi.mock('../../hooks/useDisableButton', () => ({
  default: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
}));

vi.mock('../../service/EndTurnService', () => ({
  endTurn: vi.fn(),
}));

describe('EndTurnButton', () => {
  const mockIsCurrentPlayerTurn = vi.fn();
  const mockResetAllCards = vi.fn();
  const mockUseDisableButton = vi.fn();

  const renderComponent = () =>
    render(
      <PlayerContext.Provider value={{ playerID: '456' }}>
        <PlayCardLogicContext.Provider
          value={{ resetAllCards: mockResetAllCards }}
        >
          <EndTurnButton />
        </PlayCardLogicContext.Provider>
      </PlayerContext.Provider>
    );

  beforeEach(() => {
    vi.clearAllMocks();
    usePlayerTurn.mockReturnValue({
      isCurrentPlayerTurn: mockIsCurrentPlayerTurn,
    });
    useDisableButton.mockReturnValue([false, mockUseDisableButton]);
    useParams.mockReturnValue({ gameId: '123' });
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it("should render the EndTurnButton component when it is the player's turn", () => {
    mockIsCurrentPlayerTurn.mockReturnValue(true);
    renderComponent();
    const button = screen.getByText('Pasar turno');
    expect(button).toBeInTheDocument();
  });

  it("should not render the EndTurnButton component when it is not the player's turn", () => {
    mockIsCurrentPlayerTurn.mockReturnValue(false);
    renderComponent();
    const button = screen.queryByText('Pasar turno');
    expect(button).not.toBeInTheDocument();
  });

  it('should disable the button when isDisabled is true', () => {
    useDisableButton.mockReturnValue([true, mockUseDisableButton]);
    mockIsCurrentPlayerTurn.mockReturnValue(true);
    renderComponent();
    const button = screen.getByText('Pasar turno');
    expect(button).toBeDisabled();
  });
});
