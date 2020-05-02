import {EVENT_TYPES, DESTINATION_POINTS, DESCRIPTION_ITEMS} from "../const.js";
import {getRandomInt, getRandomArray, getRandomArrayItem, getRandomTime} from "../utils/common.js";


const offerItems = [{
  title: `Order Uber`,
  price: 20,
}, {
  title: `Add luggage`,
  price: 30,
}, {
  title: `Switch to comfort class`,
  price: 100,
}, {
  title: `Add meal`,
  price: 15,
}, {
  title: `Choose seats`,
  price: 5,
}, {
  title: `Travel by train`,
  price: 40,
}];

export const offersForTypes = EVENT_TYPES.map((it) => Object.assign({}, it, {offers: getRandomArray(offerItems)}));

const generatePhotos = (count) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return arr.slice(getRandomInt(0, count));
};

const generateDestination = () => {
  return {
    name: getRandomArrayItem(DESTINATION_POINTS),
    description: getRandomArrayItem(DESCRIPTION_ITEMS),
    photos: generatePhotos(10)};
};

// генерит общую структуру одного обьекта
const generateEvent = () => {
  return {
    id: getRandomInt(0, 10),
    eventType: getRandomArrayItem(offersForTypes),
    offers: getRandomArrayItem(offersForTypes).offers,
    dateFrom: getRandomTime(),
    dateTo: getRandomTime(),
    destination: generateDestination(),
    basePrice: getRandomInt(0, 500),
    isFavorite: Math.random() > 0.5,
  };
};

// генерит пустой массив обьектов общей структуры случайной длины

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
