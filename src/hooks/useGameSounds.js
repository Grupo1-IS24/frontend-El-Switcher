import useSound from 'use-sound';
import loser from '../assets/Sounds/loser.mp3';
import winner from '../assets/Sounds/winner.mp3';

export const useGameSounds = () => {
  const [playLoser, { stop: stopLoser }] = useSound(loser);
  const [playWinner, { stop: stopWinner }] = useSound(winner);

  const playSound = (isWinner) => {
    isWinner ? playWinner() : playLoser();
  };

  const stopSound = (isWinner) => {
    isWinner ? stopWinner() : stopLoser();
  };

  return { playSound, stopSound };
};
