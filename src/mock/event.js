import {EVENT_TYPES, DESTINATION_POINTS, DESCRIPTION_ITEMS} from "../const.js";
import {getRandomInt, getRandomArrayItem, getRandomTime} from "../utils/common.js";

const generatePhotos = (count) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return arr.slice(getRandomInt(0, count));
};

export const generateDestination = () => {
  return {
    name: getRandomArrayItem(DESTINATION_POINTS),
    description: getRandomArrayItem(DESCRIPTION_ITEMS),
    pictures: generatePhotos(10)};
};

// генерит общую структуру одного обьекта
const generateEvent = () => {
  return {
    id: getRandomInt(0, 10),
    eventType: getRandomArrayItem(EVENT_TYPES),
    dateFrom: getRandomTime(),
    dateTo: getRandomTime(),
    destination: generateDestination(),
    basePrice: getRandomInt(0, 500),
    isFavorite: Math.random() > 0.5,
  };
};

const dataIsEmptySize = 0;

const generateEvents = (count) => {
  if (count === null || count === dataIsEmptySize) {
    return dataIsEmptySize;
  }

  const result = new Array(count)
    .fill(``)
    .map(generateEvent);
  return result;
};

export {generateEvent, generateEvents};
