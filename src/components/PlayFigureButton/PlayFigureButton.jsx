import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { playFigureCard } from '../../service/PlayFigureCardService';
import usePlayFigureLogic from '../../hooks/usePlayFigureLogic';
import Button from '../Button/Button';

const PlayFigureButton = () => {
  const { gameId } = useParams();
  const { playerID } = useContext(PlayerContext);
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
      alert(`Error jugando carta de figura: ${error.message}`);
    }
  };

  return (
    <>
      {canPlayFigure() && (
        <Button
          text={'Jugar figura'}
          style={'gameButton_play'}
          onPress={handleOnPress}
        />
      )}
    </>
  );
};

export default PlayFigureButton;
