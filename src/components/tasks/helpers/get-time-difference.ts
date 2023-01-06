/**
 * Returns a string representing the difference between a given time and the current time
 * in a human-readable format.
 * @param {string | Date} time - The time string in any format, or a Date object.
 * @returns {string} A string representing the time difference in a human-readable format.
 * @example
 * getTimeDifference("2022-12-31T21:56:41.997Z"); // "5 days ago"
 * getTimeDifference(new Date("2022-12-31T21:56:41.997Z")); // "5 days ago"
 */
export const getTimeDifference = (time: string | Date): string => {
  let givenTime: Date;
  if (time instanceof Date) {
    givenTime = time;
  } else {
    const timestamp = Date.parse(time);
    givenTime = new Date(timestamp);
  }

  // Get the current time
  const currentTime = new Date();
  // Calculate the difference between the two times in milliseconds
  const timeDifference = currentTime.getTime() - givenTime.getTime();
  // Convert the time difference to seconds
  const timeDifferenceInSeconds = Math.floor(timeDifference / 1000);
  // Return a human-readable string representing the time difference
  switch (true) {
    case timeDifferenceInSeconds < 60: {
      return 'less than a minute ago';
    }
    case timeDifferenceInSeconds < 3600: {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} minutes ago`;
    }
    case timeDifferenceInSeconds < 86400: {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} hours ago`;
    }
    case timeDifferenceInSeconds < 604800: {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} days ago`;
    }
    case timeDifferenceInSeconds < 2592000: {
      const week = Math.floor(timeDifferenceInSeconds / 604800);
      return `${week} week ago`;
    }
    case timeDifferenceInSeconds < 31536000: {
      const month = Math.floor(timeDifferenceInSeconds / 2592000);
      return `${month} month ago`;
    }
    default:
      return 'just now';
  }
};
