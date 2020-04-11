import {EVENT_TYPES, DESTINATION_POINTS, DESCRIPTION_ITEMS} from "../const.js";

export const getRandomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomArrayItem = (array) => {
  return array[getRandomInt(0, array.length - 1)];
};

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
const generatePhotosArray = (limit) => {
  return new Array(getRandomInt(1, limit))
    .fill(``)
    .map(()=> {
      return `http://picsum.photos/248/152?r=${Math.random()}`;
    });
};

const destination = {
  name: getRandomArrayItem(DESTINATION_POINTS),
  description: getRandomArrayItem(DESCRIPTION_ITEMS),
  photos: generatePhotosArray(13),
};

const getRandomTime = () => {
  const targetTime = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValueHours = sign * getRandomInt(0, 12);
  const diffValueMinutes = sign * getRandomInt(0, 30);
  targetTime.setHours(targetTime.getHours() + diffValueHours);
  targetTime.setMinutes(targetTime.getMinutes() + diffValueMinutes);

  return targetTime;

};

const generateEvent = () => {
  return {
    id: getRandomInt(0, 10),
    eventType: getRandomArrayItem(EVENT_TYPES),
    offers: getRandomArrayItem(offerItems),
    dateFrom: getRandomTime(),
    dateTo: getRandomTime(),
    destination,
    basePrice: getRandomInt(0, 500),
    isFavorite: Math.random() > 0.5,
  };
};

const generateEvents = (count) => {
  return new Array(count)
  .fill(``)
  .map(generateEvent);
};

export {generateEvent, generateEvents};
