/**
 * Check if two color cards are equal
 *
 * @param {object} colorCard1 - The first color card to compare.
 * @param {object} colorCard2 - The second color card to compare.
 * @returns {boolean} True if the color cards are equal, otherwise false.
 */
export const isEqualColorCard = (colorCard1, colorCard2) => {
  return (
    colorCard1.row === colorCard2.row &&
    colorCard1.column === colorCard2.column &&
    colorCard1.color === colorCard2.color
  );
};
