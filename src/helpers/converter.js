import qs from 'qs';

export const dateToString = (
  date,
  options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'},
) => {
  return date.toLocaleDateString('en-US', options);
};

export const stringToIdr = string => {
  return Number(string).toLocaleString('id-ID');
};

export const getFirstName = string => {
  return string.split(' ').slice(0, -1).join(' ');
};

export const getLastName = string => {
  return string.split(' ').slice(-1).join('');
};

export const addDays = (date, days) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const rnFetchDataToObject = string => {
  return string.includes('message')
    ? qs.parse(
        string
          .replace('{', '')
          .replace('}', '')
          .replaceAll(':', '=')
          .replaceAll(',', '&')
          .replace('"success"', 'success')
          .replace('"message"', 'message'),
      )
    : qs.parse(
        string
          .replace('{', '')
          .replace('}', '')
          .replaceAll(':', '=')
          .replaceAll(',', '&')
          .replace('"success"', 'success')
          .replace('"error"', 'error'),
      );
};
