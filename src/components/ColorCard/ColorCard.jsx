const ColorCard = ({ color }) => {
  const colorStyle = {
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
  };

  return (
    <button
      className={`w-28 h-28 ${colorStyle[color] ?? 'bg-gray-500'} border border-black`}
    />
  );
};

export default ColorCard;
