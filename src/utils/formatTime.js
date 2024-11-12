/**
 * Converts time in seconds to MM:SS format.
 *
 * @param {number} timeInSeconds - Time in seconds.
 * @returns {string} - Formatted time in MM:SS.
 */
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default formatTime;
