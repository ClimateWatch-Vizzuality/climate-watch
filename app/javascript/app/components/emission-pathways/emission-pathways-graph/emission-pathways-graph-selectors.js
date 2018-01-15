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
const getSubcategory = state => state.subcategory || null;

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
    if ((!scenarioSelected && !model.scenarios) || scenarioSelected === '') {
      return [];
    }
    if (!scenarioSelected) {
      return scenarios;
    }
    const activeScenarios = scenarioSelected.split(',');
    return scenarios.filter(s => activeScenarios.indexOf(s.value) > -1);
  }
);

// Map the data from the API
export const filterDataByScenario = createSelector(
  [getData, getScenariosSelected],
  (data, scenarios) => {
    if (!data || isEmpty(data) || scenarios === '') return null;
    if (!scenarios) return data;
    return data.filter(
      d => scenarios.map(s => s.value).indexOf(d.scenario_id.toString()) > -1
    );
  }
);

const getIndicatorsWithData = createSelector(
  [filterDataByScenario, getIndicators, getModelSelected],
  (data, indicators, modelSelected) => {
    if (!data || !indicators || !indicators.length || !modelSelected) return [];
    const indicatorsWithData = data.map(d => d.indicator_id.toString());
    return uniqBy(
      indicators.filter(
        i =>
          i.model &&
          i.model.id &&
          i.model.id.toString() === modelSelected.value &&
          i.name &&
          indicatorsWithData.indexOf(i.id.toString()) > -1
      ),
      'name'
    );
  }
);

export const getSubCategoryOptions = createSelector(
  [getIndicatorsWithData],
  indicators => {
    if (!indicators) return [];
    const subcategories = indicators.map(i => ({
      label: i.subcategory.name,
      value: i.subcategory.id.toString()
    }));
    return uniqBy(subcategories, 'value');
  }
);

export const getSubcategorySelected = createSelector(
  [getSubCategoryOptions, getSubcategory],
  (subcategories, subcategorySelected) => {
    if (!subcategories) return null;
    if (!subcategorySelected) {
      return subcategories[0];
    }
    return subcategories.find(i => subcategorySelected === i.value);
  }
);

export const getIndicatorsOptions = createSelector(
  [getIndicatorsWithData, getSubcategorySelected],
  (indicators, subcategory) => {
    if (!indicators) return [];
    let filteredIndicators = indicators;
    if (subcategory) {
      filteredIndicators = indicators.filter(
        i => i.subcategory === subcategory.label
      );
    }
    return filteredIndicators.map(i => ({
      label: i.name,
      value: i.id.toString()
    }));
  }
);

export const getIndicatorSelected = createSelector(
  [getIndicatorsOptions, getIndicator],
  (indicators, indicatorSelected) => {
    if (!indicators) return null;
    if (!indicatorSelected) {
      const defaultIndicator = indicators.find(i => i.label === 'Heat');
      return defaultIndicator || indicators[0];
    }
    return indicators.find(i => indicatorSelected === i.value);
  }
);

export const filterDataByIndicator = createSelector(
  [filterDataByScenario, getIndicatorSelected],
  (data, indicator) => {
    if (!data || isEmpty(data)) return null;
    if (!indicator) return data;
    return data.filter(
      d => d.indicator_id.toString() === indicator.value.toString()
    );
  }
);

export const getFiltersOptions = createSelector(
  [
    getLocationsOptions,
    getModelsOptions,
    getScenariosOptions,
    getIndicatorsOptions,
    getSubCategoryOptions
  ],
  (locations, models, scenarios, indicators, subcategory) => ({
    locations,
    models,
    scenarios,
    indicators,
    subcategory
  })
);

export const getFiltersSelected = createSelector(
  [
    getLocationSelected,
    getModelSelected,
    getScenariosSelected,
    getIndicatorSelected,
    getSubcategorySelected
  ],
  (location, model, scenarios, indicator, subcategory) => ({
    location,
    model,
    scenarios,
    indicator,
    subcategory
  })
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
      yValues[`y${i}`] = parseFloat(groupedByScenario[i][0].value);
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
    const yColumns = data.map(d => {
      const scenario = scenarios.find(
        s => parseInt(s.value, 10) === d.scenario_id
      );
      return {
        label: scenario ? scenario.label : null,
        value: getYColumnValue(d.scenario_id)
      };
    });
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
