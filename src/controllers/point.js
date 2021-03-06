import AbstractComponent from "../components/abstract-component.js";
import EventComponent from "../components/event.js";
import EventEditComponent from "../components/event-edit.js";
import {RenderPosition, render, replace, remove} from "../utils/render.js";
import {EVENT_TYPES} from "../const.js";
import {convertData} from "../utils/common.js";
import PointModel from "../models/point.js";


const SHAKE_ANIMATION_TIMEOUT = 600;

export const parseFormData = (formData, event, allOffers, destinations) => {
  const selectedType = document.querySelector(`.event__type-output`)
    .textContent.trim().split(` `)[0];

  const city = formData.get(`event-destination`);

  const destination = destinations.find((destinationCity) => destinationCity.name === city);
  const checkedOffersTitle = Array.from(document.querySelectorAll(`.event__offer-checkbox`))
      .filter((offerTitle) => offerTitle.checked)
      .map((offer) => offer.getAttribute(`value`));

  const getOffers = () => {
    return allOffers.map((offer) => {
      if (checkedOffersTitle.includes(offer.title)) {
        return Object.assign({}, offer, {checked: true});
      }
      return Object.assign({}, offer, {checked: false});

    });
  };

  return new PointModel({
    "id": event.id,
    "type": selectedType,
    "offers": getOffers(),
    "destination": destination,
    "date_from": convertData(formData.get(`event-start-time`)),
    "date_to": convertData(formData.get(`event-end-time`)),
    "base_price": Number(formData.get(`event-price`)),
    "is_favorite": !!(formData.get(`event-favorite`)),
  });
};

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
  ADDING: `adding`,
};

export const EmptyEvent = {
  id: `0`,

  eventType: {
    name: `Flight`,
    offers: EVENT_TYPES.filter((offer) => offer.name === `Flight`)[0].offers,
    group: `Transfer`,
  },

  dateFrom: new Date(),
  dateTo: new Date(),
  destination: {name: `Geneva`, pictures: null, description: `Geneva is a beautiful city, with crowded streets, in a middle of Europe, middle-eastern paradise, for those who value comfort and coziness.`},
  basePrice: ``,
  isFavorite: false,
};

export default class PointController extends AbstractComponent {
  constructor(container, onDataChange, onViewChange, destinations) {
    super();
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;
    this._offers = null;
    this._destinations = destinations;
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
    this._offers = event.eventType.offers;

    this._mode = mode;
    const oldEventComponent = this._eventComponent;
    const oldEventEditComponent = this._eventEditComponent;
    const isAddingMode = this._mode === Mode.ADDING;
    this._eventComponent = new EventComponent(event);
    this._eventEditComponent = new EventEditComponent(event, this._destinations, isAddingMode);

    this._eventComponent.setRollupBtnClickHandler(() => {

      this._replaceEventToEdit();

    });

    this._eventEditComponent.setRollupBtnClickHandler(() => {
      this._replaceEditToEvent();
    });

    this._eventEditComponent.setFavoriteClickHandler(() => {
      const newEvent = PointModel.clone(event);
      newEvent.isFavorite = !newEvent.isFavorite;
      this._onDataChange(this, event, newEvent, true);
    });

    this._eventEditComponent.setSubmitClickHandler((evt) => {

      evt.preventDefault();

      const formData = this._eventEditComponent.getData();
      const data = parseFormData(formData, event, this._offers, this._destinations);

      this._eventEditComponent.setData({
        saveButtonText: `Saving...`,
      });

      this._eventEditComponent.lockEditForm();

      this._onDataChange(this, event, data);
    });

    this._eventEditComponent.setDeleteButtonClickHandler(() => {
      this._eventEditComponent.setData({
        deleteButtonText: `Deleting...`,
      });

      this._eventEditComponent.lockEditForm();
      this._onDataChange(this, event, null);

    });

    switch (mode) {
      case Mode.DEFAULT:
        if (oldEventEditComponent && oldEventComponent) {
          replace(this._eventComponent, oldEventComponent);
          replace(this._eventEditComponent, oldEventEditComponent);
          this._replaceEditToEvent();
        } else {
          render(this._container, this._eventComponent, RenderPosition.AFTERBEGIN);
        }
        break;
      case Mode.ADDING:
        if (oldEventComponent && oldEventEditComponent) {
          remove(oldEventComponent);
          remove(oldEventEditComponent);
        }
        document.addEventListener(`keydown`, this._onEscKeyDown);
        render(this._container, this._eventEditComponent, RenderPosition.AFTERBEGIN);
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

  shake() {
    this._eventEditComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    this._eventComponent.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._eventEditComponent.getElement().style.animation = ``;
      this._eventComponent.getElement().style.animation = ``;

      this._eventEditComponent.setData({
        saveButtonText: `Save`,
        deleteButtonText: `Delete`,
      });

    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
