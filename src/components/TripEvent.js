import {MONTH_NAMES} from "../const.js";

export const createTripEvent = (event) => {
  const {
    eventType,
    destination,
    offers,
    basePrice,

    id,
  } = event;

  const dueDate = new Date();
  const getDateTrip = () => {
    return `${MONTH_NAMES[dueDate.getMonth()].toUpperCase()} ${dueDate.getDate()}`;

  };

  const date = getDateTrip();

  const dateTime = `2020-03-18`;
  const startTime = `${dueDate.getHours()}:00`;
  const dateTimeStart = `2021-03-18`;
  const endTime = `${dueDate.getHours() + 1}:00`;
  const dateTimeEnd = `2022-03-18`;
  const durationTime = `30M`;

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
          <span class="day__counter">${id}</span>
          <time class="day__date" datetime="${dateTime}">${date}</time>
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
                  <time class="event__start-time" datetime="${dateTimeStart}">${startTime}</time>
                  —
                  <time class="event__end-time" datetime="${dateTimeEnd}">${endTime}</time>
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
