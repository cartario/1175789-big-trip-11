import {EVENT_TYPES, DESTINATION_POINTS} from "../const.js";


const getRandomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const eventTypeEditCard = EVENT_TYPES;

const eventTypeToggle = () => {
  return `<label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17"
            src="img/icons/${eventTypeEditCard[getRandomInt(0, eventTypeEditCard.length - 1)]}.png" alt="Event type icon">
          </label>
<input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          `;
};

const eventTypeToggleMarkup = eventTypeToggle();

const createEventTransferMarkup = (type, id = 1) => {
  return `
  <legend class="visually-hidden">Transfer</legend>
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

const createOptionsDestination = (city) => {
  return `
    <option value="${city}"></option>
    `;
};

const optionsDestinationMarkup = DESTINATION_POINTS.map((it) => createOptionsDestination(it)).join(`\n`);

export const createEventEditTemplate = (event) => {
  const {
    id,
    eventType,
    destination,
    dateFrom,
    dateTo,
    basePrice,
    isFavorite,
  } = event;


  const eventTransferMarkup = eventTypeEditCard.slice(0, 7).map((it) => createEventTransferMarkup(it)).join(`\n`);
  const eventActivityMarkup = eventTypeEditCard.slice(7).map((it) => createEventActivityMarkup(it)).join(`\n`);

  const createDestinationTime = () => {
    return `
      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-${id}">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dateFrom}">
        —
        <label class="visually-hidden" for="event-end-time-${id}">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dateTo}">
      </div>
    `;
  };

  const destinationTimeMarkup = createDestinationTime();

  const creatAvaibleOffers = (offer, price) => {
    const isChecked = Math.random() > 0.5;
    return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${id}" type="checkbox" name="event-offer-luggage" ${isChecked ? `checked` : ``}>
              <label class="event__offer-label" for="event-offer-luggage-${id}">
                <span class="event__offer-title">${offer}</span>
                +
                €&nbsp;<span class="event__offer-price">${price}</span>
              </label>
            </div>`;
  };

  const offersEditCard = [{
    title: `Order Uber`,
    price: 20,
  }, {
    title: `Add luggage`,
    price: 30,
  }, {
    title: `Switch to comfort class`,
    price: 100,
  }, {
    title: `Add meal`,
    price: 15,
  }, {
    title: `Choose seats`,
    price: 5,
  }, {
    title: `Travel by train`,
    price: 40,
  }];

  const availableOffersMarkup = offersEditCard.map((it) => creatAvaibleOffers(it.title, it.price));

  return (`
  <li class="trip-events__item">
    <form class="event  event--edit" action="#" method="post">
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
            ${eventType} to
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
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">

            ${availableOffersMarkup}

          </div>
        </section>
      </section>
    </form>
  </li>
  `);
};
