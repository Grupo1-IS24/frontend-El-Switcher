const ColorCard = ({ color }) => {
  const colorStyle = {
    RED: 'bg-red-500',
    BLUE: 'bg-blue-500',
    GREEN: 'bg-green-500',
    YELLOW: 'bg-yellow-500',
  };

  return (
    <button
      className={`w-28 h-28 ${colorStyle[color] ?? 'bg-gray-500'} border border-black`}
    />
  );
};

export default ColorCard;
