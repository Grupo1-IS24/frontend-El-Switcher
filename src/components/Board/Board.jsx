import { useContext } from 'react';
import { PlayMovementLogicContext } from '../../contexts/PlayMovementLogicProvider';
import { GameContext } from '../../contexts/GameProvider';
import ColorCard from '../ColorCard/ColorCard';

const Board = ({ board }) => {
  const { selectColorCard, canSelectColorCard, isSelectedColorCard } =
    useContext(PlayMovementLogicContext);

  const { foundFigures } = useContext(GameContext);

  const isPartOfFigure = (index) => {
    return foundFigures.some((figure) =>
      figure.some((chip) => chip.row * 6 + chip.column === index)
    );
  };

  return (
    <div className='fixed h-screen w-screen'>
      <div className='flex justify-center items-center h-screen'>
        <div className='grid grid-cols-6 grid-rows-6 gap-2'>
          {board.map((colorCard, index) => (
            <ColorCard
              key={index}
              color={colorCard.color}
              onClick={() => selectColorCard(colorCard)}
              disabled={!canSelectColorCard(colorCard)}
              isSelected={isSelectedColorCard(colorCard)}
              isPartOfFigure={isPartOfFigure(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
