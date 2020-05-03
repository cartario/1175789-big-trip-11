import {getRandomArray} from "./utils/common.js";

const offers = [{
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

const EVENT_TYPES = [
  {
    name: `Taxi`,
    group: `Transfer`,
    offers: getRandomArray(offers),
  },
  {
    name: `Bus`,
    group: `Transfer`,
    offers: getRandomArray(offers),
  },
  {
    name: `Train`,
    group: `Transfer`,
    offers: getRandomArray(offers),
  },
  {
    name: `Ship`,
    group: `Transfer`,
    offers: getRandomArray(offers),
  },
  {
    name: `Transport`,
    group: `Transfer`,
    offers: getRandomArray(offers),
  },
  {
    name: `Drive`,
    group: `Transfer`,
    offers: getRandomArray(offers),
  },
  {
    name: `Flight`,
    group: `Transfer`,
    offers: getRandomArray(offers),
  },
  {
    name: `Check-in`,
    group: `Activity`,
    offers: getRandomArray(offers),
  },
  {
    name: `Sightseeing`,
    group: `Activity`,
    offers: getRandomArray(offers),
  },
  {
    name: `Restaurant`,
    group: `Activity`,
    offers: getRandomArray(offers),
  }
];

const DESTINATION_POINTS = [`Amsterdam`, `Paris`, `Geneva`, `Moscow`, `Sochi`];

const DESCRIPTION_ITEMS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `];

const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

export {EVENT_TYPES, DESTINATION_POINTS, DESCRIPTION_ITEMS, MONTH_NAMES};
