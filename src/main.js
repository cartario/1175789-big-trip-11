import API from "./api.js";
import BoardComponent from "./components/board.js";
import TripController from "./controllers/trip.js";
import PointsModel from "./models/points.js";

// import {generateEvents} from "./mock/event.js";
import {RenderPosition, render} from "./utils/render.js";
import TripTabsComponent, {MenuItem} from "./components/trip-tabs.js";
import StatsComponent from "./components/stats.js";

const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;
const api = new API(`Basic er83jdzbdw`, END_POINT);


// const TOTAL_EVENTS = 15;
// const events = generateEvents(TOTAL_EVENTS);
const pointsModel = new PointsModel();


// ключевые узлы
const tripControlsElement = document.querySelector(`.trip-controls`);
document.querySelector(`.trip-events`).remove();

const boardContainer = document.querySelectorAll(`.page-body__container`)[1];
const boardComponent = new BoardComponent();

// связывает главный контроллер и модель
const tripController = new TripController(boardComponent, pointsModel, api);

render(boardContainer, boardComponent, RenderPosition.BEFOREEND);


const newEventButton = document.querySelector(`.trip-main__event-add-btn`);
newEventButton.addEventListener(`click`, () => {

  tripController.createEvent();
});

const statsComponent = new StatsComponent(pointsModel);
render(boardContainer, statsComponent, RenderPosition.AFTERBEGIN);
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

api.getEvents()
  .then((events) => {
    // связывает данные и модель
    pointsModel.setPoints(events);
    tripController.render();
    tripController.renderHeader(tripControlsElement);
  });

// api.getOffers()
//   .then((offers) => {
//     console.log(offers)
//   });

// api.getDestinations()
// .then(() => {

// });
