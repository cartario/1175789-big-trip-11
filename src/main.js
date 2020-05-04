import BoardComponent from "./components/board.js";
import FiltersComponent from "./components/filters.js";
import TripTabsComponent from "./components/trip-tabs.js";
import TripController from "./controllers/trip.js";
import {generateEvents} from "./mock/event.js";
import {generateFilters} from "./mock/filter.js";
import {RenderPosition, render} from "./utils/render.js";

const TOTAL_EVENTS = 15;
const events = generateEvents(TOTAL_EVENTS);
const filters = generateFilters();

// ключевые узлы
const tripControlsElement = document.querySelector(`.trip-controls`);
document.querySelector(`.trip-events`).remove();

const boardContainer = document.querySelectorAll(`.page-body__container`)[1];
const boardComponent = new BoardComponent();
const tripController = new TripController(boardComponent);

render(boardContainer, boardComponent, RenderPosition.BEFOREEND);
render(tripControlsElement, new TripTabsComponent(), RenderPosition.BEFOREEND);
render(tripControlsElement, new FiltersComponent(filters), RenderPosition.BEFOREEND);

tripController.render(events);
