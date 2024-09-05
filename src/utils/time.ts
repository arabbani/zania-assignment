export function getTimeDifference(oldTime: Date, newTime: Date) {
  if (!newTime || !oldTime) {
    return;
  }

  let seconds = (newTime.getTime() - oldTime.getTime()) / 1000;
  seconds = Math.trunc(seconds);

  if (seconds < 60) {
    return `${seconds} seconds`;
  }

  let minutes = seconds / 60;
  minutes = Math.trunc(minutes);
  seconds = seconds % 60;

  if (minutes < 60) {
    return `${minutes} minutes ${seconds} seconds`;
  }

  let hour = minutes / 60;
  hour = Math.trunc(hour);
  minutes = minutes % 60;

  return `${hour} hours ${minutes} minutes ${seconds} seconds`;
}
