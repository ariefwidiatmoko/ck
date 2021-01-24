// Get Random Number
export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// Get Year Month
export const yearMonth = () => {
  const newDate = new Date();
  const year = newDate.getFullYear() + '';
  const yy = year.slice(2, 4);
  const month = newDate.getMonth() + 1 + '';
  const mm = month.length > 1 ? month : 0 + month;
  return yy + mm + '';
};
// Get Date Day
export const dateDay = () => {
  const newDate = new Date();
  const date = newDate.getDate() + '';
  const dd = date.length > 1 ? date : 0 + date;
  const dy = newDate.getDay();
  return [dd, dy];
};

export const numFormatted = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};
