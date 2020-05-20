import {MONTH_NAMES} from "../const.js";
import {dayCounterFormat} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

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

export default class TripDay extends AbstractComponent {
  constructor(event, dayCounter) {
    super();
    this._event = event;
    this._dayCounter = dayCounter;
  }
  getTemplate() {
    return createTripDayMarkup(this._event, this._dayCounter);
  }
}
