import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { playFigureCard } from '../../service/PlayFigureCardService';
import usePlayFigureLogic from '../../hooks/usePlayFigureLogic';
import Button from '../Button/Button';
import showToast from '../../utils/toastUtil';
import useFigureCards from '../../hooks/useFigureCards';

const PlayFigureButton = () => {
  const { gameId } = useParams();
  const { playerID } = useContext(PlayerContext);
  const { isCurrentPlayerOwnerFigureCard } = useFigureCards();
  const {
    selectedFigureCard,
    selectedFigureColorCards,
    canPlayFigure,
    resetFigureCards,
  } = usePlayFigureLogic();

  const handleOnPress = async () => {
    try {
      await playFigureCard(
        gameId,
        playerID,
        selectedFigureCard.figureCardId,
        selectedFigureColorCards
      );

      resetFigureCards();
    } catch (error) {
      showToast({
        type: 'error',
        message: `Error jugando carta de figura: ${error.message}`,
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      {canPlayFigure() && (
        <Button
          text={
            isCurrentPlayerOwnerFigureCard(selectedFigureCard)
              ? 'Jugar figura'
              : 'Bloquear figura'
          }
          style={'gameButton_play'}
          onPress={handleOnPress}
        />
      )}
    </>
  );
};

export default PlayFigureButton;
