import AbstractComponent from "./abstract-component.js";
import {MONTH_NAMES} from "../const.js";
import {dayCounterFormat} from "../utils/common.js";

const createTripInfoTemplate = (eventsList) => {

  const totalPrice = eventsList.reduce((price, event) => {
    return price + event.basePrice;
  }, 0);

  const TripCities = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
  };

  const getTripInfoTitle = () => {
    let tripInfoContent;
    switch (eventsList.length) {
      case TripCities.ONE:
        tripInfoContent = `${eventsList[0].destination.name}`;
        break;
      case TripCities.TWO:
        tripInfoContent = `${eventsList[0].destination.name} — ${eventsList[1].destination.name}`;
        break;
      case TripCities.THREE:
        tripInfoContent = `${eventsList[0].destination.name} — ${eventsList[1].destination.name} — ${eventsList[2].destination.name}`;
        break;
      default:
        tripInfoContent = `${eventsList[0].destination.name} — ... — ${eventsList[eventsList.length - 1].destination.name}`;
        break;
    }
    return tripInfoContent;
  };

  const tripInfoTitle = getTripInfoTitle();
  const firstDate = `${MONTH_NAMES[dayCounterFormat(eventsList[0].dateFrom)]} ${eventsList[0].dateFrom.getDate()}`;
  const lastDate = `${MONTH_NAMES[dayCounterFormat(eventsList[eventsList.length - 1].dateTo)]} ${eventsList[eventsList.length - 1].dateTo.getDate()}`;

  return (`<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${tripInfoTitle}</h1>

        <p class="trip-info__dates">${firstDate}&nbsp;—&nbsp;${lastDate}</p>
      </div>

      <p class="trip-info__cost">
        Total: €&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
      </p>
    </section>`
  );
};

export default class TripInfo extends AbstractComponent {
  constructor(pointsModel) {
    super();
    this._pointsModel = pointsModel;
  }
  getTemplate() {

    return createTripInfoTemplate(this._pointsModel.getAllPoints());
  }
}
