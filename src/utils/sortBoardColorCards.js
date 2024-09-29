/**
 * Sorts the color cards in the board by row and column.
 *
 * @param {List} board The board with the color cards.
 * @returns {List} The board with the color cards sorted by row and column.
 */
export const sortBoardColorCards = (board) => {
  return board.toSorted((colorCardA, colorCardB) => {
    if (colorCardA.row === colorCardB.row) {
      return colorCardA.column - colorCardB.column;
    }

    return colorCardA.row - colorCardB.row;
  });
};
