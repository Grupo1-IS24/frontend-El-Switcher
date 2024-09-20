import { createContext, useCallback, useEffect, useState } from 'react';
import {
  removeSessionStorageValue,
  getSessionStorageValue,
  setSessionStorageValue,
} from '../utils/sessionStorageUtils';

export const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  // playerID must be a number. By default, playerID is -1.
  const [playerID, setPlayerID] = useState(() =>
    getSessionStorageValue('playerID', -1)
  );

  // isOwner must be a boolean. By default, isOwner is false.
  const [isOwner, setIsOwner] = useState(() =>
    getSessionStorageValue('isOwner', false)
  );

  const resetPlayerState = useCallback(() => {
    removeSessionStorageValue('playerID');
    removeSessionStorageValue('isOwner');

    setPlayerID(-1);
    setIsOwner(false);
  }, []);

  // When the playerID or isOwner changes, update the sessionStorage.
  useEffect(() => {
    setSessionStorageValue('playerID', playerID);
    setSessionStorageValue('isOwner', isOwner);
  }, [playerID, isOwner]);

  // The provided state for the context.
  const providedState = {
    playerID,
    setPlayerID,
    isOwner,
    setIsOwner,
    resetPlayerState,
  };

  return (
    <PlayerContext.Provider value={providedState}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
