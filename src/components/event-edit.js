import {EVENT_TYPES} from "../const.js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import {encode} from "he";
import AbstractSmartComponent from "./abstract-smart-component.js";

const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
};

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


const createEventEditTemplate = (event, externalData, allDestinations) => {
  const {
    id,
    eventType,
    destination,
    dateFrom,
    dateTo,
    basePrice,
    isFavorite,
  } = event;

  const deleteButtonText = externalData.deleteButtonText;
  const saveButtonText = externalData.saveButtonText;

  const currentType = EVENT_TYPES.filter((type) => type.name === eventType.name);

  const isShowingDestination = !!destination.name;
  const isOffersExist = currentType[0].offers.length > 0;

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

  const eventTransferMarkup = EVENT_TYPES.filter((type) => type.group === `Transfer`)
  .map((type) => createEventTransferMarkup(type.name)).join(`\n`);

  const eventActivityMarkup = EVENT_TYPES.filter((type) => type.group === `Activity`)
  .map((type) => createEventActivityMarkup(type.name)).join(`\n`);

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

  const creatAvaibleOffers = (offer, index) => {
    const {title, price, checked} = offer;
    return `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" value="${title}" id="event-offer-${index}" type="checkbox" name="event-offer-${title}" ${checked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${index}">
          <span class="event__offer-title">${title}</span>
          +
          €&nbsp;<span class="event__offer-price">${price}</span>
        </label>
      </div>`;
  };

  const availableOffersMarkup = event.eventType.offers.map((offer, index) => creatAvaibleOffers(offer, index)).join(`\n`);
  const currentDestination = allDestinations.filter((destinatiom) => destinatiom.name === destination.name)[0];

  const optionsDestinationMarkup = allDestinations.map((point) => createOptionsDestination(point.name)).join(`\n`);

  const createDestinationMarkup = () => {
    const createEventPhotos = (url) => {
      return `<img class="event__photo" src="${url}" alt="Event photo">`;
    };

    const eventPhotosMarkup = destination.name ? currentDestination.pictures.map((picture) => createEventPhotos(picture.src)).join(`\n`) : ``;

    return `${isShowingDestination ? `
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">

           ${currentDestination.description}
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
          <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${destination.name ? encode(destination.name) : ``}" list="destination-list-${id}">
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
          <input class="event__input  event__input--price" id="event-price-${id}" type="number" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">${saveButtonText}</button>
        <button class="event__reset-btn" type="reset">${deleteButtonText}</button>

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
  constructor(event, destinations) {
    super();
    this._event = event;
    this._externalData = DefaultData;
    this._offers = event.eventType.offers;
    this._allDestinations = destinations;
    this._startDate = event.dateFrom;
    this._endDate = event.dateTo;
    this._setFavoriteClickHandler = null;
    this._subscribeOnEvents();
    this._submitHandler = null;
    this._deleteButtonClickHandler = null;
    this._rollupBtnClickHandler = null;
    this._flatpickr = null;
    this._applyFlatpickr();
  }

  getTemplate() {
    return createEventEditTemplate(this._event, this._externalData, this._allDestinations);
  }

  setRollupBtnClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
    this._rollupBtnClickHandler = handler;
  }

  setFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-icon`)
    .addEventListener(`click`, handler);
    this._setFavoriteClickHandler = handler;
  }

  setSubmitClickHandler(handler) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, handler);
    this._deleteButtonClickHandler = handler;
  }

  recoveryListeners() {
    this.setFavoriteClickHandler(this._setFavoriteClickHandler);
    this.setSubmitClickHandler(this._submitHandler);
    this._subscribeOnEvents();
    this.setRollupBtnClickHandler(this._rollupBtnClickHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  reset() {
    this.rerender();
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelectorAll(`.event__type-input`).forEach((input) => {
      input.addEventListener(`change`, (evt) => {
        const newEventType = evt.target.value;
        const currentNewEventType = EVENT_TYPES.find((type) => type.name === newEventType);

        this._event.eventType = {
          name: newEventType,
          group: currentNewEventType.group,
        };

        this._event.eventType.offers = EVENT_TYPES.find((type) => type.name === newEventType).offers;
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

  _applyFlatpickr() {
    const dateFormat = `d/m/y H:i`;
    const enableTime = true;
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    const dateElements = this.getElement().querySelectorAll(`.event__input--time`);
    this._flatpickr = flatpickr(dateElements[0], {
      enableTime,
      dateFormat,
      defaultDate: this._startDate,
    });

    this._flatpickr = flatpickr(dateElements[1], {
      enableTime,
      dateFormat,
      defaultDate: this._endDate,
    });
  }

  getData() {
    const form = this.getElement().querySelector(`.event--edit`);
    return new FormData(form);
  }

  lockEditForm() {
    const allInputs = Array.from(this.getElement().querySelectorAll(`input`));
    allInputs.forEach((input) => {
      input.disabled = true;
    });
    this.getElement().querySelector(`.event__save-btn`).disabled = true;
  }

  unlockEditForm() {
    const allInputs = Array.from(this.getElement().querySelectorAll(`input`));
    allInputs.forEach((input) => {
      input.disabled = false;
    });
    this.getElement().querySelector(`.event__save-btn`).disabled = false;
  }

  removeElement() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }
    super.removeElement();
  }
}
