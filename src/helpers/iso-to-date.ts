export const formatISOString = (date?: string | null): string => {
  if (!date) return '';
  const currentDate = new Date();
  const inputDate = new Date(date);

  const currentOffset = currentDate.getTimezoneOffset();
  const inputDateOffset = inputDate.getTimezoneOffset();
  const timeDifference = inputDate.getTime() - currentDate.getTime();
  inputDate.setUTCMinutes(inputDate.getUTCMinutes() + (currentOffset - inputDateOffset));

  let seconds = Math.floor(timeDifference / 1000);

  const days = Math.floor(seconds / (60 * 60 * 24));
  seconds -= days * 60 * 60 * 24;

  const hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * 60 * 60;

  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
};
