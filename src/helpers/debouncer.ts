import { ChangeEvent } from 'react';
/**
 * Returns a debounced version of a callback function.
 * The debounced function will only be called after a specified delay has passed without it being called.
 * This can be useful for rate-limiting events that may be triggered frequently.
 * @param {function} callback - The callback function to be debounced.
 * @param {number} [delay=1000] - The delay in milliseconds before the callback function will be called.
 * @returns {function} A new function that takes an event as argument.
 * @example
 * const newDebouncer = debounce((e) => doQuerySearch(e.target.value))
 * const newDebouncer = debounce((e) => doQuerySearch(e.target.value), 500)
 */
export const debounce = (
  callback: (e: ChangeEvent<HTMLInputElement>) => any,
  delay = 1000
): ((e: ChangeEvent<HTMLInputElement>) => void) => {
  let timeout: number | NodeJS.Timeout;
  return (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback(e);
    }, delay);
  };
};
