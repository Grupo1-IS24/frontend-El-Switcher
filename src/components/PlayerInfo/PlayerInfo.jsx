const PlayerInfo = ({ playerName, index }) => {
  const positionStyles = [
    'bottom-10 left-16', // corner bottom left
    'top-10 left-16', // corner top left
    'top-10 right-16', // corner top right
    'bottom-10 right-16', // corner bottom right
  ];

  return (
    <div className={`absolute ${positionStyles[index]} p-2`}>
      <p className='lekton-bold text-white text-lg'>{playerName}</p>
    </div>
  );
};

export default PlayerInfo;
