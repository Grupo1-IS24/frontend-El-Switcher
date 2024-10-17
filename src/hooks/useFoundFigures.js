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

  const isColorCardInAnyFigure = useCallback(
    (targetColorCard) =>
      foundFigures.some((figureColorCards) =>
        figureColorCards.some((colorCard) =>
          isEqualColorCard(colorCard, targetColorCard)
        )
      ),
    [foundFigures]
  );

  return { findFigureByColorCard, isColorCardInAnyFigure };
};

export default useFoundFigures;
