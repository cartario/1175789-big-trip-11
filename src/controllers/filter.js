import FiltersComponent from "../components/filters.js";
import {RenderPosition, render, replace, remove} from "../utils/render.js";
import {getEventsByFilter} from "../utils/filter.js";
import {FilterType} from "../const.js";

export default class FilterController {
  constructor(container, model) {
    this._container = container;
    this._filterComponent = null;
    this._activeFilterType = FilterType.EVERYTHING;
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._pointsModel = model;
  }

  render() {
    const allEvents = this._pointsModel.getAllPoints();
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: getEventsByFilter(allEvents, filterType).length,
        checked: filterType === this._activeFilterType,
      };

    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new FiltersComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {

      replace(this._filterComponent, oldComponent);

    } else {

      render(this._container, this._filterComponent, RenderPosition.BEFOREEND);

    }
  }

  _onDataChange() {
    this.render();
  }

  _onFilterChange(filterType) {
    this._activeFilterType = filterType;
    this._pointsModel.setFilter(filterType);
  }

  destroy() {
    remove(this._filterComponent);
  }
}
