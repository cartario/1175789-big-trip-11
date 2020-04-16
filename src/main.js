import {createTripInfoTemplate} from "./components/trip-info.js";
import {createEventEditTemplate} from "./components/event-edit.js";
import {createTripEvent} from "./components/event.js";
import {createTripFiltersTemplate} from "./components/filters.js";
import {createTripSort} from "./components/sort.js";
import {createTripTabs} from "./components/trip-tabs.js";
import {generateEvents} from "./mock/event.js";
import {generateFilters} from "./mock/filter.js";
import {createTripDays} from "./components/trip-days.js";
import {createBoardTemplate} from "./components/board.js";

const TOTAL_EVENTS = 5;

const eventsSource = generateEvents(TOTAL_EVENTS);
const events = eventsSource.slice().sort((a, b) => (Date.parse(a.dateFrom) - Date.parse(b.dateFrom)));

const filters = generateFilters();

// ключевые узлы
const tripMain = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

// ф-я отрисовки
const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// отрисовка
render(tripMain, createTripInfoTemplate(events), `afterbegin`);
render(tripControlsElement, createTripTabs(), `beforeend`);
render(tripControlsElement, createTripFiltersTemplate(filters), `beforeend`);

render(tripEvents, createTripSort(), `beforeend`);
render(tripEvents, createTripDays(events), `beforeend`);

const tripDaysElement = tripEvents.querySelector(`.trip-days__item`);
const tripEventsList = tripDaysElement.querySelector(`.trip-events__list`);

// отрисовка точек маршрута
events.slice(1).forEach((it) => render(tripEventsList, createTripEvent(it), `beforeend`));

const tripEventsItem = tripEvents.querySelector(`.trip-events__item`);
// отрисовка формы создания/редактирования
render(tripEventsItem, createEventEditTemplate(events[0]), `beforeend`);
