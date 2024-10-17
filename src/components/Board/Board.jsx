import { useContext } from 'react';
import { GameContext } from '../../contexts/GameProvider';
import ColorCard from '../ColorCard/ColorCard';
import usePlayMovementLogic from '../../hooks/usePlayMovementLogic';
import usePlayFigureLogic from '../../hooks/usePlayFigureLogic';

const Board = ({ board }) => {
  const { selectColorCard, canSelectColorCard, isSelectedColorCard } =
    usePlayMovementLogic();

  const {
    selectFigureColorCard,
    canSelectFigureColorCard,
    isSelectedFigureColorCard,
  } = usePlayFigureLogic();

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
              disabled={
                !canSelectColorCard(colorCard) &&
                !canSelectFigureColorCard(colorCard)
              }
              isSelected={
                isSelectedColorCard(colorCard) ||
                isSelectedFigureColorCard(colorCard)
              }
              onClick={() => {
                if (canSelectColorCard(colorCard)) selectColorCard(colorCard);
                else if (canSelectFigureColorCard(colorCard))
                  selectFigureColorCard(colorCard);
              }}
              isPartOfFigure={isPartOfFigure(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
