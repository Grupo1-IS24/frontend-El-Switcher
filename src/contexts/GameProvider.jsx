import { createContext } from 'react';
import useWebsocketGame from '../hooks/useWebsocketGame';

export const GameContext = createContext();

const WebSocketGameProvider = ({ children }) => {
  const providedState = useWebsocketGame();

  return (
    <GameContext.Provider value={providedState}>
      {children}
    </GameContext.Provider>
  );
};

export default WebSocketGameProvider;
