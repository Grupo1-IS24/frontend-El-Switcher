import ColorCard from '../ColorCard/ColorCard';
import usePlayMovementLogic from '../../hooks/usePlayMovementLogic';
import usePlayFigureLogic from '../../hooks/usePlayFigureLogic';
import useFoundFigures from '../../hooks/useFoundFigures';

const Board = ({ board }) => {
  const { selectColorCard, canSelectColorCard, isSelectedColorCard } =
    usePlayMovementLogic();

  const {
    selectFigureColorCard,
    canSelectFigureColorCard,
    isSelectedFigureColorCard,
  } = usePlayFigureLogic();

  const { isColorCardInAnyFigure } = useFoundFigures();

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
              isPartOfFigure={isColorCardInAnyFigure(colorCard)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
