const FigureCard = ({
  figure = 0,
  difficulty = 0,
  isSelected = false,
  disabled = true,
  onClick = null,
  isBlocked = false,
}) => {
  const capitalizeFirstLetter = (word) =>
    word.charAt(0).toUpperCase() + word.slice(1);

  const assets = '/src/assets/FigureCards/';
  const isEasy = difficulty === 'easy';
  const isHard = difficulty === 'hard';
  const isNumber = typeof figure === 'number';
  const isString = typeof difficulty === 'string';

  const isValidFigure =
    (isEasy && figure >= 1 && figure <= 7) ||
    (isHard && figure >= 1 && figure <= 18);

  const areInputsValid =
    isNumber && isString && (isEasy || isHard) && isValidFigure;

  const path = areInputsValid
    ? `${assets}${capitalizeFirstLetter(difficulty)}/fig${figure}.svg`
    : `${assets}back-fig.svg`;
  const alt = areInputsValid
    ? `Figura ${difficulty} ${figure}`
    : 'Figura de espaldas';

  return (
    <button
      className={`transition-transform duration-300 
        ${isSelected ? 'animate-shriggle' : ''} 
        ${disabled ? 'cursor-not-allowed' : ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      <img
        src={path}
        alt={alt}
        className={`pc:w-[100px] pc:h-[100px] w-[70px] h-[70px] ${isBlocked ? 'grayscale' : ''}`}
      />
    </button>
  );
};

export default FigureCard;
