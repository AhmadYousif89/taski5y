import { ChangeEvent } from 'react';

export const debounce = (
  cb: (e: ChangeEvent<HTMLInputElement>) => { type: string; payload: any } | void,
  delay = 1000,
) => {
  let timeout: number | NodeJS.Timeout;
  return (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(event);
    }, delay);
  };
};
