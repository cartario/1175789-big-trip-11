import {MONTH_NAMES} from "../const.js";
import {createElement, dayCounterFormat} from "../utils.js";


const createTripDayMarkup = (event, dayCounter) => {
  const {dateFrom} = event;
  return `<li class="trip-days__item  day">
            <div class="day__info">
              <span class="day__counter">${dayCounter}</span>
              <time class="day__date" datetime="2019-03-18">${MONTH_NAMES[dayCounterFormat(dateFrom)]}</time>
            </div>
            <ul class="trip-events__list">
            </ul>
          </li>`;
};

export default class TripDay {
  constructor(event, dayCounter) {
    this._element = null;
    this._event = event;
    this._dayCounter = dayCounter;
  }

  getTemplate() {
    return createTripDayMarkup(this._event, this._dayCounter);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
