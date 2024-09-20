import { createContext, useCallback, useEffect, useState } from 'react';
import {
  removeSessionStorageValue,
  getSessionStorageValue,
  setSessionStorageValue,
} from '../utils/sessionStorageUtils';

export const PlayerAndGameContext = createContext();

const PlayerAndGameProvider = ({ children }) => {
  // playerID must be a number. By default, playerID is -1.
  const [playerID, setPlayerID] = useState(() =>
    getSessionStorageValue('playerID', -1)
  );

  // isOwner must be a boolean. By default, isOwner is false.
  const [isOwner, setIsOwner] = useState(() =>
    getSessionStorageValue('isOwner', false)
  );

  // gameID must be a number. By default, gameID is -1.
  const [gameID, setGameID] = useState(() =>
    getSessionStorageValue('gameID', -1)
  );

  const resetPlayerAndGameState = useCallback(() => {
    removeSessionStorageValue('playerID');
    removeSessionStorageValue('isOwner');
    removeSessionStorageValue('gameID');

    setPlayerID(-1);
    setIsOwner(false);
    setGameID(-1);
  }, []);

  // When the playerID, isOwner, or gameID changes, update the sessionStorage.
  useEffect(() => {
    setSessionStorageValue('playerID', playerID);
    setSessionStorageValue('isOwner', isOwner);
    setSessionStorageValue('gameID', gameID);
  }, [playerID, isOwner, gameID]);

  // The provided state for the context.
  const providedState = {
    playerID,
    setPlayerID,
    isOwner,
    setIsOwner,
    gameID,
    setGameID,
    resetPlayerAndGameState,
  };

  return (
    <PlayerAndGameContext.Provider value={providedState}>
      {children}
    </PlayerAndGameContext.Provider>
  );
};

export default PlayerAndGameProvider;
