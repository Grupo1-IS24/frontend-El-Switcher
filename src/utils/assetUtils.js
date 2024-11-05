import {
  BLOCKED_CARD_IMAGE_PREFIX,
  IMAGE_FILE_EXTENSION,
  VALID_BLOCKED_COLORS,
} from '../constants/assetConstants';

/**
 * Checks if the provided color is a valid blocked color.
 *
 * @param {string} blockedColor - The color to validate.
 * @returns {boolean} - Returns `true` if the color is valid and exists in the predefined list of blocked colors, `false` otherwise.
 */
const isValidBlockedColor = (blockedColor) => {
  return (
    blockedColor &&
    typeof blockedColor === 'string' &&
    VALID_BLOCKED_COLORS.includes(blockedColor.toLowerCase())
  );
};

/**
 * Constructs the file path for the blocked color card image based on the provided color.
 *
 * @param {string} blockedColor - The color for the blocked card image. Should be a valid string in lowercase.
 * @returns {string} - The complete image file path for the blocked color card if the color is valid; otherwise, returns an empty string.
 */
export const getBlockedCardImagePath = (blockedColor) => {
  if (!isValidBlockedColor(blockedColor)) return '';

  return `${BLOCKED_CARD_IMAGE_PREFIX}${blockedColor.toLowerCase()}${IMAGE_FILE_EXTENSION}`;
};
