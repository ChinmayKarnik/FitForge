// Replaces all regular spaces with a narrow no-break space (U+202F) for use in monospace fonts
export function thinSpace(text: string): string {
  return text.replace(/ /g, ' ');
}

// Returns the day of the week (e.g., 'Monday') for a given timestamp (number)
export function getDayOfWeek(timestamp: number): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(timestamp);
  return days[date.getDay()];
}

// Returns formatted date like 'Tue, Jun 9' for a given timestamp
export function formatDateString(timestamp: number): string {
  const date = new Date(timestamp);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return thinSpace(`${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`);
}

// Returns formatted time like '9:33 am' for a given timestamp
export function formatTimeString(timestamp: number): string {
  const date = new Date(timestamp);
  let hour = date.getHours();
  const minute = date.getMinutes();
  const ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12;
  if (hour === 0) hour = 12;
  const minuteStr = minute < 10 ? `0${minute}` : `${minute}`;
  return thinSpace(`${hour}:${minuteStr} ${ampm}`);
}
