/**
 * helper function that takes a callback function as a first arg and number of seconds as a second arg (the time to await before running cb()).
 * @param {function} cb - a callback function.
 * @param {number} [sec=3] - time to wait in seconds defaults to 3 sec.
 * @returns {Promise} new promise of type unknown.
 */
export const wait = (cb: () => void, sec = 3): Promise<unknown> =>
  new Promise(resolve => setTimeout(() => resolve(cb()), sec * 1000));
