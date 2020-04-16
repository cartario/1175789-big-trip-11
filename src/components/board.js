import {createElement} from "../utils.js";

export const createBoardTemplate = () => {
  return `<h2 class="visually-hidden">Trip events</h2>
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get"></form>
  <ul class="trip-days"></ul>`;
};
