import {RenderPosition, render} from "../utils/render.js";
import SortComponent, {SortType} from "../components/sort.js";
import TripDaysComponent from "../components/trip-days.js";
import TripInfoComponent from "../components/trip-info.js";
import TripDayComponent from "../components/trip-day.js";
import NoEventsComponent from "../components/no-events.js";
import PointController from "./point.js";


const getSortedType = (eventsList, sortType, from, to) => {
  let sortedEvents = [];
  const showingEvents = eventsList.slice();
  switch (sortType) {
    case SortType.DEFAULT:
      sortedEvents = showingEvents;
      break;
    case SortType.TIME:
      sortedEvents = showingEvents.sort((a, b) => a.dateTo - a.dateFrom - b.dateTo - b.dateFrom);
      break;
    case SortType.PRICE:
      sortedEvents = showingEvents.sort((a, b) => a.basePrice - b.basePrice);
      break;
  }
  return sortedEvents.slice(from, to);
};

const getSortedEventsByDate = (events) => {
  return [...events].slice().sort((a, b) => a.dateFrom.getTime() - b.dateFrom.getTime());
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._events = [];
    this._tripDaysComponent = new TripDaysComponent();
    this._noEventComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._showedEventControllers = [];

  }

  render(events) {
    this._events = events;
    const tripMain = document.querySelector(`.trip-main`);
    const isEventsExist = !!this._events;
    const sortedEventsByDate = isEventsExist ? getSortedEventsByDate(this._events) : [];

    if (!isEventsExist) {
      render(this._container.getElement(), this._noEventComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container.getElement(), this._sortComponent, RenderPosition.BEFOREEND);
    render(this._container.getElement(), this._tripDaysComponent, RenderPosition.BEFOREEND);
    render(tripMain, new TripInfoComponent(events), RenderPosition.AFTERBEGIN);
    this.renderTripDays(sortedEventsByDate);
  }

  renderTripDays(sortedEventsByDate) {
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
        render(this._tripDaysComponent.getElement(), tripDayComponent, RenderPosition.BEFOREEND);
      }

      const pointController = new PointController(tripDayEventsList, this._onDataChange, this._onViewChange);
      pointController.render(event);
      this._showedEventControllers = this._showedEventControllers.concat(pointController);

    }
  }

  _onSortTypeChange(sortType) {
    this._tripDaysComponent.getElement().innerHTML = ``;
    const sortedEvents = getSortedType(this._events, sortType, 0, this._events.length);
    this.renderTripDays(sortedEvents);

  }

  _onDataChange(pointController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));

    pointController.render(this._events[index]);
  }

  _onViewChange() {
    this._showedEventControllers.forEach((it) => it.setDefaultView());
  }

}

