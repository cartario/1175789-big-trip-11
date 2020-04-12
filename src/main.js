import {createTripInfoTemplate} from "./components/TripInfoTemplate.js";
import {createEventEditTemplate} from "./components/EventEditTemplate.js";
import {createTripEvent} from "./components/TripEvent.js";
import {createTripFiltersTemplate} from "./components/TripFiltersTemplate.js";
import {createTripSort} from "./components/TripSort.js";
import {createTripTabs} from "./components/TripTabs.js";
import {generateEvents} from "./mock/event.js";
import {generateFilters} from "./mock/filter.js";


const TOTAL_EVENTS = 5;

const events = generateEvents(TOTAL_EVENTS);
const filters = generateFilters();


// ключевые узлы
const tripControlsElement = document.querySelector(`.trip-controls`);
const titleFilterEvents = tripControlsElement.querySelector(`h2:nth-child(2)`);
const tripEvents = document.querySelector(`.trip-events`);

// ф-я отрисовки
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// отрисовка
render(tripControlsElement, createTripInfoTemplate(events), `beforebegin`);
render(titleFilterEvents, createTripTabs(), `beforebegin`);
render(titleFilterEvents, createTripFiltersTemplate(filters), `afterend`);
render(tripEvents, createTripSort(), `beforeend`);

// отрисовка точек маршрута
const renderEvents = () => {
  for (let i = 1; i < TOTAL_EVENTS; i++) {
    render(tripEvents, createTripEvent(events[i]), `beforeend`);
  }
};

renderEvents();

// ключевой узел
const tripEventsList = tripEvents.querySelector(`.trip-events__list`);

// отрисовка формы создания/редактирования
render(tripEventsList, createEventEditTemplate(events[0]), `beforeend`);
