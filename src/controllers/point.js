import AbstractComponent from "../components/abstract-component.js";
import EventComponent from "../components/event.js";
import EventEditComponent from "../components/event-edit.js";
import {RenderPosition, render, replace, remove} from "../utils/render.js";

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

export const EmptyEvent = {
  id: 1,
  eventType: {
    name: `Taxi`,
    offers: [{
      title: `Default title`,
      price: 100500,
      checked: false,
    }],
  },

  dateFrom: new Date(),
  dateTo: new Date(),
  destination: {name: `Default Moscow`, photos: []},
  basePrice: 100900,
  isFavorite: false,
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
      if (this._mode === Mode.ADDING) {
        this._onDataChange(this, EmptyEvent, null);
      }
      this._replaceEditToEvent();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  render(event, mode) {
    this._mode = mode;
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

    this._eventEditComponent.setSubmitClickHandler((evt) => {
      evt.preventDefault();
      const data = this._eventEditComponent.getData();
      // debugger;
      this._onDataChange(this, event, data);
      // this._replaceEditToEvent();
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => {

      this._onDataChange(this, event, null);

    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventEditComponent && oldEventComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
          this._replaceEditToEvent();
        } else {
          render(this._container, this._eventComponent, RenderPosition.BEFOREEND);
        }
        break;
      case Mode.ADDING:
        if (oldEventComponent && oldEventEditComponent) {
          remove(oldEventComponent);
          remove(oldEventEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._eventEditComponent, RenderPosition.BEFOREEND);
        break;
    }
  }

  _replaceEventToEdit() {
    this._onViewChange();
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.EDIT;
  }

  _replaceEditToEvent() {
    this._eventEditComponent.reset();

    if (document.contains(this._eventEditComponent.getElement())) {
      replace(this._eventComponent, this._eventEditComponent);
    }
    // replace(this._eventComponent, this._eventEditComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  setDefaultView() {

    if (this._mode !== Mode.DEFAULT) {
      this._replaceEditToEvent();
    }
  }

  destroy() {
    remove(this._eventEditComponent);
    remove(this._eventComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
