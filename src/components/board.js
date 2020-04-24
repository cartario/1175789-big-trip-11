import AbstractComponent from "./abstract-component.js";

const createBoardTemplate = () => {
  return (`<section class="trip-events">
            <h2 class="visually-hidden">Trip events</h2>
            </section>`);
};

export default class BoardComponent extends AbstractComponent {
  getTemplate() {
    return createBoardTemplate();
  }
}
