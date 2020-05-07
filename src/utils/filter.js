import {FilterType} from "../const.js";

const nowDate = new Date();

export const getPastEvents = (events) => {
  return events.filter((event) => event.dateFrom < nowDate)
}

export const getFutureEvents = (events) => {
  return events.filter((event) => event.dateFrom > nowDate)
}

export const getEventsByFilter = (events, filterType) => {

  switch(filterType) {
    case FilterType.EVERYTHING:
      return events;
    case FilterType.PAST:
      return getPastEvents(events);
    case FilterType.FUTURE:
      return getFutureEvents(events);
  }
}

