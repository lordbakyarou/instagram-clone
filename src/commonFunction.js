// commonFunctions.js (or any appropriate file name)

export function displayDate(data) {
  const millisecondsPerSecond = 1000;
  const millisecondsPerMinute = millisecondsPerSecond * 60;
  const millisecondsPerHour = millisecondsPerMinute * 60;
  const millisecondsPerDay = millisecondsPerHour * 24;

  const start = new Date(data);
  const end = new Date();

  const timeDifference = Math.abs(end - start);

  const years = Math.floor(timeDifference / (365.25 * millisecondsPerDay));
  const months = Math.floor(
    (timeDifference % (365.25 * millisecondsPerDay)) /
      (30.44 * millisecondsPerDay)
  );
  const weeks = Math.floor(timeDifference / (7 * millisecondsPerDay));
  const days = Math.floor(timeDifference / millisecondsPerDay);
  const hours = Math.floor(
    (timeDifference % millisecondsPerDay) / millisecondsPerHour
  );
  const minutes = Math.floor(
    (timeDifference % millisecondsPerHour) / millisecondsPerMinute
  );
  const seconds = Math.floor(
    (timeDifference % millisecondsPerMinute) / millisecondsPerSecond
  );

  if (years !== 0) {
    return years + " years ago";
  }

  if (months !== 0) {
    return months + " months ago";
  }

  if (weeks !== 0) {
    return weeks + " weeks ago";
  }

  if (days !== 0) {
    return days + " days ago";
  }

  if (hours !== 0) {
    return hours + " hours ago";
  }

  if (minutes !== 0) {
    return minutes + " minutes ago";
  }

  if (seconds !== 0) {
    return seconds + " seconds ago";
  }
}

export function onlyDate(data) {
  const millisecondsPerSecond = 1000;
  const millisecondsPerMinute = millisecondsPerSecond * 60;
  const millisecondsPerHour = millisecondsPerMinute * 60;
  const millisecondsPerDay = millisecondsPerHour * 24;

  const start = new Date(data);
  const end = new Date();

  const timeDifference = Math.abs(end - start);

  const years = Math.floor(timeDifference / (365.25 * millisecondsPerDay));
  const months = Math.floor(
    (timeDifference % (365.25 * millisecondsPerDay)) /
      (30.44 * millisecondsPerDay)
  );
  const weeks = Math.floor(timeDifference / (7 * millisecondsPerDay));
  const days = Math.floor(timeDifference / millisecondsPerDay);
  const hours = Math.floor(
    (timeDifference % millisecondsPerDay) / millisecondsPerHour
  );
  const minutes = Math.floor(
    (timeDifference % millisecondsPerHour) / millisecondsPerMinute
  );
  const seconds = Math.floor(
    (timeDifference % millisecondsPerMinute) / millisecondsPerSecond
  );

  if (years !== 0) {
    return years + "yr";
  }

  if (months !== 0) {
    return months + "mo";
  }

  if (weeks !== 0) {
    return weeks + "w";
  }

  if (days !== 0) {
    return days + "d";
  }

  if (hours !== 0) {
    return hours + "h";
  }

  if (minutes !== 0) {
    return minutes + "m";
  }

  if (seconds !== 0) {
    return seconds + "s";
  }
}
