import AbstractComponent from "./abstract-component.js";

const createTripInfoTemplate = (events) => {

  const totalPrice = events.reduce((acc, event) => {
    return acc + event.basePrice;
  }, 0);

  return (`<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam — Chamonix — Geneva</h1>

        <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;20</p>
      </div>

      <p class="trip-info__cost">
        Total: €&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`
  );
};

export default class TripInfo extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }
  getTemplate() {
    return createTripInfoTemplate(this._events);
  }
}
