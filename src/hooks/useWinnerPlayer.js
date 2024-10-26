import { useContext } from 'react';
import { GameContext } from '../contexts/GameProvider';
import { PlayerContext } from '../contexts/PlayerProvider';

const useWinnerPlayer = () => {
  const { winnerInfo } = useContext(GameContext);
  const { playerID } = useContext(PlayerContext);

  const thereIsWinner = winnerInfo !== null;

  const isCurrentPlayerWinner =
    thereIsWinner && winnerInfo.idWinner === playerID;

  const winnerName = thereIsWinner ? winnerInfo.nameWinner : '';

  return { isCurrentPlayerWinner, thereIsWinner, winnerName };
};

export default useWinnerPlayer;
