import AbstractComponent from "./abstract-component.js";

const createTripDaysTemplate = () => {
  return (`<ul class="trip-days"></ul>`);
};

export default class TripDays extends AbstractComponent {
  getTemplate() {
    return createTripDaysTemplate();
  }

  getEventsList() {
    return this.getElement().querySelector(`.trip-events__list`);
  }
}
