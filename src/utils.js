const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : value;
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
