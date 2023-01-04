import { ChangeEvent } from 'react';
type DebounceType = (e: ChangeEvent<HTMLInputElement>) => void;
/**
 * Returns a debounced version of a callback function.
 * The debounced function will only be called after a specified delay has passed without it being called.
 * This can be useful for rate-limiting events that may be triggered frequently.
 * @param {function} cb - The callback function to be debounced.
 * @param {number} [delay=1000] - The delay in milliseconds before the callback function will be called.
 * @returns {function} A new function that takes an event as argument.
 */
export const debounce = (cb: DebounceType, delay = 1000): DebounceType => {
  let timeout: number | NodeJS.Timeout;
  return (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(e);
    }, delay);
  };
};
