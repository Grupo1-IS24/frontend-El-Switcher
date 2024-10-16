import ColorCard from '../ColorCard/ColorCard';
import usePlayMovementLogic from '../../hooks/usePlayMovementLogic';

const Board = ({ board }) => {
  const { selectColorCard, canSelectColorCard, isSelectedColorCard } =
    usePlayMovementLogic();

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
