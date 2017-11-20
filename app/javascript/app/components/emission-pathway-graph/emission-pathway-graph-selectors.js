import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import groupBy from 'lodash/groupBy';
import {
  getYColumnValue,
  getThemeConfig,
  getTooltipConfig
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
const getScenario = state => state.scenario;
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
    value: m.id.toString(),
    scenarios: m.scenarios ? m.scenarios.map(s => s.id.toString()) : null
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

export const getScenariosOptions = createSelector(
  [getScenarios, getModelSelected],
  (scenarios, modelSelected) => {
    if (!modelSelected || !scenarios || !scenarios.length) return [];
    const filteredScenarios = scenarios.filter(
      s => modelSelected.scenarios.indexOf(s.id.toString()) > -1
    );
    return filteredScenarios.map(s => ({
      label: s.name,
      value: s.id.toString()
    }));
  }
);

export const getScenariosSelected = createSelector(
  [getScenariosOptions, getScenario, getModelSelected],
  (scenarios, scenarioSelected, model) => {
    if (!scenarios || !model) return null;
    if (!scenarioSelected && !model.scenarios) return null;
    if (!scenarioSelected) {
      return scenarios.filter(s => model.scenarios.indexOf(s.value) > -1);
    }
    const activeScenarios = scenarioSelected.split(',');
    return scenarios.filter(s => activeScenarios.indexOf(s.value) > -1);
  }
);

export const getIndicatorsOptions = createSelector(
  [getIndicators, getModelSelected],
  (indicators, modelSelected) => {
    if (!indicators || !indicators.length || !modelSelected) return [];
    return indicators
      .map(i => ({
        label: i.name,
        value: i.id.toString()
      }))
      .filter(i => i.value === modelSelected.value);
  }
);

export const getIndicatorSelected = createSelector(
  [getIndicatorsOptions, getIndicator],
  (indicators, indicatorSelected) => {
    if (!indicators) return null;
    // temp fix to allow no filter by indicator
    if (!indicatorSelected) return null;
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
    getIndicatorSelected,
    getScenariosSelected
  ],
  (location, model, indicator, scenarios) => ({
    location,
    model,
    indicator,
    scenarios
  })
);

// Map the data from the API
export const filterDataByScenario = createSelector(
  [getData, getFiltersSelected, getScenario],
  (data, filters, activeScenarios) => {
    if (!data || isEmpty(data) || activeScenarios === '') return null;
    if (!filters.scenarios) return data;
    return data.filter(
      d =>
        filters.scenarios.map(s => s.value).indexOf(d.scenario_id.toString()) >
        -1
    );
  }
);

export const filterDataByIndicator = createSelector(
  [filterDataByScenario, getFiltersSelected],
  (data, filters) => {
    if (!data || isEmpty(data)) return null;
    if (!filters.indicator) return data;
    return data.filter(
      d => d.indicator_id === filters.indicator.value.toString()
    );
  }
);

export const getChartData = createSelector([filterDataByIndicator], data => {
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
  [filterDataByIndicator, getScenariosOptions],
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
