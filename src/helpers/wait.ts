/**
 * Returns a Promise that resolves after a specified number of seconds.
 * @param {function} cb - A callback function to be called when the Promise is resolved.
 * @param {number} [sec=3] - The number of seconds to wait before resolving the Promise.
 * @returns {Promise<unknown>} A Promise that resolves after the specified number of seconds.
 * @example
 * wait(() => WaitFor3SecAndDoSomething()).then(() => doSomethingElse())
 * wait(() => WaitFor5SecAndDoSomething(), 5).then(() => doSomethingElse())
 */
export const wait = (cb: () => void, sec = 3): Promise<unknown> =>
  new Promise(resolve => setTimeout(() => resolve(cb()), sec * 1000));
