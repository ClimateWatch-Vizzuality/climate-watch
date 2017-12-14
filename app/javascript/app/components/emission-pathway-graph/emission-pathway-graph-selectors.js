import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import pick from 'lodash/pick';
import remove from 'lodash/remove';
import uniq from 'lodash/uniq';
import groupBy from 'lodash/groupBy';
import {
  getYColumnValue,
  getThemeConfig,
  getTooltipConfig
} from 'utils/graphs';
import { ESP_BLACKLIST } from 'data/constants';

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
const getAvailableLocationsModelIds = state => state.availableModelIds || null;
const getModels = state => state.models || null;
const getScenarios = state => state.scenarios || null;
const getIndicators = state => state.indicators || null;

const getLocation = state => state.location || null;
const getModel = state => state.model || null;
const getScenario = state => state.scenario;
const getIndicator = state => state.indicator || null;
const getCategory = state => state.category || null;

// data for the graph
const getData = state => state.data || null;

const getAvailableModelIds = createSelector(
  [getAvailableLocationsModelIds, getLocation],
  (availableLocationModelIds, location) => {
    if (!availableLocationModelIds || !location) return null;
    return availableLocationModelIds[location];
  }
);

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

export const getModelsOptions = createSelector(
  [getModels, getAvailableModelIds],
  (models, availableModelIds) => {
    if (!models || !models.length) return [];
    let availableModels = models;
    if (!isEmpty(availableModelIds)) {
      availableModels = models.filter(
        m => availableModelIds.indexOf(m.id) > -1
      );
    }
    return availableModels.map(m => ({
      label: m.abbreviation,
      value: m.id.toString(),
      scenarios: m.scenarios ? m.scenarios.map(s => s.id.toString()) : null
    }));
  }
);

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

const getAvailableIndicators = createSelector(
  [filterDataByScenario, getIndicators, getModelSelected],
  (data, indicators, modelSelected) => {
    if (!data || !indicators || !indicators.length || !modelSelected) return [];
    const indicatorsWithData = data.map(d => d.indicator_id.toString());
    const selectedIndicatorOptionsWithData = [];
    indicators.forEach(i => {
      if (
        i.model &&
        i.model.id &&
        i.model.id.toString() === modelSelected.value &&
        i.name &&
        indicatorsWithData.indexOf(i.id.toString()) > -1
      ) {
        selectedIndicatorOptionsWithData.push(i);
      }
    });

    return selectedIndicatorOptionsWithData;
  }
);

export const getAvailableCategoryOptions = createSelector(
  [getAvailableIndicators],
  indicators => {
    if (!indicators) return null;
    const uniqueCategories = uniq(indicators.map(i => i.category.name));

    return uniqueCategories.map(c => ({
      label: c,
      value: c
    }));
  }
);

export const getCategorySelected = createSelector(
  [getAvailableCategoryOptions, getCategory],
  (categories, categorySelected) => {
    if (!categories) return null;
    if (!categorySelected) {
      const defaultCategory = categories.find(i => i.label === 'Energy');
      return defaultCategory || categories[0];
    }
    return categories.find(c => categorySelected === c.value);
  }
);

export const getIndicatorsOptions = createSelector(
  [getAvailableIndicators, getCategorySelected],
  (indicators, selectedCategory) => {
    if (!indicators) return null;
    let filteredIndicatorsByCategory = indicators;
    if (selectedCategory) {
      filteredIndicatorsByCategory = indicators.filter(
        i => selectedCategory.label === (i.category && i.category.name)
      );
    }
    return uniqBy(
      filteredIndicatorsByCategory.map(i => ({
        label: i.name,
        value: i.id.toString()
      })),
      'label'
    );
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
    getAvailableCategoryOptions
  ],
  (locations, models, scenarios, indicators, categories) => ({
    locations,
    models,
    scenarios,
    indicators,
    categories
  })
);

export const getFiltersSelected = createSelector(
  [
    getLocationSelected,
    getModelSelected,
    getScenariosSelected,
    getIndicatorSelected,
    getCategorySelected
  ],
  (location, model, scenarios, indicator, category) => ({
    location,
    model,
    scenarios,
    indicator,
    category
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

// Parse Metadata for Modal
export const getModelSelectedMetadata = createSelector(
  [getModels, getModelSelected],
  (models, modelSelected) => {
    if (!models || !modelSelected) return null;
    return models.find(m => modelSelected.value === m.id.toString());
  }
);

export const addLinktoModelSelectedMetadata = createSelector(
  [getModelSelectedMetadata],
  model => {
    if (!model) return null;
    return {
      ...model,
      Link: `/emission-pathways/models/${model.id}`
    };
  }
);

export const getScenariosSelectedMetadata = createSelector(
  [getScenarios, getScenariosSelected],
  (scenarios, scenariosSelected) => {
    if (isEmpty(scenarios) || !scenariosSelected) return null;
    const selectedScenarioIds = scenariosSelected.map(s => s.value);
    const scenariosMetadata = scenarios.filter(
      s => selectedScenarioIds.indexOf(s.id.toString()) > -1
    );
    return (
      scenariosMetadata.length > 0 &&
      scenariosMetadata.map(s => ({
        name: s.name,
        description: s.description,
        Link: `/emission-pathways/scenarios/${s.id}`
      }))
    );
  }
);

export const getIndicatorSelectedMetadata = createSelector(
  [getIndicators, getIndicatorSelected],
  (indicators, indicatorSelected) => {
    if (!indicators || !indicatorSelected) return null;
    return indicators.find(i => indicatorSelected.value === i.id.toString());
  }
);

export const filterModelsByBlackList = createSelector(
  [addLinktoModelSelectedMetadata],
  data => {
    if (!data || isEmpty(data)) return null;
    const whiteList = remove(
      Object.keys(data),
      n => ESP_BLACKLIST.models.indexOf(n) === -1
    );
    return pick(data, whiteList);
  }
);

export const filterIndicatorsByBlackList = createSelector(
  [getIndicatorSelectedMetadata],
  data => {
    if (!data || isEmpty(data)) return null;
    const whiteList = remove(
      Object.keys(data),
      n => ESP_BLACKLIST.indicators.indexOf(n) === -1
    );
    return pick(data, whiteList);
  }
);

export const parseObjectsInIndicators = createSelector(
  [filterIndicatorsByBlackList],
  data => {
    if (isEmpty(data)) return null;
    const parsedData = {};
    Object.keys(data).forEach(key => {
      let fieldData = data[key];
      if (
        fieldData &&
        typeof fieldData !== 'string' &&
        typeof fieldData !== 'number'
      ) {
        fieldData = fieldData.name;
      }
      parsedData[key] = fieldData;
    });
    return parsedData;
  }
);

export const getModalData = createSelector(
  [
    filterModelsByBlackList,
    getScenariosSelectedMetadata,
    parseObjectsInIndicators
  ],
  (model, scenarios, indicator) => [model, scenarios, indicator]
);

export default {
  getChartData,
  getChartConfig,
  getFiltersOptions,
  getFiltersSelected,
  getModalData
};
