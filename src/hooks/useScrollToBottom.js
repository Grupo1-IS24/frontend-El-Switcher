import { useEffect, useRef } from 'react';

/**
 * This hook scrolls to the bottom of the container.
 *
 * @param {any} dependency The dependency to watch for changes.
 * @returns {Object} The reference to the container.
 */
const useScrollToBottom = (dependency, threshold = 240) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetHeight, scrollHeight, scrollTop } = containerRef.current;

      if (scrollHeight <= scrollTop + offsetHeight + threshold) {
        containerRef.current.scrollTo({
          top: scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [dependency]);

  return containerRef;
};

export default useScrollToBottom;
