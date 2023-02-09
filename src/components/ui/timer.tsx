import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

const timerVariants = ['days', 'hours', 'minutes', 'seconds'] as const;
export type TimerVariant = typeof timerVariants[number];
export type TimerValues = Record<TimerVariant, number>;
type TimerProps = {
  inModal?: boolean;
  isSubmitted?: boolean;
  getValues: (values: TimerValues) => void;
};
const initTimerValues: TimerValues = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export const Timer: FC<TimerProps> = ({ isSubmitted, getValues, inModal }) => {
  const [values, setValues] = useState<TimerValues>(initTimerValues);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, valueAsNumber } = e.target;
    if (
      (name === 'days' && valueAsNumber > 6) ||
      (name === 'hours' && valueAsNumber > 23) ||
      ((name === 'minutes' || name === 'seconds') && valueAsNumber > 59)
    ) {
      return;
    }
    setValues(pv => ({ ...pv, [name]: valueAsNumber <= 0 ? 0 : valueAsNumber }));
  };

  const incrementTime = (type: TimerVariant) => {
    setValues(pv => {
      if (type === 'days' && pv[type] >= 6) {
        return { ...pv, [type]: 0 };
      }
      if (type === 'hours' && pv[type] >= 23) {
        return { ...pv, [type]: 0 };
      }
      if ((type === 'minutes' || type === 'seconds') && pv[type] >= 59) {
        return { ...pv, [type]: 0 };
      }
      return { ...pv, [type]: pv[type] + 1 };
    });
  };
  const decrementTime = (type: TimerVariant) => {
    setValues(pv => {
      if (type === 'days' && pv[type] <= 0) {
        return { ...pv, [type]: 6 };
      }
      if (type === 'hours' && pv[type] <= 0) {
        return { ...pv, [type]: 23 };
      }
      if ((type === 'minutes' || type === 'seconds') && pv[type] <= 0) {
        return { ...pv, [type]: 59 };
      }
      return { ...pv, [type]: pv[type] - 1 };
    });
  };

  const styleInput = inModal ? 'ring-neutral-500' : 'ring-color-base';
  const styleContainer = inModal
    ? 'bg-gradient-to-b from-stone-800 ring-neutral-500 text-neutral-100'
    : 'ring-color-base';

  useEffect(() => {
    getValues(values);
    if (isSubmitted) setValues(initTimerValues);
  }, [isSubmitted, getValues, values]);

  return (
    <div
      className={`${styleContainer} flex items-center justify-between rounded-md bg-opacity-10 py-6 px-3 text-color-base shadow-md ring-1 xs:justify-evenly xs:px-6`}>
      {timerVariants.map(variant => {
        const displayValue = values[variant] < 10 ? `0${values[variant]}` : `${values[variant]}`;

        return (
          <div key={variant}>
            <div className="relative flex flex-col items-start gap-2">
              <span className="text-lg tracking-wider xs:block">{variant.toUpperCase()}</span>

              <div className="flex items-center justify-between">
                <input
                  type={'number'}
                  max={variant === 'days' ? 6 : variant === 'hours' ? 23 : 59}
                  name={variant}
                  value={displayValue}
                  onChange={onChangeHandler}
                  className={`${styleInput} w-16 cursor-pointer rounded-lg bg-gradient-to-b from-neutral-900 to-neutral-800 p-4 text-center text-2xl text-neutral-100 outline-none ring-2 max-xs:scale-95 xs:w-24`}
                />
                <div className="ml-2 flex flex-col gap-2 xs:ml-4">
                  <button
                    type={'button'}
                    onClick={() => incrementTime(variant)}
                    className="rounded-md px-2 text-2xl ring-1 ring-neutral-600 hover:ring-neutral-400">
                    +
                  </button>
                  <button
                    type={'button'}
                    onClick={() => decrementTime(variant)}
                    className="rounded-md px-2 text-2xl ring-1 ring-neutral-600 hover:ring-neutral-400">
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const useTimer = () => {
  const [timer, setTimer] = useState<TimerValues>(initTimerValues);

  const getTimerValues = useCallback((values: TimerValues) => setTimer(values), []);

  return { timer, getTimerValues };
};
