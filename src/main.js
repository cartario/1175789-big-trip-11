import {createTripInfoTemplate} from "./components/TripInfoTemplate.js";
import {createEventEditTemplate} from "./components/event-edit.js";
import {createTripEvent} from "./components/event.js";
import {createTripFiltersTemplate} from "./components/TripFiltersTemplate.js";
import {createTripSort} from "./components/TripSort.js";
import {createTripTabs} from "./components/TripTabs.js";
import {generateEvents} from "./mock/event.js";
import {generateFilters} from "./mock/filter.js";
import {createTripDays} from "./components/tripDays.js";

const TOTAL_EVENTS = 5;

const eventsSource = generateEvents(TOTAL_EVENTS);
const events = eventsSource.slice().sort((a, b) => (Date.parse(a.dateFrom) - Date.parse(b.dateFrom)));

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
render(tripEvents, createTripDays(events), `beforeend`);

const tripDaysElement = tripEvents.querySelector(`.trip-days__item`);
const tripEventsList = tripDaysElement.querySelector(`.trip-events__list`);

// отрисовка точек маршрута
events.slice(1).forEach((it) => render(tripEventsList, createTripEvent(it), `beforeend`));

const tripEventsItem = tripEvents.querySelector(`.trip-events__item`);
// отрисовка формы создания/редактирования
render(tripEventsItem, createEventEditTemplate(events[0]), `beforeend`);
