import {
  BLOCKED_CARD_IMAGE_PREFIX,
  IMAGE_FILE_EXTENSION,
  VALID_BLOCKED_COLORS,
} from '../constants/assetConstants';

const isValidBlockedColor = (blockedColor) => {
  return (
    blockedColor &&
    typeof blockedColor === 'string' &&
    VALID_BLOCKED_COLORS.includes(blockedColor.toLowerCase())
  );
};

/**
 * Returns the image path for a blocked color card based on the provided color.
 *
 * @param {string} blockedColor - The color of the blocked color in lowercase.
 * @returns {string} - The full image path for the blocked color card, or an empty string if no valid color is provided (e.g., if the input is not a string).
 */
export const getBlockedCardImagePath = (blockedColor) => {
  if (!isValidBlockedColor(blockedColor)) return '';

  return `${BLOCKED_CARD_IMAGE_PREFIX}${blockedColor.toLowerCase()}${IMAGE_FILE_EXTENSION}`;
};
