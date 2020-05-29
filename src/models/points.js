import {FilterType} from "../const.js";
import {getEventsByFilter} from "../utils/filter.js";

export default class Points {
  constructor() {
    this._points = [];
    this._destinations = [];
    this._offers = [];
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
    this._activeFilterType = FilterType.EVERYTHING;
  }

  getAllPoints() {
    return this._points;
  }

  getPoints() {
    return getEventsByFilter(this._points, this._activeFilterType);
  }

  setPoints(points) {
    this._points = Array.from(points);
    this._callHandlers(this._dataChangeHandlers);
  }

  setDestinations(destinations) {
    this._destinations = Array.from(destinations);
    this._callHandlers(this._dataChangeHandlers);
  }

  getDestinations() {
    return this._destinations;
  }

  setOffers(offers) {

    this._offers = Array.from(offers);
    this._callHandlers(this._dataChangeHandlers);
  }

  getOffers() {
    return this._offers;
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setAllFilter() {
    this._activeFilterType = FilterType.EVERYTHING;
    this._callHandlers(this._dataChangeHandlers);

  }

  updatePoint(id, currentPoint) {
    const index = this._points.findIndex((point) => point.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), currentPoint, this._points.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  removeEvent(id) {
    const index = this._points.findIndex((point) => (point.id === id));

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), this._points.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addEvent(point) {
    this._points = [].concat(point, this._points);
    this._callHandlers(this._dataChangeHandlers);
  }
}
