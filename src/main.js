import TripInfoComponent from "./components/trip-info.js";
import TripTabsComponent from "./components/trip-tabs.js";
import FiltersComponent from "./components/filters.js";
import TripDaysComponent from "./components/trip-days.js";
import TripDayComponent from "./components/trip-day.js";
import SortComponent from "./components/sort.js";
import EventComponent from "./components/event.js";
import EventEditComponent from "./components/event-edit.js";

import {generateEvents} from "./mock/event.js";
import {generateFilters} from "./mock/filter.js";


import {RenderPosition, render} from "./utils.js";

const TOTAL_EVENTS = 5;

const events = generateEvents(TOTAL_EVENTS);

const filters = generateFilters();

// ключевые узлы
const tripMain = document.querySelector(`.trip-main`);
const tripControlsElement = document.querySelector(`.trip-controls`);
const tripEvents = document.querySelector(`.trip-events`);

const tripDaysComponent = new TripDaysComponent();

// группирует ф-ии отрисовки меню
const renderMenu = () => {
  render(tripMain, new TripInfoComponent(events).getElement(), RenderPosition.AFTERBEGIN);
  render(tripControlsElement, new TripTabsComponent().getElement(), RenderPosition.BEFOREEND);
  render(tripControlsElement, new FiltersComponent(filters).getElement(), RenderPosition.BEFOREEND);
};

// ф-я сортировки по дате
const getSortedEventsByDate = (events) => {
  const sortedEvents = [...events];
  return sortedEvents.slice().sort((a, b) => a.dateFrom.getTime() - b.dateFrom.getTime());
};

const sortedEventsByDate = getSortedEventsByDate(events);

// массив уникальных дат, получает множество дат
const getAllDays = (eventsList) => {
  const eventDays = new Set();
  eventsList.forEach((event) => {
    const date = `${event.dateFrom.getFullYear()}.${event.dateFrom.getMonth()}.${event.dateFrom.getDate()}`

    // проверка га уникальность, добавляет дату вмассив, если она не повторяется
    if (!eventDays.has(date)){
      eventDays.add(date)
    }
  })
  return eventDays;
};

const allDays = getAllDays(sortedEventsByDate);
/////////////////////////////////////////////////////////////////
// преобразует множество в массив
// console.log([...allDays]);

const renderEvent = (tripEventsList, event) => {
  const eventComponent = new EventComponent(event);
  const eventEditComponent = new EventEditComponent(event);

  // находит кнопку в dom-elementе eventComponent
  const eventRollupBtn = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  const eventEditRollupBtn = eventEditComponent.getElement().querySelector(`.event__rollup-btn`);

  // реализация замены
  const replaceEventToEdit = () => {
    tripEventsList.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceEditToEvent = () => {
    tripEventsList.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  eventRollupBtn.addEventListener(`click`, function () {
    replaceEventToEdit();
  });

  eventEditRollupBtn.addEventListener(`click`, function () {
    replaceEditToEvent();
  });

  // отрисовка eventComponent в dom-elemente tripEventsList
  render(tripEventsList, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderTripDays = (events) => {

  let dayCount = 0;
  let tripDayEventsList;

  for (const day of allDays) {
    const dayEvents = [];
    dayCount++;

    for (const event of sortedEventsByDate) {
      const date = `${event.dateFrom.getFullYear()}.${event.dateFrom.getMonth()}.${event.dateFrom.getDate()}`;
      if (day === date) {
      dayEvents.push(event);

      const tripDayComponent = new TripDayComponent(event, dayCount);
      render(tripDaysComponent.getElement(), tripDayComponent.getElement(), RenderPosition.BEFOREEND);

      tripDayEventsList = tripDayComponent.getElement().querySelectorAll(`.trip-events__list`);

        for (const eventDay of dayEvents) {
          tripDayEventsList.forEach((it) => renderEvent(it, eventDay));
        }
      }
    }
  }
};

renderTripDays(sortedEventsByDate);

//////////////////////////////////////////////////
// рендит сортировку
render(tripEvents, new SortComponent().getElement(), RenderPosition.BEFOREEND);

// рендит trip-days в tripEvents
render(tripEvents, tripDaysComponent.getElement(), RenderPosition.BEFOREEND);

// рендит меню
renderMenu();
