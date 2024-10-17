import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { io } from 'socket.io-client';
import useWebsocketGame from './useWebsocketGame';
import { PlayerContext } from '../contexts/PlayerProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mock socket.io-client
vi.mock('socket.io-client');

describe('useWebsocketGame Hook', () => {
    let socket;

    beforeEach(() => {
        socket = {
            on: vi.fn(),
            emit: vi.fn(),
            disconnect: vi.fn(),
        };
        io.mockReturnValue(socket);
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    // Helper function to render the useWebsocketGame hook within a controlled test environment
    const renderUseWebsocketGameHook = (playerID = 1) => {
        return renderHook(() => useWebsocketGame(), {
            wrapper: ({ children }) => (
                <MemoryRouter initialEntries={['/game/1']}>
                    <PlayerContext.Provider value={{ playerID }}>
                        <Routes>
                            <Route path="/game/:gameId" element={children} />
                        </Routes>
                    </PlayerContext.Provider>
                </MemoryRouter>
            ),
        });
    };

    // Test initialization and event handling
    describe('Initialization and Event Handling', () => {
        it('should have initial state', () => {
            const { result } = renderUseWebsocketGameHook();

            expect(result.current.listOfPlayers).toEqual([]);
            expect(result.current.board).toEqual([]);
            expect(result.current.playerTurnId).toBe(-1);
            expect(result.current.figureCards).toEqual([]);
            expect(result.current.movementCards).toEqual([]);
            expect(result.current.winnerInfo).toBe(null);
            expect(result.current.opponentsTotalMovCards).toEqual([]);
            expect(result.current.foundFigures).toEqual([]);
        });

        it('should handle player_list event correctly', () => {
            const { result } = renderUseWebsocketGameHook();

            act(() => {
                socket.on.mock.calls[0][1]([{ playerId: 1, name: 'Player 1' }]);
            });

            expect(result.current.listOfPlayers).toEqual([{ playerId: 1, name: 'Player 1' }]);
        });

        it('should handle turn event correctly', () => {
            const { result } = renderUseWebsocketGameHook();

            act(() => {
                socket.on.mock.calls[1][1]({ playerTurnId: 2 });
            });

            expect(result.current.playerTurnId).toBe(2);
        });

        it('should handle board event correctly', () => {
            const { result } = renderUseWebsocketGameHook();

            act(() => {
                socket.on.mock.calls[2][1]([{ row: 1, column: 1 }]);
            });

            expect(result.current.board).toEqual([{ row: 1, column: 1 }]);
        });

        it('should handle figure_cards event correctly', () => {
            const { result } = renderUseWebsocketGameHook();

            act(() => {
                socket.on.mock.calls[3][1]([{ figureCardId: 1 }]);
            });

            expect(result.current.figureCards).toEqual([{ figureCardId: 1 }]);
        });

        it('should handle movement_cards event correctly', () => {
            const { result } = renderUseWebsocketGameHook();

            act(() => {
                socket.on.mock.calls[4][1]([{ movementcardId: 1 }]);
            });

            expect(result.current.movementCards).toEqual([{ movementcardId: 1 }]);
        });

        it('should handle winner event correctly', () => {
            const { result } = renderUseWebsocketGameHook();

            act(() => {
                socket.on.mock.calls[5][1]({ winnerId: 1 });
            });

            expect(result.current.winnerInfo).toEqual({ winnerId: 1 });
        });

        it('should handle opponents_total_mov_cards event correctly', () => {
            const { result } = renderUseWebsocketGameHook();

            act(() => {
                socket.on.mock.calls[6][1]([{ playerId: 2, totalMovCards: 3 }]);
            });

            expect(result.current.opponentsTotalMovCards).toEqual([{ playerId: 2, totalMovCards: 3 }]);
        });

        it('should handle found_figures event correctly', () => {
            const { result } = renderUseWebsocketGameHook();

            act(() => {
                socket.on.mock.calls[7][1]([{ figureId: 1 }]);
            });

            expect(result.current.foundFigures).toEqual([{ figureId: 1 }]);
        });
    });

    // Test cleanup on unmount
    describe('Cleanup on Unmount', () => {
        it('should disconnect the socket on unmount', () => {
            const { unmount } = renderUseWebsocketGameHook();

            act(() => {
                unmount();
            });

            expect(socket.disconnect).toHaveBeenCalled();
        });
    });
});