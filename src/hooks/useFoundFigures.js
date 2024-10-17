import { useContext, useCallback } from 'react';
import { GameContext } from '../contexts/GameProvider';
import { isEqualColorCard } from '../utils/isEqualColorCard';

const useFoundFigures = () => {
  const { foundFigures } = useContext(GameContext);

  const findFigureByColorCard = useCallback(
    (targetColorCard) => {
      return (
        foundFigures.find((figureColorCards) =>
          figureColorCards.some((colorCard) =>
            isEqualColorCard(colorCard, targetColorCard)
          )
        ) ?? []
      );
    },
    [foundFigures]
  );

  const isColorCardInFoundFigure = useCallback(
    (colorCard) => findFigureByColorCard(colorCard).length > 0,
    [findFigureByColorCard]
  );

  return { findFigureByColorCard, isColorCardInFoundFigure };
};

export default useFoundFigures;
