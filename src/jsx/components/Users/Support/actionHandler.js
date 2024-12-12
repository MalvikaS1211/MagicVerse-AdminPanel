export function getAmPm(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  return hours >= 12 ? "PM" : "AM";
}

export function formatTime(time) {
  return time <= 9 ? "0" + time : time;
}