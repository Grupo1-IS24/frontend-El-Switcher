const FigureCard = ({ figure = 0, difficulty = 0 }) => {
  const capitalizeFirstLetter = (word) =>
    word.charAt(0).toUpperCase() + word.slice(1);

  const assets = '/src/assets/FigureCards/';
  const isEasy = difficulty === 'easy';
  const isHard = difficulty === 'hard';
  const isNumber = typeof figure === 'number';
  const isString = typeof difficulty === 'string';

  const isValidFigure =
    (isEasy && figure >= 1 && figure <= 18) ||
    (isHard && figure >= 1 && figure <= 7);

  const areInputsValid =
    isNumber && isString && (isEasy || isHard) && isValidFigure;

  const path = areInputsValid
    ? `${assets}${capitalizeFirstLetter(difficulty)}/fig${figure}.svg`
    : `${assets}back-fig.svg`;
  const alt = areInputsValid
    ? `Figura ${difficulty} ${figure}`
    : 'Figura de espaldas';

  return <img src={path} alt={alt} className='w-[100px] h-[100px]' />;
};

export default FigureCard;
