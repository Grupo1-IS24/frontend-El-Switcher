import { useContext } from 'react';
import { PlayMovementLogicContext } from '../../contexts/PlayMovementLogicProvider';
import Button from '../Button/Button';

const PlayMovementButton = () => {
  const {
    canPlayMovement,
    selectedMovementCard,
    selectedColorCards,
    resetSelectedCards,
  } = useContext(PlayMovementLogicContext);

  return (
    <>
      {canPlayMovement() && (
        <Button
          text={'Jugar movimiento'}
          style={'gameButton_playMovement'}
          onPress={() => {
            console.log('Selected movement card:', selectedMovementCard);
            console.log('Selected color cards:', selectedColorCards);
            resetSelectedCards();
          }}
        />
      )}
    </>
  );
};

export default PlayMovementButton;
