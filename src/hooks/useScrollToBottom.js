import { useEffect, useRef } from 'react';

/**
 * This hook scrolls to the bottom of the container smoothly and only when necessary.
 *
 * @param {any} dependency The dependency to watch for changes.
 * @param {number} threshold The distance from the bottom to trigger scrolling.
 * @param {number} scrollDuration The duration of the scroll animation in milliseconds.
 * @returns {Object} The reference to the container.
 */
const useScrollToBottom = (
  dependency,
  threshold = 240,
  scrollDuration = 1000
) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Easing function for smooth scrolling.
    const easeLinear = (currentTime, startValue, changeInValue, duration) =>
      (changeInValue * currentTime) / duration + startValue;

    if (containerRef.current) {
      const { offsetHeight, scrollHeight, scrollTop } = containerRef.current;

      // If the user is close to the bottom of the container, scroll to the bottom
      if (scrollHeight <= scrollTop + offsetHeight + threshold) {
        const start = scrollTop;
        const change = scrollHeight - start;
        const increment = 20;
        let currentTime = 0;

        const animateScroll = () => {
          currentTime += increment;
          containerRef.current.scrollTop = easeLinear(
            currentTime,
            start,
            change,
            scrollDuration
          );

          if (currentTime < scrollDuration) {
            requestAnimationFrame(animateScroll);
          }
        };

        animateScroll();
      }
    }
  }, [dependency, threshold, scrollDuration]);

  return containerRef;
};

export default useScrollToBottom;
