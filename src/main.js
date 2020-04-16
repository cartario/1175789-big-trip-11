import TripInfoComponent from "./components/trip-info.js";
import TripTabsComponent from "./components/trip-tabs.js";
import FiltersComponent from "./components/filters.js";
// import BoardComponent from "./components/board.js";
import TripDaysComponent from "./components/trip-days.js";
import SortComponent from "./components/sort.js";
import EventComponent from "./components/event.js";
import EventEditComponent from "./components/event-edit.js";

import {generateEvents} from "./mock/event.js";
import {generateFilters} from "./mock/filter.js";


import {RenderPosition, render} from "./utils.js";

const TOTAL_EVENTS = 5;

const eventsSource = generateEvents(TOTAL_EVENTS);
const events = eventsSource.slice().sort((a, b) => (Date.parse(a.dateFrom) - Date.parse(b.dateFrom)));

const filters = generateFilters();


// ключевые узлы
const tripMain = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

const renderTask = (event) => {
  const eventComponent = new EventComponent(event);
  const eventEditComponent = new EventEditComponent(event);

  const eventRollupBtn = tripEventsList.querySelector(`.event__rollup-btn`);

  const replaceEventToEdit = () => {
    tripEventsList.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  eventRollupBtn.addEventListener(`click`, replaceEventToEdit);

  render(tripEventsList, eventComponent.getElement(), `beforeend`);
};

const renderBoard = () => {
  render(tripMain, new TripInfoComponent(events).getElement(), RenderPosition.AFTERBEGIN);
  render(tripControlsElement, new TripTabsComponent().getElement(), RenderPosition.BEFOREEND);
  render(tripControlsElement, new FiltersComponent(filters).getElement(), RenderPosition.BEFOREEND);
  render(tripEvents, new SortComponent().getElement(), RenderPosition.BEFOREEND);
  render(tripEvents, tripDaysComponent.getElement(), RenderPosition.BEFOREEND);
  // отрисовка точек маршрута
  events.forEach((event) => renderTask(event));

};

const tripDaysComponent = new TripDaysComponent(events);
const tripEventsList = tripDaysComponent.getElement().querySelector(`.trip-events__list`);

renderBoard();
