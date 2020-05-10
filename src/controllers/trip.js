import {RenderPosition, render, remove, replace} from "../utils/render.js";
import SortComponent, {SortType} from "../components/sort.js";
import TripDaysComponent from "../components/trip-days.js";
import TripInfoComponent from "../components/trip-info.js";
import TripDayComponent from "../components/trip-day.js";
import NoEventsComponent from "../components/no-events.js";
import FilterController from "./filter.js";
import TripTabsComponent from "../components/trip-tabs.js";
import PointController, {Mode as EventControllerMode, EmptyEvent} from "./point.js";

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
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._events = [];
    this._tripDaysComponent = new TripDaysComponent();
    this._noEventComponent = new NoEventsComponent();
    this._sortComponent = null;
    this._tripInfoComponent = null;

    this._onSortTypeChange = this._onSortTypeChange.bind(this);

    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._showedEventControllers = [];
    this._filterController = null;
    this._pointController = null;

    this._onFilterChange = this._onFilterChange.bind(this);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);

  }

  renderHeader(tripControlsElement) {
    this._filterController = new FilterController(tripControlsElement, this._pointsModel);

    render(tripControlsElement, new TripTabsComponent(), RenderPosition.BEFOREEND);
    this._filterController.render();
  }

  render() {
    // заполняет данными из модели
    const events = this._pointsModel.getPoints();

    const tripMain = document.querySelector(`.trip-main`);
    const isEventsExist = !!events;
    const sortedEventsByDate = isEventsExist ? getSortedEventsByDate(events) : [];

    if (events.length === 0) {
      render(this._container.getElement(), this._noEventComponent, RenderPosition.BEFOREEND);
      return;
    }

    const oldComponent = this._sortComponent;
    this._sortComponent = new SortComponent();
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);

    if (oldComponent) {
      replace(this._sortComponent, oldComponent);
    } else {
      render(this._container.getElement(), this._sortComponent, RenderPosition.BEFOREEND);
    }

    render(this._container.getElement(), this._tripDaysComponent, RenderPosition.BEFOREEND);

    this._tripInfoComponent = new TripInfoComponent(events);
    render(tripMain, this._tripInfoComponent, RenderPosition.AFTERBEGIN);
    this.renderTripDays(sortedEventsByDate);

    console.log(this._pointsModel._points);
    this._pointsModel.addEvent(EmptyEvent);
    console.log(this._pointsModel._points);
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

      this._pointController = new PointController(tripDayEventsList, this._onDataChange, this._onViewChange);
      this._pointController.render(event);
      this._showedEventControllers = this._showedEventControllers.concat(this._pointController);

    }
  }

  _onSortTypeChange(sortType) {
    this._tripDaysComponent.getElement().innerHTML = ``;
    const sortedEvents = getSortedType(this._pointsModel.getPoints(), sortType, 0, this._pointsModel.getPoints().length);
    this.renderTripDays(sortedEvents);

  }

  _onViewChange() {
    this._showedEventControllers.forEach((it) => it.setDefaultView());
  }

  _onDataChange(pointController, oldData, newData) {
    // добавление
    if (newData === EmptyEvent) {
      this._creatingEvent = null;
      if (newData = null) {
        pointController.destroy();
        this._updateEvents();
      } else {
        this._pointsModel.addEvent(newData);
        pointController.render(newData, EventControllerMode.DEFAULT);
      }
      // удаление
    } else if (newData === null) {
      this._pointsModel.removeEvent(oldData.id);
      this._updateEvents();
      // обновление
    } else {
      const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);
      if (isSuccess) {
        pointController.render(newData, EventControllerMode.DEFAULT);
      }
    }
  }

  _onFilterChange() {
    this._updateEvents();
    this._filterController.render();
  }

  _updateEvents() {
    this._removeEvents();
    this.render();
  }

  _removeEvents() {
    this._showedEventControllers.forEach((eventController) => eventController.destroy());
    this.destroy();
    this._showedEventControllers = [];
  }

  destroy() {
    remove(this._tripDaysComponent);
    remove(this._noEventComponent);
    remove(this._tripInfoComponent);
  }
}

