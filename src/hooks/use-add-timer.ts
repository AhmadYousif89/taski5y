import { useMemo, useCallback } from 'react';

/**
 *  @function useAddTimer
 *  @returns {Object} An object containing two properties, timers and addTimer.
 *  @property {NodeJS.Timeout[]} timers - An array of NodeJS timeouts.
 *  @property {function} addTimer - A callback function that allows for the creation and manipulation of a single timer.
 *  @description useAddTimer hook returns an object containing two properties, timers and addTimer. The timers property is an array of NodeJS timeouts, and the addTimer property is a callback function that allows for the creation and manipulation of a single timer. The function can add a new timer to the timers array or clear and replace an existing timer in the array. The callback function passed as an argument is executed once the timer expires.
 * @example
  const handleClick = () => {
    addTimer(() => console.log('First Timer'), 5); // will be replaced with the second timer
    addTimer(() => console.log('Second Timer'), 5); // will be logged after 5 seconds
  };
 */
export const useAddTimer = (): {
  timers: NodeJS.Timeout[];
  addTimer: (cb: () => void, duration: number) => void;
} => {
  const timers: NodeJS.Timeout[] = useMemo(() => [], []);

  const addTimer = useCallback(
    (cb: () => void, duration: number) => {
      if (timers.length === 0) {
        const timer = setTimeout(() => {
          cb();
          timers.shift();
        }, duration * 1000);
        timers.push(timer);
      } else {
        clearTimeout(timers[0]);
        timers[0] = setTimeout(() => {
          cb();
          timers.shift();
        }, duration * 1000);
      }
    },
    [timers]
  );

  return { timers, addTimer };
};
