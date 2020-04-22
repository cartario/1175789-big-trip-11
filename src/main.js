import TripInfoComponent from "./components/trip-info.js";
import TripTabsComponent from "./components/trip-tabs.js";
import FiltersComponent from "./components/filters.js";
import TripDaysComponent from "./components/trip-days.js";
import TripDayComponent from "./components/trip-day.js";
import SortComponent from "./components/sort.js";
import EventComponent from "./components/event.js";
import EventEditComponent from "./components/event-edit.js";
import NoEventsComponent from "./components/no-events.js";
import {generateEvents} from "./mock/event.js";
import {generateFilters} from "./mock/filter.js";
import {RenderPosition, render} from "./utils.js";

const TOTAL_EVENTS = 15;
const events = generateEvents(TOTAL_EVENTS);

const isEventsExist = !!events;

const filters = generateFilters();

// ключевые узлы
const tripMain = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

const tripDaysComponent = new TripDaysComponent();
const noEventComponent = new NoEventsComponent();

const renderBoard = () => {
  render(tripControlsElement, new TripTabsComponent().getElement(), RenderPosition.BEFOREEND);
  render(tripControlsElement, new FiltersComponent(filters).getElement(), RenderPosition.BEFOREEND);

  if (!isEventsExist) {
    render(tripEvents, noEventComponent.getElement(), RenderPosition.BEFOREEND);
    return;
  }

  render(tripEvents, new SortComponent().getElement(), RenderPosition.BEFOREEND);
  render(tripEvents, tripDaysComponent.getElement(), RenderPosition.BEFOREEND);
  render(tripMain, new TripInfoComponent(events).getElement(), RenderPosition.AFTERBEGIN);
};

const getSortedEventsByDate = () => {
  const sortedEvents = [...events];
  return sortedEvents.slice().sort((a, b) => a.dateFrom.getTime() - b.dateFrom.getTime());
};

const sortedEventsByDate = isEventsExist ? getSortedEventsByDate() : [];

const renderEvent = (tripEventsList, event) => {
  const eventComponent = new EventComponent(event);
  const eventEditComponent = new EventEditComponent(event);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.ket === `Esc`;
    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const eventRollupBtn = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  const eventEditRollupBtn = eventEditComponent.getElement().querySelector(`.event__rollup-btn`);

  // реализация замены
  const replaceEventToEdit = () => {
    tripEventsList.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceEditToEvent = () => {
    tripEventsList.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  eventRollupBtn.addEventListener(`click`, function () {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditRollupBtn.addEventListener(`click`, function () {
    replaceEditToEvent();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(tripEventsList, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderTripDays = () => {
  let dayCount = 0;
  let tripDayEventsList = null;
  let prevDate = null;

  for (const event of sortedEventsByDate) {
    const dateFrom = event.dateFrom.getDate();

    if (prevDate !== dateFrom) {
      dayCount++;
      prevDate = dateFrom;
      const tripDayComponent = new TripDayComponent(event, dayCount);
      tripDayEventsList = tripDayComponent.getElement().querySelector(`.trip-events__list`);
      render(tripDaysComponent.getElement(), tripDayComponent.getElement(), RenderPosition.BEFOREEND);
    }
    renderEvent(tripDayEventsList, event);
  }
};

renderTripDays();
renderBoard();
