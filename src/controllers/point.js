import AbstractComponent from "../components/abstract-component.js";
import EventComponent from "../components/event.js";
import EventEditComponent from "../components/event-edit.js";
import {RenderPosition, render, replace} from "../utils/render.js";

const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export default class PointController extends AbstractComponent {
  constructor(container, onDataChange, onViewChange) {
    super();
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.ket === `Esc`;
    if (isEscKey) {
      replace(this._eventComponent, this._eventEditComponent);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  render(event) {
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event);

    this._eventComponent.setRollupBtnClickHandler(() => {
      this._replaceEventToEdit();
    });

    this._eventEditComponent.setRollupBtnClickHandler(() => {
      this._replaceEditToEvent();
    });

    this._eventEditComponent.setFavoriteClickHandler(() => {
      this._onDataChange(this, event, Object.assign({}, event, {
        isFavorite: !event.isFavorite,
      }));
    });

    if (oldEventEditComponent && oldEventComponent) {
      replace(this._eventComponent, oldEventComponent);
      replace(this._eventEditComponent, oldEventEditComponent);
    } else {
      render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
    }
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {

    replace(this._eventComponent, this._eventEditComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);

  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }
}
