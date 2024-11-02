import {
  BLOCKED_CARD_IMAGE_PREFIX,
  IMAGE_FILE_EXTENSION,
} from '../constants/assetPaths';

/**
 * Returns the image path for a blocked color card based on the provided color.
 *
 * @param {string} blockedColor - The color of the blocked color in lowercase.
 * @returns {string} - The full image path for the blocked color card, or an empty string if no valid color is provided (e.g., if the input is not a string).
 */
export const getBlockedCardImagePath = (blockedColor) => {
  if (!blockedColor || typeof blockedColor !== 'string') return '';

  return `${BLOCKED_CARD_IMAGE_PREFIX}${blockedColor.toLowerCase()}${IMAGE_FILE_EXTENSION}`;
};
