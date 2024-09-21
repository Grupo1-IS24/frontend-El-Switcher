/**
 * Get a value from sessionStorage
 *
 * By default, this function will parse the stored value using JSON.parse.
 * If the stored value is a simple string that does not represent a JSON object,
 * array, or other data types (e.g., a number or boolean), it is recommended to
 * provide a custom parse function.
 *
 * @param {string} key - The key to get the value for
 * @param {any} defaultValue - The default value to return if the key is not found
 * @param {Function} parse - A function to parse the stored value. By default, this is JSON.parse.
 * @returns {any} The value from sessionStorage, or the default value if the key is not found
 */
export const getSessionStorageValue = (
  key,
  defaultValue,
  parse = (value) => JSON.parse(value)
) => {
  const storedValue = sessionStorage.getItem(key);
  return storedValue !== null ? parse(storedValue) : defaultValue;
};

/**
 * Set a value in sessionStorage
 *
 * By default, this function will stringify the value using JSON.stringify.
 * If the value is a string, then it is recommended to provide a custom stringify function.
 *
 * @param {string} key - The key to set the value for
 * @param {any} value - The value to set
 * @param {Function} stringify - A function to stringify the value
 * @returns {void}
 */
export const setSessionStorageValue = (
  key,
  value,
  stringify = (value) => JSON.stringify(value)
) => {
  sessionStorage.setItem(key, stringify(value));
};

/**
 * Remove a value from sessionStorage
 * @param {string} key - The key to remove the value for
 * @returns {void}
 */
export const removeSessionStorageValue = (key) => {
  sessionStorage.removeItem(key);
};
