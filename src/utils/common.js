// import moment from "moment";

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : value;
};

export const getTimeFormatDHM = (dateMs) => {
  let date = dateMs / 60000;
  if (date < 60 && date >= 0) {
    date = `${date}M`;
  }
  if (date < 1440 && date >= 60) {
    date = `${castTimeFormat(Math.floor(date / 60))}H ${castTimeFormat(date % 60)}M`;
  }
  if (date < 86400 && date >= 1000) {
    date = `${castTimeFormat(Math.floor(date / 1440))}D ${castTimeFormat(Math.floor((date % 1440) / 60))}H ${castTimeFormat((date % 1440) % 60)}M`;
  }
  return date;
};

export const dayCounterFormat = (date) => {
  return date.getMonth();
};

const getDateTimeFormat = (date) => {
  return `${date.getFullYear()}-${castTimeFormat(1 + date.getMonth())}-${date.getDate()}`;
};

const getTimeFormat = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());
  return `${hours}:${minutes}`;
};

// генерит случайное число
const getRandomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

// генерит случайный элемент массива
const getRandomArrayItem = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

// генерит перемешанный массив нужной длины
const getShuffleArray = (arr, value) => {
  const copyArr = arr.slice(0);
  return copyArr.sort(() => Math.random() - 0.5).slice(0, value);
};

export const getRandomArray = (array) => {
  return (array) ? array.slice(0, getRandomInt(-1, array.length) + 1) : ``;
};

// генерит случайные dateFrom, dateTo
const getRandomTime = () => {
  const targetTime = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValueHours = sign * getRandomInt(24, 144);
  const diffValueMinutes = sign * getRandomInt(0, 30);
  targetTime.setHours(targetTime.getHours() + diffValueHours);
  targetTime.setMinutes(targetTime.getMinutes() + diffValueMinutes);

  return targetTime;

};

export {getDateTimeFormat, getTimeFormat, getRandomInt, getRandomArrayItem, getShuffleArray, getRandomTime};
