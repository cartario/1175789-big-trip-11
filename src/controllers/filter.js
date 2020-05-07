import FiltersComponent from "../components/filters.js";
import {RenderPosition, render} from "../utils/render.js";

const FilterType = {
  EVERYTHING: `everything`,
  PAST: `past`,
  FUTURE: `future`,
}

export default class FilterController {
  constructor(container, pointsModel) {
    this._container = container;
    this._pointsModel = pointsModel;
    this._filterComponent = null;
    this._activeFilterType = FilterType.EVERYTHING;

  }

  render() {
    const filters = Object.values(FilterType).map((filterType) => {
      return {
        name: filterType,
        count: ``,
        checked: filterType === this._activeFilterType,
      }
    });

    this._filterComponent = new FiltersComponent(filters);

    render(this._container, this._filterComponent, RenderPosition.BEFOREEND);
  }
}
