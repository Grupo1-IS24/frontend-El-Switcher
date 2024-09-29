import ColorCard from "../ColorCard/ColorCard";

const Board = ({ board }) => {
  return (
    <div className="fixed h-screen w-screen">
      <div className="flex justify-center items-center h-screen">
        <div className="grid grid-cols-6 grid-rows-6">
          {board.map((colorCard, index) => (
            <ColorCard
              key={index}
              color={colorCard.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Board;