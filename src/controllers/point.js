import AbstractComponent from "../components/abstract-component.js";
import EventComponent from "../components/event.js";
import EventEditComponent from "../components/event-edit.js";
import {RenderPosition, render, replace} from "../utils/render.js";

export default class PointController extends AbstractComponent {
  constructor(container, onDataChange) {
    super();
    this._container = container;
    this._onDataChange = onDataChange;
    this._eventComponent = null;
    this._eventEditComponent = null;

  }

  render(event) {
    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.ket === `Esc`;
      if (isEscKey) {
        replace(this._eventComponent, this._eventEditComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._eventComponent.setRollupBtnClickHandler(() => {
      replace(this._eventEditComponent, this._eventComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._eventEditComponent.setRollupBtnClickHandler(() => {
      replace(this._eventComponent, this._eventEditComponent);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._eventEditComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,

      }));
    });

    render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
  }
}
