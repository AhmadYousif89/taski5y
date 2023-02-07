import { TimerValues } from 'components/ui';

export const timerValueToISO = (values: TimerValues): string | null => {
  const { days, hours, minutes, seconds } = values;
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    return null;
  }

  const date = new Date();

  date.setDate(date.getDate() + days);
  date.setHours(date.getHours() + hours);
  date.setMinutes(date.getMinutes() + minutes);
  date.setSeconds(date.getSeconds() + seconds);

  const isoDate = date.toISOString();
  return isoDate;
};
