import {EVENT_TYPES, DESTINATION_POINTS} from "../const.js";

import AbstractSmartComponent from "./abstract-smart-component.js";

const createEventTransferMarkup = (type, id = 1) => {
  return `<legend class="visually-hidden">Transfer</legend>
  <div class="event__type-item">
    <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
    <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-${id}">${type}</label>
  </div>`;
};

const createEventActivityMarkup = (type, id = 1) => {
  return `<legend class="visually-hidden">Activity</legend>
    <div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-${id}">${type}</label>
    </div>`;
};

const createOptionsDestination = (citi) => {
  return `<option value="${citi}"></option>
    `;
};

const optionsDestinationMarkup = DESTINATION_POINTS.map((it) => createOptionsDestination(it)).join(`\n`);

const createEventEditTemplate = (event) => {

  const {
    id,
    offers,
    eventType,
    destination,
    dateFrom,
    dateTo,
    basePrice,
    isFavorite,
  } = event;

  const isShowingDestination = Math.random() > 0.5;
  const isOffersExist = offers.length > 0;
  const preposition = eventType.group === `Transfer` ? `to` : `in`;

  const eventTypeToggle = () => {
    return `<label class="event__type  event__type-btn" for="event-type-toggle-${id}">
    <span class="visually-hidden">Choose event type</span>
    <img class="event__type-icon" width="17" height="17"
    src="img/icons/${eventType.name.toLowerCase()}.png" alt="Event type icon">
  </label>
  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
  `;
  };

  const eventTypeToggleMarkup = eventTypeToggle();

  const eventTransferMarkup = EVENT_TYPES.slice(0, 7).map((it) => createEventTransferMarkup(it.name)).join(`\n`);
  const eventActivityMarkup = EVENT_TYPES.slice(7).map((it) => createEventActivityMarkup(it.name)).join(`\n`);

  const createDestinationTime = () => {
    return `<div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${id}">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dateFrom}">
        —
        <label class="visually-hidden" for="event-end-time-${id}">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dateTo}">
      </div>`;
  };

  const destinationTimeMarkup = createDestinationTime();

  const creatAvaibleOffers = (offer, price, index) => {
    const isChecked = Math.random() > 0.5;
    return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${index}" type="checkbox" name="event-offer-luggage" ${isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${index}">
          <span class="event__offer-title">${offer}</span>
          +
          €&nbsp;<span class="event__offer-price">${price}</span>
        </label>
      </div>`;
  };

  const availableOffersMarkup = offers.map((it, i) => creatAvaibleOffers(it.title, it.price, i)).join(`\n`);

  const createDestinationMarkup = () => {
    const createEventPhotos = (url) => {
      return `<img class="event__photo" src="${url}" alt="Event photo">`;
    };

    const eventPhotosMarkup = destination.photos.map((it) => createEventPhotos(it)).join(`\n`);

    return `${isShowingDestination ? `
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${destination.name}
          is a city in ${destination.description}
          </p>

          <div class="event__photos-container">
            <div class="event__photos-tape">

              ${eventPhotosMarkup}

            </div>
          </div>
        </section>` : ``}`;
  };

  const destinationMarkup = createDestinationMarkup();

  return (`<li class="trip-events__item"><form class="event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">

          ${eventTypeToggleMarkup}

          <div class="event__type-list">
            <fieldset class="event__type-group">

              ${eventTransferMarkup}
            </fieldset>

            <fieldset class="event__type-group">

              ${eventActivityMarkup}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${id}">
            ${eventType.name} ${preposition}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name}" list="destination-list-${id}">
          <datalist id="destination-list-${id}">

            ${optionsDestinationMarkup}

          </datalist>
        </div>

        ${destinationTimeMarkup}

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${id}">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>

        <input id="event-favorite-${id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-${id}">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
          </svg>
        </label>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${isOffersExist ? `
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">

            ${availableOffersMarkup}

          </div>
          </section>
        ` : ``}


            ${destinationMarkup}

      </section>
    </form></li>`);
};


export default class EventEdit extends AbstractSmartComponent {
  constructor(event) {
    super();
    this._event = event;
    this.setFavoriteClickHandler();
    this._subscribeOnEvents();
    this._submitHandler = null;
    this._rollupBtnClickHandler = null;
    this._type = event.eventType.name;
    this._city = event.destination.name;
    this._availableOffers = event.eventType.offers;

  }
  getTemplate() {
    return createEventEditTemplate(this._event, {
      type: this._type,
      city: this._city,
      availableOffers: this._availableOffers,
    });

  }

  setRollupBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
    this._rollupBtnClickHandler = handler;
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-icon`)
    .addEventListener(`click`, handler);

  }

  setSubmitHandler(handler) {

    this.getElement().addEventListener(`submit`, handler);

    this._submitHandler = handler;

  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this._subscribeOnEvents();
    this.setRollupBtnClickHandler(this._rollupBtnClickHandler);
  }

  rerender() {
    super.rerender();

  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelectorAll(`.event__type-input`).forEach((input) => {
      input.addEventListener(`change`, (evt) => {
        const newEventType = evt.target.value;
        const newEventTypeObj = EVENT_TYPES.find((it) => it.name === newEventType);

        this._event.eventType = {
          name: newEventType,
          group: newEventTypeObj.group,
        };

        this._event.offers = EVENT_TYPES.find((it) => it.name === newEventType).offers;

        this.rerender();
      });
    });

    element.querySelectorAll(`.event__input--destination`).forEach((input) => {
      input.addEventListener(`change`, (evt) => {
        const newCity = evt.target.value;
        this._event.destination.name = newCity;

        this.rerender();
      });
    });
  }
}
