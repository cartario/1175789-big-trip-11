import {RenderPosition, render, replace} from "../utils/render.js";
import SortComponent, {SortType} from "../components/sort.js";
import TripDaysComponent from "../components/trip-days.js";
import TripInfoComponent from "../components/trip-info.js";
import TripDayComponent from "../components/trip-day.js";
import EventComponent from "../components/event.js";
import EventEditComponent from "../components/event-edit.js";
import NoEventsComponent from "../components/no-events.js";

export default class TripController {
  constructor(container) {
    this._container = container;
    this._tripDaysComponent = new TripDaysComponent();
    this._noEventComponent = new NoEventsComponent();
    this._sortComponent = new SortComponent();

  }

  render(events) {
    const tripMain = document.querySelector(`.trip-main`);

    const renderBoard = () => {

      const isEventsExist = !!events;

      const getSortedEventsByDate = () => {
        return [...events].slice().sort((a, b) => a.dateFrom.getTime() - b.dateFrom.getTime());
      };

      const sortedEventsByDate = isEventsExist ? getSortedEventsByDate() : [];

      if (!isEventsExist) {
        render(this._container.getElement(), this._noEventComponent, RenderPosition.BEFOREEND);
        return;
      }
      render(this._container.getElement(), this._sortComponent, RenderPosition.BEFOREEND);
      render(this._container.getElement(), this._tripDaysComponent, RenderPosition.BEFOREEND);
      render(tripMain, new TripInfoComponent(events), RenderPosition.AFTERBEGIN);
      renderTripDays(sortedEventsByDate);

      this._sortComponent.setSortTypeChangeHandler(() => {
        this._tripDaysComponent.getElement().innerHTML = ``;
        renderTripDays(sortedEventsByDate);

      });
    };

    const renderTripDays = (sortedEventsByDate) => {
      let dayCount = 0;
      let tripDayEventsList = null;
      let prevDate = null;

      for (const event of sortedEventsByDate) {
        const dateFrom = event.dateFrom.getDate();

        if (prevDate !== dateFrom) {
          dayCount++;
          prevDate = dateFrom;
          const tripDayComponent = new TripDayComponent(event, dayCount);
          tripDayEventsList = tripDayComponent.getElement().querySelector(`.trip-events__list`);
          render(this._tripDaysComponent.getElement(), tripDayComponent, RenderPosition.BEFOREEND);
        }
        renderEvent(tripDayEventsList, event);
      }
    };

    const renderEvent = (tripEventsList, event) => {
      const eventComponent = new EventComponent(event);
      const eventEditComponent = new EventEditComponent(event);

      const onEscKeyDown = (evt) => {
        const isEscKey = evt.key === `Escape` || evt.ket === `Esc`;
        if (isEscKey) {
          replace(eventComponent, eventEditComponent);
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };

      eventComponent.setRollupBtnClickHandler(() => {
        replace(eventEditComponent, eventComponent);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

      eventEditComponent.setRollupBtnClickHandler(() => {
        replace(eventComponent, eventEditComponent);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

      render(tripEventsList, eventComponent, RenderPosition.BEFOREEND);
    };

    renderBoard();
  }
}
