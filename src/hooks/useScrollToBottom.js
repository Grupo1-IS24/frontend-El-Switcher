import { useEffect, useRef } from 'react';

const scrollToBottom = (containerRef) => {
  containerRef.current.scrollTop = containerRef.current.scrollHeight;
};

const canScroll = (scrollHeight, scrollTop, offsetHeight, threshold) => {
  return scrollHeight <= scrollTop + offsetHeight + threshold;
};

const easeLinear = (currentTime, startValue, changeInValue, duration) => {
  return (changeInValue * currentTime) / duration + startValue;
};

const smoothScroll = (containerRef, start, end, duration) => {
  const change = end - start;
  const increment = 20;
  let currentTime = 0;

  const animateScroll = () => {
    currentTime += increment;
    containerRef.current.scrollTop = easeLinear(
      currentTime,
      start,
      change,
      duration
    );

    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  animateScroll();
};

/**
 * This hook scrolls to the bottom of the container smoothly on initialization and only when necessary on updates.
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
  const hasScrolledInitially = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!hasScrolledInitially.current) {
      scrollToBottom(containerRef);
      hasScrolledInitially.current = true;
      return;
    }

    const { offsetHeight, scrollHeight, scrollTop } = containerRef.current;

    if (canScroll(scrollHeight, scrollTop, offsetHeight, threshold)) {
      smoothScroll(containerRef, scrollTop, scrollHeight, scrollDuration);
    }
  }, [dependency, threshold, scrollDuration]);

  return containerRef;
};

export default useScrollToBottom;
