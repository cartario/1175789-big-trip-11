import {MONTH_NAMES} from "../const.js";
import {createElement} from "../utils.js";

const createTripDays = (events) => {
  const createTripDaysMarkup = (value, date) => {
    const dueDate = `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`;
    return `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${value}</span>
          <time class="day__date" datetime="2019-03-18">${dueDate}</time>
        </div>
        <ul class="trip-events__list">
        </ul>
      </li>`;
  };

  const tripDaysMarkup = events.map((it, index) =>
    createTripDaysMarkup(index + 1, it.dateFrom)
  ).join(`\n`);

  return `<ul class="trip-days">
      ${tripDaysMarkup}
    </ul>`;
};

export default class TripDays {
  constructor(events) {
    this._element = null;
    this._events = events;
  }

  getTemplate() {
    return createTripDays(this._events);
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
