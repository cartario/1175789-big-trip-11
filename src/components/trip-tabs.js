import AbstractComponent from "./abstract-component.js";

const createTripTabs = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
        <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" menu-item="table">Table</a>
        <a class="trip-tabs__btn" href="#" menu-item="stats">Stats</a>
      </nav>`
  );
};

export default class TripTabs extends AbstractComponent {
  constructor() {
    super();

  }

  getTemplate() {
    return createTripTabs();
  }

  setActiveItem(menuItem) {

    Array.from(this.getElement().querySelectorAll(`.trip-tabs__btn`)).forEach((it) => {
      it.classList.remove(`trip-tabs__btn--active`);
    });

    const item = this.getElement().querySelector(`[menu-item = "${menuItem}"]`);

    if (item) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }

  setOnChange(handler) {
    Array.from(this.getElement().querySelectorAll(`.trip-tabs__btn`)).forEach((it) => {
      it.addEventListener(`click`, (evt) => {
        const menuItem = evt.target.getAttribute(`menu-item`);
        handler(menuItem);
      });
    });
  }
}
