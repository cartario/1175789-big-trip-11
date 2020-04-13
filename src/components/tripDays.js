export const createTripDaysListTemplate = () => {
  return `
    <ul class="trip-days">
      <li class="trip-days__item  day">
        <ul class="trip-events__list">
        </ul>
      </li>
    </ul>
  `;
};

export const createDayCounter = () => {
  return `<div class="day__info">
                <span class="day__counter">1</span>
                <time class="day__date" datetime="2019-03-18">MAR 18</time>
              </div>`;
};
