import TripInfoComponent from "./components/trip-info.js";
import FiltersComponent from "./components/filters.js";
import TripDaysComponent from "./components/trip-days.js";
import TripDayComponent from "./components/trip-day.js";
import SortComponent from "./components/sort.js";
import EventComponent from "./components/event.js";
import EventEditComponent from "./components/event-edit.js";
import NoEventsComponent from "./components/no-events.js";
import TripController from "./controllers/board.js";
import {generateEvents} from "./mock/event.js";
import {generateFilters} from "./mock/filter.js";
import {RenderPosition, render, replace} from "./utils/render.js";
import TripTabsComponent from "./components/trip-tabs.js";

const TOTAL_EVENTS = 15;
const events = generateEvents(TOTAL_EVENTS);

const filters = generateFilters();

// ключевые узлы
const tripMain = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

render(tripControlsElement, new TripTabsComponent(), RenderPosition.BEFOREEND);
render(tripControlsElement, new FiltersComponent(filters), RenderPosition.BEFOREEND);
render(tripEvents, new SortComponent(), RenderPosition.BEFOREEND);
render(tripMain, new TripInfoComponent(events), RenderPosition.AFTERBEGIN);

const tripDaysComponent = new TripDaysComponent();
const noEventComponent = new NoEventsComponent();

const renderBoard = (events) => {
  const isEventsExist = !!events;

  const getSortedEventsByDate = () => {
    return [...events].slice().sort((a, b) => a.dateFrom.getTime() - b.dateFrom.getTime());
  };

  const sortedEventsByDate = isEventsExist ? getSortedEventsByDate() : [];

  if (!isEventsExist) {
    render(tripEvents, noEventComponent, RenderPosition.BEFOREEND);
    return;
  }
  render(tripEvents, tripDaysComponent, RenderPosition.BEFOREEND);

  renderTripDays(sortedEventsByDate);
};

const renderTripDays = (sortedEventsByDate) => {
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
      render(tripDaysComponent.getElement(), tripDayComponent, RenderPosition.BEFOREEND);
    }
    renderEvent(tripDayEventsList, event);
  }
};

const renderEvent = (tripEventsList, event) => {
  const eventComponent = new EventComponent(event);
  const eventEditComponent = new EventEditComponent(event);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.ket === `Esc`;
    if (isEscKey) {
      replace(eventComponent, eventEditComponent);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.setRollupBtnClickHandler(() => {
    replace(eventEditComponent, eventComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setRollupBtnClickHandler(() => {
    replace(eventComponent, eventEditComponent);
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  render(tripEventsList, eventComponent, RenderPosition.BEFOREEND);
};

const tripController = new TripController(events);

tripController.render(events);

renderBoard(events);
