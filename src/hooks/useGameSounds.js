import { useCallback } from 'react';
import useSound from 'use-sound';
import loser from '../assets/Sounds/loser.mp3';
import winner from '../assets/Sounds/winner.mp3';

export const useGameSounds = () => {
  const [playLoser, { stop: stopLoser }] = useSound(loser);
  const [playWinner, { stop: stopWinner }] = useSound(winner);

  const playSound = useCallback(
    (isWinner) => {
      isWinner ? playWinner() : playLoser();
    },
    [playWinner, playLoser]
  );

  const stopSound = useCallback(
    (isWinner) => {
      isWinner ? stopWinner() : stopLoser();
    },
    [stopWinner, stopLoser]
  );

  return { playSound, stopSound };
};
