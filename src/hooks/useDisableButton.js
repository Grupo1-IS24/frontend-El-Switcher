import { useState } from 'react';

/**
 * Custom hook to handle button disabling during the execution of an asynchronous function.
 *
 * This hook disables the button when the asynchronous operation starts, and re-enables it once the operation finishes,
 * regardless of whether it was successful or encountered an error.
 *
 * @param {Function} asyncFunction - The asynchronous function to be executed when the button is clicked.
 * @returns {Array} An array containing:
 *  - {boolean} isDisabled - A boolean indicating whether the button is currently disabled.
 *  - {Function} handleClick - The function to be used as the button's onClick handler, managing the execution of the async function and button disabling.
 */
const useDisableButton = (asyncFunction) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = async (...args) => {
    setIsDisabled(true);
    try {
      await asyncFunction(...args)
    } finally {
      setIsDisabled(false);
    }
  };

  return [isDisabled, handleClick];
};

export default useDisableButton;
