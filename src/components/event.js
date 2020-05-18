import {formatTime, formatDate, getFormattedTimeDuration} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

const createTripEvent = (event) => {
  const {
    eventType,
    destination,
    dateFrom,
    dateTo,
    basePrice,
  } = event;

  const isDateCorrect = (dateTo - dateFrom) > 0;
  const startTime = formatTime(dateFrom);
  const endTime = formatTime(dateTo);
  const dateStart = formatDate(dateFrom);
  const dateEnd = formatDate(dateTo);

  const durationTime = isDateCorrect ? getFormattedTimeDuration(dateFrom, dateTo) : `дата окончания меньше даты начала`;

  const selectedOffers = (offers) => {
    const {title, price, checked} = offers;
    return `${checked ? `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      +
      €&nbsp;<span class="event__offer-price">${price}</span>
    </li>` : ``}`;
  };

  const selectedOffersMarkup = () => {
    return eventType.offers.map((it) => selectedOffers(it)).join(`\n`);
  };

  const offersMarkup = selectedOffersMarkup();

  return (`<li class="trip-events__item"><div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42"
          src="img/icons/${eventType.name.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${eventType.name} ${eventType.group === `Transfer` ? `to` : `in` } ${destination.name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateStart}">${startTime}</time>
            —
            <time class="event__end-time" datetime="${dateEnd}">${endTime}</time>
          </p>
          <p class="event__duration">${durationTime}</p>
        </div>

        <p class="event__price">
          €&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>

        <ul class="event__selected-offers">
          ${offersMarkup}

        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div></li>`);
};

export default class Event extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }
  getTemplate() {
    return createTripEvent(this._event);
  }

  setRollupBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
