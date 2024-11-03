import { useEffect, useRef } from 'react';

/**
 * This hook scrolls to the bottom of the container.
 *
 * @param {any} dependency The dependency to watch for changes.
 * @returns {Object} The reference to the container.
 */
const useScrollToBottom = (dependency) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [dependency]);

  return containerRef;
};

export default useScrollToBottom;
