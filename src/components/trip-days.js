import {MONTH_NAMES} from "../const.js";
import {createElement, dayCounterFormat} from "../utils.js";


const createDayDateMarkup = (event) => {
  const {id, dateFrom} = event;
  return `<li class="trip-days__item  day">
            <div class="day__info">
              <span class="day__counter">${id}</span>
              <time class="day__date" datetime="2019-03-18">${MONTH_NAMES[dayCounterFormat(dateFrom)]}</time>
            </div>
            <ul class="trip-events__list">
            </ul>
          </li>`;
};

const createTripDaysMarkup = (event) => {
  const markup = createDayDateMarkup(event);
  return `${markup}`;
};


export default class TripDays {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate() {
    return createTripDaysMarkup(this._event);
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
