import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

const _7_Days = [...Array(7).keys()].map(i => `0${i}`);
const _24_Hour = [...Array(24).keys()].map(i => `${i < 10 ? `0${i}` : `${i}`}`);
const _60_Min_Sec = [...Array(60).keys()].map(i => `${i < 10 ? `0${i}` : `${i}`}`);

const timerVariants = ['days', 'hours', 'minutes', 'seconds'] as const;

export type TimerVariant = typeof timerVariants[number];
export type TimerValues = Record<TimerVariant, number>;
type TimerProps = {
  isSubmitted?: boolean;
  getValues: (values: TimerValues) => void;
};

const initTimerValues: TimerValues = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export const Timer: FC<TimerProps> = ({ isSubmitted, getValues }) => {
  const [values, setValues] = useState<TimerValues>(initTimerValues);

  const timerHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setValues(pv => ({ ...pv, [e.target.name]: +e.target.value }));
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

  useEffect(() => {
    getValues(values);
    if (isSubmitted) setValues(initTimerValues);
  }, [isSubmitted, getValues, values]);

  return (
    <div className="flex items-center justify-around gap-4">
      {timerVariants.map(variant => {
        const data = variant === 'days' ? _7_Days : variant === 'hours' ? _24_Hour : _60_Min_Sec;
        const displayValue = values[variant] < 10 ? `0${values[variant]}` : `${values[variant]}`;

        return (
          <div key={variant}>
            <div className="flex items-center">
              <span className="mr-4 hidden text-lg tracking-wider xs:block">
                {variant.toUpperCase()}
              </span>

              <div className="rounded-xl bg-neutral-900 p-4">
                <select
                  name={variant}
                  className="w-full cursor-pointer appearance-none bg-neutral-900 text-center text-2xl text-color-base outline-none"
                  value={displayValue}
                  onChange={timerHandler}>
                  {data.map((h, i) => (
                    <option value={h} key={i}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div className="ml-2 flex flex-col gap-2">
                <button
                  type={'button'}
                  onClick={() => incrementTime(variant)}
                  className="rounded-md px-2 text-xl ring-1 ring-neutral-600 hover:ring-neutral-400">
                  +
                </button>
                <button
                  type={'button'}
                  onClick={() => decrementTime(variant)}
                  className="rounded-md px-2 text-xl ring-1 ring-neutral-600 hover:ring-neutral-400">
                  -
                </button>
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
