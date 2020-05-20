import moment from "moment";


export const formatDate = (date) => {
  return moment(date).format(`L`);
};

export const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

export const getFormattedTimeDuration = (startDate, endDate) => {
  const difference = moment(endDate).diff(moment(startDate));
  return moment(difference).format(`DDD[D] H[H] mm[M]`);
};

export const dayCounterFormat = (date) => {
  return date.getMonth();
};

export const getRandomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomArrayItem = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

export const getShuffleArray = (arr, value) => {
  const copyArr = arr.slice(0);
  return copyArr.sort(() => Math.random() - 0.5).slice(0, value);
};

export const getRandomArray = (array) => {
  return (array) ? array.slice(0, getRandomInt(-1, array.length) + 1) : ``;
};

// генерит случайные dateFrom, dateTo
export const getRandomTime = () => {
  const targetTime = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValueHours = sign * getRandomInt(24, 144);
  const diffValueMinutes = sign * getRandomInt(0, 30);
  targetTime.setHours(targetTime.getHours() + diffValueHours);
  targetTime.setMinutes(targetTime.getMinutes() + diffValueMinutes);
  return targetTime;
};
