export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const FULL_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const getDaysInMonth = (month) => {
  return new Date(2021, month + 1, 0).getDate();
};

export const getDayOfWeek = (month, dayNumber, year = 2021) => {
  return new Date(year, month, dayNumber).toDateString().slice(0, 3);
};
