export const FilterType = {
  EVERYTHING: `everything`,
  PAST: `past`,
  FUTURE: `future`,
};

const offersSource = [{
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

const offers = offersSource.map((it) => Object.assign({}, it, {checked: Math.random() > 0.5}));

const EVENT_TYPES = [
  {
    name: `Taxi`,
    group: `Transfer`,
    offers: offers.slice(offers.length - 1),
  },
  {
    name: `Bus`,
    group: `Transfer`,
    offers: offers.slice(offers.length - 2),
  },
  {
    name: `Train`,
    group: `Transfer`,
    offers: offers.slice(offers.length - 3),
  },
  {
    name: `Ship`,
    group: `Transfer`,
    offers: offers.slice(offers.length - 4),
  },
  {
    name: `Transport`,
    group: `Transfer`,
    offers: offers.slice(offers.length - 5),
  },
  {
    name: `Drive`,
    group: `Transfer`,
    offers: [],
  },
  {
    name: `Flight`,
    group: `Transfer`,
    offers: offers.slice(offers.length - 3),
  },
  {
    name: `Check-in`,
    group: `Activity`,
    offers: offers.slice(offers.length - 2),
  },
  {
    name: `Sightseeing`,
    group: `Activity`,
    offers: offers.slice(offers.length - 1),
  },
  {
    name: `Restaurant`,
    group: `Activity`,
    offers: offers.slice(offers.length - 2),
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
