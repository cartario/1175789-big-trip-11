const TOTAL_EVENTS = 3;

import {createTripInfoTemplate} from "./components/TripInfoTemplate.js";
import {createEventEditTemplate} from "./components/EventEditTemplate.js";
import {createTripEvent} from "./components/TripEvent.js";
import {createTripFiltersTemplate} from "./components/TripFiltersTemplate.js";
import {createTripSort} from "./components/TripSort.js";
import {createTripTabs} from "./components/TripTabs.js";

// ключевые узлы
const tripControlsElement = document.querySelector(`.trip-controls`);
const titleFilterEvents = tripControlsElement.querySelector(`h2:nth-child(2)`);
const tripEvents = document.querySelector(`.trip-events`);

// ф-я отрисовки
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// отрисовка
render(tripControlsElement, createTripInfoTemplate(), `beforebegin`);
render(titleFilterEvents, createTripTabs(), `beforebegin`);
render(titleFilterEvents, createTripFiltersTemplate(), `afterend`);
render(tripEvents, createTripSort(), `beforeend`);

// отрисовка точек маршрута
const renderEvents = () => {
  for (let i = 0; i < TOTAL_EVENTS; i++) {
    render(tripEvents, createTripEvent(), `beforeend`);
  }
};

renderEvents();

// ключевой узел
const tripEventsList = tripEvents.querySelector(`.trip-events__list`);

// отрисовка формы создания/редактирования
render(tripEventsList, createEventEditTemplate(), `beforeend`);
