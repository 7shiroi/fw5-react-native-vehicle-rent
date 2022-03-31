export const dateToString = (
  date,
  options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'},
) => {
  return date.toLocaleDateString('en-US', options);
};

export const stringToIdr = string => {
  return Number(string).toLocaleString('id-ID');
};
