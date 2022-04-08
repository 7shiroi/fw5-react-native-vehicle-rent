import {ALPHABETS} from './utils';

export const randomNumber = length => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
};

export const randomBookingCode = (length, alphabetsLength) => {
  let result = '';
  for (let i = 0; i < alphabetsLength; i++) {
    result += ALPHABETS[Math.floor(Math.random() * ALPHABETS.length)];
  }
  for (let i = 0; i < length - alphabetsLength; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
};
