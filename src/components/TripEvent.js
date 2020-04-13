import {MONTH_NAMES} from "../const.js";
import {getDateTimeFormat, getTimeFormat} from "../utils.js";

export const createTripEvent = (event) => {
  const {
    eventType,
    destination,
    offers,
    dateFrom,
    dateTo,
    basePrice,


  } = event;

  const dayCounter = 1;

  const isDateCorrect = (dateTo - dateFrom) > 0;

  const dateDay = getDateTimeFormat(dateFrom);
  const date = `${MONTH_NAMES[dateFrom.getMonth()]} ${dateFrom.getDate()}`;
  const startTime = getTimeFormat(dateFrom);
  const dateStart = getDateTimeFormat(dateFrom);
  const endTime = getTimeFormat(dateTo);
  const dateEnd = getDateTimeFormat(dateTo);
  const durationTime = isDateCorrect ? `${(dateTo - dateFrom) / 60000}M` : `дата окончания меньше даты начала`;

  const selectedOffers = () => {
    return `
    <li class="event__offer">
      <span class="event__offer-title">${offers.title}</span>
      +
      €&nbsp;<span class="event__offer-price">${offers.price}</span>
    </li>
    `;
  };

  const selectedOffersMarkup = selectedOffers();

  return (`
    <ul class="trip-days">
      <li class="trip-days__item  day">

        <div class="day__info">
          <span class="day__counter">${dayCounter}</span>
          <time class="day__date" datetime="${dateDay}">${date}</time>
        </div>

        <ul class="trip-events__list">
          <li class="trip-events__item">
            <div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42"
                src="img/icons/${eventType}.png" alt="Event type icon">
              </div>
              <h3 class="event__title">${eventType} to ${destination.name}</h3>

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
                ${selectedOffersMarkup}

              </ul>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  `);
};
