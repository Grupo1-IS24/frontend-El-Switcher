import usePlayFigureLogic from '../../hooks/usePlayFigureLogic';
import Button from '../Button/Button';

const PlayFigureButton = () => {
  const {
    selectedFigureCard,
    selectedFigureColorCards,
    canPlayFigure,
    resetFigureCards,
  } = usePlayFigureLogic();

  return (
    <>
      {canPlayFigure() && (
        <Button
          text={'Jugar figura'}
          style={'gameButton_play'}
          onPress={() => {
            console.log('selectedFigureCard', selectedFigureCard);
            console.log('selectedFigureColorCards', selectedFigureColorCards);
            resetFigureCards();
          }}
        />
      )}
    </>
  );
};

export default PlayFigureButton;
