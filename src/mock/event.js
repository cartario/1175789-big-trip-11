import {EVENT_TYPES, DESTINATION_POINTS, DESCRIPTION_ITEMS} from "../const.js";
import {getRandomInt, getRandomArrayItem, getShuffleArray, getRandomTime} from "../utils/common.js";


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

// генерит массив фотографий лимитированной длинны
const generatePhotosArray = () => {
  return new Array(getRandomInt(1, 20))
    .fill(``);
};

const photosArray = generatePhotosArray();

// генерит структуру photos
const generatePhotosObject = () => {
  return photosArray.map(() => {
    return {
      src: `http://picsum.photos/248/152?r=${Math.random()}`,
      description: getRandomArrayItem(DESCRIPTION_ITEMS),
    };
  });
};

// генерит структуру Destination
const generateDestination = () => {
  return {
    name: getRandomArrayItem(DESTINATION_POINTS),
    description: getRandomArrayItem(DESCRIPTION_ITEMS),
    photos: generatePhotosObject()};
};

// генерит общую структуру одного обьекта
const generateEvent = () => {
  return {
    id: getRandomInt(0, 10),
    eventType: getRandomArrayItem(EVENT_TYPES),
    offers: getShuffleArray(offerItems, getRandomInt(0, offerItems.length)),
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
