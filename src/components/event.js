import {getDateTimeFormat, getTimeFormat, getTimeFormatDHM, createElement} from "../utils.js";

const createTripEvent = (event) => {
  const {
    eventType,
    destination,
    offers,
    dateFrom,
    dateTo,
    basePrice,
  } = event;

  // Привет. Ну смотри, у тебя есть отсортированные eventы в порядке возрастания.

//Мы запускаем цикл по event, в котором начинаем подсчет порядоквых номеров.

//Будет что-то типо такого:
//const renderTripEvents = (events) => {
  //let dayFrom;
  // let daysCount = 0;
  // let tripDay;

// for (const event of events) {
// if (dayFrom !== event.dateFrom.getDate()) {
  // dayFrom = event.dateFrom.getDate();
  // daysCount++;
  // dayFrom = event.dateFrom.getDate();
  // renderElement(tripDays, new MainTripDay(event, daysCount).getElement());
  // tripDay = document.querySelectorAll(`.trip-events__list`);
  // }

//  renderElement(tripDay[daysCount - 1], new MainTripDayEvent(event).getElement());
//  }
// };

  const isDateCorrect = (dateTo - dateFrom) > 0;
  const startTime = getTimeFormat(dateFrom);
  const dateStart = getDateTimeFormat(dateFrom);
  const endTime = getTimeFormat(dateTo);
  const dateEnd = getDateTimeFormat(dateTo);
  const durationTime = isDateCorrect ? getTimeFormatDHM(dateTo - dateFrom) : `дата окончания меньше даты начала`;

  const selectedOffers = (title, price) => {
    return `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      +
      €&nbsp;<span class="event__offer-price">${price}</span>
    </li>`;
  };

  const selectedOffersMarkup = () => {
    return offers.map((it) => selectedOffers(it.title, it.price)).join(`\n`);
  };

  const offersMarkup = selectedOffersMarkup();

  return (`<li class="trip-events__item"><div class="event">
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
          ${offersMarkup}

        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div></li>`);
};

export default class Event {
  constructor(event) {
    this._element = null;
    this._event = event;
  }

  getTemplate() {
    return createTripEvent(this._event);
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
