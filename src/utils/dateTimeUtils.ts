import { databaseController } from '../data/controllers/DatabaseController';

// Returns the day of the week (e.g., 'Monday') for a given timestamp (number)
export function getDayOfWeek(timestamp: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(timestamp);
  return days[date.getDay()];
}

// Returns a formatted date string like 'Jan 3 2026, 7:45 pm' for a given timestamp (number)
export function formatDateTimeString(timestamp: number): string {
  const date = new Date(timestamp);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  let hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12;
  if (hour === 0) hour = 12;
  const minuteStr = minute < 10 ? `0${minute}` : `${minute}`;
  return `${month} ${day} ${year}, ${hour}:${minuteStr} ${ampm}`;
}