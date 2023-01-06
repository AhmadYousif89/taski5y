import { getTimeDifference } from './get-time-difference';

describe('Test getTimeDifference function', () => {
  it("should return a string 'less than a minute ago' for time differences less than a second", () => {
    const pastTime = new Date();
    pastTime.setMilliseconds(pastTime.getMilliseconds() - 500);
    const timeString = pastTime.toISOString();
    expect(getTimeDifference(timeString)).to.equal('less than a minute ago');
  });

  it("should return a string in the format 'X minutes ago' for time differences less than an hour", () => {
    const pastTime = new Date();
    pastTime.setMinutes(pastTime.getMinutes() - 30);
    const timeString = pastTime.toISOString();
    const currentTime = new Date();
    const timeDifferenceInMinutes = Math.floor(
      (currentTime.getTime() - pastTime.getTime()) / 1000 / 60
    );
    const expectedResult = `${timeDifferenceInMinutes} minutes ago`;

    expect(getTimeDifference(timeString)).to.equal(expectedResult);
  });

  it("should return a string in the format 'X hours ago' for time differences less than a day", () => {
    const pastTime = new Date();
    pastTime.setHours(pastTime.getHours() - 12);
    const timeString = pastTime.toISOString();
    const currentTime = new Date();
    const timeDifferenceInHours = Math.floor(
      (currentTime.getTime() - pastTime.getTime()) / 1000 / 3600
    );
    const expectedResult = `${timeDifferenceInHours} hours ago`;

    expect(getTimeDifference(timeString)).to.equal(expectedResult);
  });

  it("should return a string in the format 'X days ago' for time differences less than a week", () => {
    const pastTime = new Date();
    pastTime.setDate(pastTime.getDate() - 3);
    const timeString = pastTime.toISOString();
    const currentTime = new Date();
    const timeDifferenceInDays = Math.floor(
      (currentTime.getTime() - pastTime.getTime()) / 1000 / 86400
    );
    const expectedResult = `${timeDifferenceInDays} days ago`;

    expect(getTimeDifference(timeString)).to.equal(expectedResult);
  });

  it("should return a string 'X week ago' for time differences less than a month", () => {
    const pastTime = new Date();
    pastTime.setDate(pastTime.getDate() - 7);
    const timeString = pastTime.toISOString();
    const currentTime = new Date();
    const timeDifferenceInWeeks = Math.floor(
      (currentTime.getTime() - pastTime.getTime()) / 1000 / 604800
    );
    expect(getTimeDifference(timeString)).to.equal(`${timeDifferenceInWeeks} week ago`);
  });

  it("should return a string 'X month ago' for time differences more than a month", () => {
    const pastTime = new Date();
    pastTime.setMonth(pastTime.getMonth() - 2);
    const timeString = pastTime.toISOString();
    const currentTime = new Date();
    const timeDifferenceInMonths = Math.floor(
      (currentTime.getTime() - pastTime.getTime()) / 1000 / 2592000
    );
    expect(getTimeDifference(timeString)).to.equal(`${timeDifferenceInMonths} month ago`);
  });
});
