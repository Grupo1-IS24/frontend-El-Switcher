import { useContext } from 'react';
import { PlayMovementLogicContext } from '../../contexts/PlayMovementLogicProvider';
import ColorCard from '../ColorCard/ColorCard';

const Board = ({ board }) => {
  const { selectColorCard, canSelectColorCard, isSelectedColorCard } =
    useContext(PlayMovementLogicContext);

  return (
    <div className='fixed h-screen w-screen'>
      <div className='flex justify-center items-center h-screen'>
        <div className='grid grid-cols-6 grid-rows-6'>
          {board.map((colorCard, index) => (
            <ColorCard
              key={index}
              color={colorCard.color}
              onClick={() => selectColorCard(colorCard)}
              disabled={!canSelectColorCard(colorCard)}
              isSelected={isSelectedColorCard(colorCard)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
