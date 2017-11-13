import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import union from 'lodash/union';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import {
  getYColumnValue,
  getThemeConfig,
  getTooltipConfig,
  sortEmissionsByValue,
  sortLabelByAlpha
} from 'utils/graphs';

// constants needed for data parsing
const COLORS = [
  '#2D9290',
  '#B25BD0',
  '#7EA759',
  '#FF0D3A',
  '#687AB7',
  '#BC6332',
  '#F97DA1',
  '#00971D',
  '#F1933B',
  '#938126',
  '#2D9290',
  '#B25BD0',
  '#7EA759'
];

const AXES_CONFIG = {
  xBottom: {
    name: 'Year',
    unit: 'date',
    format: 'YYYY'
  },
  yLeft: {
    name: 'Emissions',
    unit: 'CO<sub>2</sub>e',
    format: 'number'
  }
};

// meta data for selectors
const getLocations = state => state.locations || null;
const getModels = state => state.models || null;
const getScenarios = state => state.scenarios || null;
const getIndicators = state => state.indicators || null;

const getLocation = state => state.location || null;
const getModel = state => state.model || null;
const getScenario = state => state.scenario || null;
const getIndicator = state => state.indicator || null;

// data for the graph
const getData = state => state.data || null;

// Selector options
export const getLocationsOptions = createSelector([getLocations], locations => {
  if (!locations || !locations.length) return [];
  return locations.map(l => ({
    label: l.name,
    value: l.id.toString()
  }));
});

export const getLocationSelected = createSelector(
  [getLocationsOptions, getLocation],
  (locations, locationSelected) => {
    if (!locations) return null;
    if (!locationSelected) return locations[0];
    if (!locationSelected) {
      const defaultLocation = locations.find(l => l.label === 'World');
      return defaultLocation || locations[0];
    }
    return locations.find(l => locationSelected === l.value);
  }
);

export const getModelsOptions = createSelector([getModels], models => {
  if (!models || !models.length) return [];
  return models.map(m => ({
    label: m.abbreviation,
    value: m.id.toString()
  }));
});

export const getModelSelected = createSelector(
  [getModelsOptions, getModel],
  (models, modelSelected) => {
    if (!models) return null;
    if (!modelSelected) {
      const defaultModel = models.find(m => m.label === 'GCAM');
      return defaultModel || models[0];
    }
    return models.find(m => modelSelected === m.value);
  }
);

export const getScenariosOptions = createSelector([getScenarios], scenarios => {
  if (!scenarios || !scenarios.length) return [];
  return scenarios.map(s => ({
    label: s.name,
    value: s.id.toString()
  }));
});

export const getScenarioSelected = createSelector(
  [getScenariosOptions, getScenario],
  (scenarios, scenarioSelected) => {
    if (!scenarios) return null;
    if (!scenarioSelected) return scenarios[0];
    return scenarios.find(s => scenarioSelected === s.value);
  }
);

export const getIndicatorsOptions = createSelector(
  [getIndicators, getModelSelected],
  (indicators, modelSelected) => {
    if (!indicators || !indicators.length || !modelSelected) return [];
    return indicators
      .map(i => ({
        label: i.alias,
        value: i.id.toString()
      }))
      .filter(i => i.value === modelSelected.value);
  }
);

export const getIndicatorSelected = createSelector(
  [getIndicatorsOptions, getIndicator],
  (indicators, indicatorSelected) => {
    if (!indicators) return null;
    if (!indicatorSelected) return indicators[0];
    if (!indicatorSelected) {
      const defaultIndicator = indicators.find(i => i.label === 'Heat');
      return defaultIndicator || indicators[0];
    }
    return indicators.find(i => indicatorSelected === i.value);
  }
);

export const getFiltersOptions = createSelector(
  [
    getLocationsOptions,
    getModelsOptions,
    getScenariosOptions,
    getIndicatorsOptions
  ],
  (locations, models, scenarios, indicators) => ({
    locations,
    models,
    scenarios,
    indicators
  })
);

export const getFiltersSelected = createSelector(
  [
    getLocationSelected,
    getModelSelected,
    getScenarioSelected,
    getIndicatorSelected
  ],
  (location, model, scenario, indicator) => ({
    location,
    model,
    scenario,
    indicator
  })
);

// Map the data from the API
export const filterData = createSelector(
  [getData, getFiltersSelected],
  (data, filters) => {
    if (!data || isEmpty(data) || !filters.indicator) return null;
    return data.filter(
      d => d.indicator_id === parseInt(filters.indicator.value, 10)
    );
  }
);

export const getChartData = createSelector([filterData], data => {
  if (!data) return null;
  const groupByYear = groupBy(data, 'year');
  const xValues = Object.keys(groupByYear);
  const dataMapped = [];
  xValues.forEach(x => {
    const yValues = {};
    const groupedByScenario = groupBy(groupByYear[x], 'scenario_id');
    Object.keys(groupedByScenario).forEach(i => {
      yValues[`y${i}`] = parseInt(groupedByScenario[i][0].value, 10);
    });
    dataMapped.push({
      x,
      ...yValues
    });
  });
  return dataMapped;
});

export const getChartConfig = createSelector(
  [filterData, getScenariosOptions],
  (data, scenarios) => {
    if (!data || !scenarios) return null;
    const yColumns = data.map(d => ({
      label: scenarios.find(s => parseInt(s.value, 10) === d.scenario_id).label,
      value: getYColumnValue(d.scenario_id)
    }));
    const yColumnsChecked = uniqBy(yColumns, 'value');
    const theme = getThemeConfig(yColumnsChecked, COLORS);
    const tooltip = getTooltipConfig(yColumnsChecked);
    return {
      axes: AXES_CONFIG,
      theme,
      tooltip,
      columns: {
        x: [{ label: 'year', value: 'x' }],
        y: yColumnsChecked
      }
    };
  }
);

export default {
  getChartData,
  getChartConfig,
  getFiltersOptions,
  getFiltersSelected
};
