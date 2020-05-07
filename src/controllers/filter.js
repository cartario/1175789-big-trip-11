import FiltersComponent from "../components/filters.js";
import {RenderPosition, render} from "../utils/render.js";
import {getEventsByFilter} from "../utils/filter.js";
import {FilterType} from "../const.js";



export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._filterComponent = null;
    this._activeFilterType = FilterType.EVERYTHING;
    this._onDataChange = this._onDataChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._pointsModel.setDataChangeHandler(this._onDataChange);

  }

  render() {
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: ``,
        checked: filterType === this._activeFilterType,
      }
    });

    const oldComponent = this._filterComponent;

    this._filterComponent = new FiltersComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {

      replace (this._filterComponent, oldComponent)

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
}
