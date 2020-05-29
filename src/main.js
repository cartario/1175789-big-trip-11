import API from "./api/index.js";
import Provider from "./api/provider.js";
import Store from "./api/store.js";
import BoardComponent from "./components/board.js";
import TripController from "./controllers/trip.js";
import PointsModel from "./models/points.js";
import {RenderPosition, render} from "./utils/render.js";
import TripTabsComponent, {MenuItem} from "./components/trip-tabs.js";
import StatsComponent from "./components/stats.js";

const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `bigtrip-localstorage`;
const STORE_VER = `v1`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new API(`Basic er83jdzbdw`, END_POINT);
const store = new Store(STORE_NAME, window.localStorage);

const apiWithProvider = new Provider(api, store);

const pointsModel = new PointsModel();

const tripControlsElement = document.querySelector(`.trip-controls`);
document.querySelector(`.trip-events`).remove();

const boardContainerElement = document.querySelectorAll(`.page-body__container`)[1];
const boardComponent = new BoardComponent();

const tripController = new TripController(boardComponent, pointsModel, apiWithProvider);

render(boardContainerElement, boardComponent, RenderPosition.BEFOREEND);

const newEventButtonElement = document.querySelector(`.trip-main__event-add-btn`);

newEventButtonElement.addEventListener(`click`, () => {
  tripController.createEvent();
});

const statsComponent = new StatsComponent(pointsModel);
render(boardContainerElement, statsComponent, RenderPosition.AFTERBEGIN);
statsComponent.hide();

const siteMenuComponent = new TripTabsComponent();
render(tripControlsElement, siteMenuComponent, RenderPosition.AFTERBEGIN);

siteMenuComponent.setOnChange((menuItem) => {
  siteMenuComponent.setActiveItem(menuItem);
  switch (menuItem) {
    case MenuItem.STATS:
      tripController.hide();
      statsComponent.show();
      break;
    case MenuItem.TABLE:
      statsComponent.hide();
      tripController.show();
  }
});

apiWithProvider.getOffers()
  .then((offers) => {
    pointsModel.setOffers(offers);
    return apiWithProvider.getDestinations()
.then((destinations) => {
  pointsModel.setDestinations(destinations);
  return apiWithProvider.getEvents()
    .then((events) => {
      pointsModel.setPoints(events);
      tripController.render();
      tripController.renderHeader(tripControlsElement);
    });
});
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      // Действие, в случае успешной регистрации ServiceWorker
    }).catch(() => {
      // Действие, в случае ошибки при регистрации ServiceWorker
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(`[offline]`, ``);
  apiWithProvider.sync();

});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
