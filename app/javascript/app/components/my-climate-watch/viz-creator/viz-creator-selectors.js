import { createSelector } from 'reselect';
import { get } from 'js-lenses';
import _ from 'lodash-inflection';
import _find from 'lodash/find';
import _isEmpty from 'lodash/isEmpty';
import _uniqBy from 'lodash/uniqBy';

import { flatMapVis, mapFilter } from './viz-creator-utils';
import { updateCacheItem, visCreatorCache } from './viz-creator-cache';

import * as lenses from './viz-creator-lenses';
import {
  lineChart1Data,
  lineChart2Data
} from './components/charts/line/line-config';
import {
  pieChart1Data,
  pieChart2Data
} from './components/charts/pie/pie-config';
import {
  stackBarChart1Data,
  stackBarChart2Data
} from './components/charts/stack-bar/stack-bar-config';

export const dataSelector = state => state;
export const smallSelector = state => state.small;
export const datasetsSelector = state => get(lenses.$datasets, state);
export const visualisationsSelector = state =>
  get(lenses.$visualisations, state);
export const locationsSelector = state => get(lenses.$locations, state);
export const modelsSelector = state => get(lenses.$models, state);
export const scenariosSelector = state => get(lenses.$scenarios, state);
export const indicatorsSelector = state => get(lenses.$indicators, state);
export const categoriesSelector = state => get(lenses.$categories, state);
export const subcategoriesSelector = state => get(lenses.$subcategories, state);
export const yearsSelector = state => get(lenses.$years, state);
export const timeseriesSelector = state => get(lenses.$timeseries, state);
export const titleSelector = state => state.title;
export const placeholderSelector = state => state.placeholder;
export const editingSelector = state => state.creatorIsEditing;

export const hasDataSelector = createSelector(
  [timeseriesSelector, scenariosSelector],
  (timeseries, scenarios) =>
    timeseries &&
    !_isEmpty(timeseries.data) &&
    scenarios &&
    !_isEmpty(scenarios.data)
);

export const vizTypes = data => data && data['viz-types'];
export const vizSelector = createSelector(datasetsSelector, sets =>
  vizTypes(_find(sets.data, { id: sets.selected }))
);

export const selectedStructureSelector = createSelector(
  [vizSelector, visualisationsSelector, locationsSelector],
  (vizStructure, visualisations) => {
    const selectedStructure = _find(flatMapVis(vizStructure), {
      id: visualisations && visualisations.selected
    });
    return selectedStructure || {};
  }
);

export const filtersSelector = createSelector(
  selectedStructureSelector,
  selectedStructure => (selectedStructure && selectedStructure.filters) || []
);

export const visualisationChartSelector = createSelector(
  selectedStructureSelector,
  selectedStructure => selectedStructure && selectedStructure.chart
);

export const getVisualisationType = createSelector(
  visualisationChartSelector,
  chart => chart && chart.type
);

export const getOnlyStackable = createSelector(
  selectedStructureSelector,
  structure => structure && structure.onlyStackableIndicators
);

export const getVisualisationOptions = createSelector(
  visualisationChartSelector,
  chart => chart && chart.options
);

export const chartDataSelector = createSelector(
  [
    hasDataSelector,
    timeseriesSelector,
    scenariosSelector,
    selectedStructureSelector,
    indicatorsSelector,
    locationsSelector,
    subcategoriesSelector,
    smallSelector
  ],
  (
    hasData,
    timeseries,
    scenarios,
    selectedStructure,
    indicators,
    locations,
    subcategories,
    small
  ) => {
    if (!hasData) return {};
    const indicatorLabel =
      indicators && indicators.selected && indicators.selected.label;
    const categoryLabel =
      subcategories.selected && subcategories.selected.label;
    const yAxisLabel = selectedStructure.filters.find(
      f => f.name === 'indicators'
    ).multi
      ? categoryLabel
      : indicatorLabel;
    switch (selectedStructure.id) {
      case 'LineChart-1':
        return lineChart1Data(
          timeseries.data,
          scenarios.data,
          indicators.data,
          small
        );

      case 'StackBarChart-1':
        return stackBarChart1Data(
          timeseries.data,
          indicators.data,
          yAxisLabel,
          small
        );

      case 'PieChart-1':
        return pieChart1Data(
          timeseries.data,
          indicators.data,
          yAxisLabel,
          small
        );

      case 'LineChart-2':
        return lineChart2Data(
          timeseries.data,
          locations.data,
          indicators.data,
          small
        );

      case 'PieChart-2':
        return pieChart2Data(
          timeseries.data,
          indicators.data,
          locations.data,
          yAxisLabel,
          small
        );

      case 'StackBarChart-2':
        return stackBarChart2Data(
          timeseries.data,
          locations.data,
          indicators.data,
          yAxisLabel,
          small
        );

      default:
        return {};
    }
  }
);

const filterLocationsByModel = (locations, models, multi) => {
  if (!locations || !locations.length) return null;
  if (!models || !multi) return locations;

  const modelsLocations = models.map(m => m.geographic_coverage);
  const locationsArray = locations.filter(location =>
    modelsLocations.reduce(
      (acc, model) => acc || model.includes(location.name),
      false
    )
  );
  return _uniqBy(locationsArray, 'id');
};

const filterModelsByLocations = (models, locations) => {
  if (!models || !models.length) return null;
  if (!locations) return models;
  const locationsSelected = [...locations].map(l => l.label);
  return models.filter(model =>
    locationsSelected.reduce(
      (acc, location) => acc && model.geographic_coverage.includes(location),
      true
    )
  );
};

const filterSelection = (name, lense, state, multi = false) => {
  const hasChild = lense.child && lense.child.data.length > 0;
  const hasData = lense.data.length > 0;
  if (name === 'locations' && hasChild) {
    const models = filterModelsByLocations(lense.child.data, lense.selected);
    return mapFilter(filterLocationsByModel(lense.data, models, multi));
  } else if (name === 'models' && hasData) {
    const location = locationsSelector(state);
    return mapFilter(filterModelsByLocations(lense.data, location.selected));
  }
  return mapFilter(lense.data);
};

function isFilterMulti(multi, dataStructure) {
  if (!_isEmpty(dataStructure) && !_isEmpty(dataStructure.selected)) {
    return multi ? [...dataStructure.selected] : { ...dataStructure.selected };
  }
  return multi ? [] : {};
}

export const getFormatFilters = name =>
  createSelector(
    [dataSelector, filtersSelector, editingSelector],
    (state, spec, editing) => {
      if (!spec || !spec.length > 0) return {};

      const filter = { ...(_find(spec, { name }) || {}) };
      const lense = get(lenses[`$${name}`], state) || {};
      filter.data = filterSelection(name, lense, state, filter.multi);
      filter.placeholder = `Select ${_.singularize(_.titleize(name))}`;
      filter.label = _.titleize(name);
      filter.loaded = lense.loaded;
      filter.loading = lense.loading;
      filter.disabled = lense.disabled;
      filter.child = lense.child.name;
      filter.selected = editing
        ? isFilterMulti(filter.multi, visCreatorCache[name])
        : isFilterMulti(filter.multi, lense);

      updateCacheItem(name, filter);
      if (visCreatorCache[name] && !_isEmpty(visCreatorCache[name].selected)) {
        return visCreatorCache[name];
      }
      return filter;
    }
  );

export const getPlaceholder = createSelector(
  [
    placeholderSelector,
    selectedStructureSelector,
    locationsSelector,
    categoriesSelector,
    indicatorsSelector
  ],
  (placeholder, selectedStructure, location, category, indicator) => {
    if (!selectedStructure || !category.selected || !indicator.selected) {
      return undefined;
    }
    const locationsFilter =
      selectedStructure.filters &&
      selectedStructure.filters.find(f => f.name === 'locations');
    const locationsLabel =
      !locationsFilter || !locationsFilter.multi
        ? `${location.selected.label} - `
        : '';
    const placeholderText = `${locationsLabel}${category.selected
      .label} - ${category.child.selected.label}`;

    const indicators =
      selectedStructure.filters &&
      selectedStructure.filters.find(f => f.name === 'indicators');
    const singleIndicator = !indicators || !indicators.multi;
    return (
      placeholder ||
      (singleIndicator
        ? `${placeholderText} - ${indicator.selected.label}`
        : `${placeholderText}`)
    );
  }
);
