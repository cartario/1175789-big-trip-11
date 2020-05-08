import BoardComponent from "./components/board.js";
import TripController from "./controllers/trip.js";
import PointsModel from "./models/points.js";
import {generateEvents} from "./mock/event.js";
import {RenderPosition, render} from "./utils/render.js";

const TOTAL_EVENTS = 15;
const events = generateEvents(TOTAL_EVENTS);
const pointsModel = new PointsModel();

// связывает данные и модель
pointsModel.setPoints(events);

// ключевые узлы
const tripControlsElement = document.querySelector(`.trip-controls`);
document.querySelector(`.trip-events`).remove();

const boardContainer = document.querySelectorAll(`.page-body__container`)[1];
const boardComponent = new BoardComponent();

// связывает главный контроллер и модель
const tripController = new TripController(boardComponent, pointsModel);

render(boardContainer, boardComponent, RenderPosition.BEFOREEND);

tripController.render(events);
tripController.renderHeader(tripControlsElement);
