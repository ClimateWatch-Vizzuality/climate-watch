import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import uniq from 'lodash/uniq';
import groupBy from 'lodash/groupBy';
import remove from 'lodash/remove';
import pick from 'lodash/pick';
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
const getModels = state => state.models || null;
const getScenarios = state => state.scenarios || null;
const getIndicators = state => state.indicators || null;

const getLocation = state => parseInt(state.location, 10) || null;
const getModel = state => parseInt(state.model, 10) || null;
const getScenario = state => state.scenario || null;
const getIndicator = state => parseInt(state.indicator, 10) || null;
const getCategory = state => parseInt(state.category, 10) || null;
const getSubcategory = state => parseInt(state.subcategory, 10) || null;

// data for the graph
const getData = state => state.data || null;

// Selector options
export const getLocationsOptions = createSelector([getLocations], locations => {
  if (!locations || !locations.length) return [];
  return locations.map(l => ({
    label: l.name,
    value: l.id
  }));
});

const getLocationSelected = createSelector(
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

const getAvailableModels = createSelector(
  [state => state.availableModels, getLocationSelected],
  (availableModels, location) => {
    if (isEmpty(availableModels) || !location) return null;
    return availableModels[location.value];
  }
);

export const getModelsOptions = createSelector(
  [getModels, getAvailableModels],
  (models, availableModels) => {
    if (
      !models ||
      !models.length ||
      !availableModels ||
      isEmpty(availableModels)
    ) {
      return [];
    }
    const modelOptions = [];
    models.forEach(m => {
      if (availableModels.indexOf(m.id) > -1) {
        modelOptions.push({
          label: m.abbreviation,
          value: m.id,
          scenarios: m.scenario_ids
        });
      }
    });
    return modelOptions;
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
    if (!modelSelected || !scenarios || !scenarios.length) return null;
    const filteredScenarios = scenarios.filter(
      s => modelSelected.scenarios.indexOf(s.id) > -1
    );
    return filteredScenarios.map(s => ({
      label: s.name,
      value: s.id
    }));
  }
);

export const getScenariosSelected = createSelector(
  [getScenariosOptions, getScenario, getModelSelected],
  (scenarios, scenarioSelected, model) => {
    if (!scenarios || !model) return null;
    if ((!scenarioSelected && !model.scenarios) || scenarioSelected === '') {
      return null;
    }
    if (!scenarioSelected) {
      return scenarios;
    }
    const scenarioSelectedParsed = scenarioSelected
      .split(',')
      .map(s => parseInt(s, 10));
    return scenarios.filter(s => scenarioSelectedParsed.indexOf(s.value) > -1);
  }
);

// Map the data from the API
export const filterDataByScenario = createSelector(
  [getData, getScenariosSelected],
  (data, scenarios) => {
    if (!data || isEmpty(data) || scenarios === '') return null;
    if (!scenarios) return data;
    return data.filter(
      d => scenarios.map(s => s.value).indexOf(d.scenario_id) > -1
    );
  }
);

const getIndicatorsWithData = createSelector(
  [filterDataByScenario, getIndicators, getModelSelected],
  (data, indicators, modelSelected) => {
    if (!data || !indicators || !indicators.length || !modelSelected) {
      return null;
    }
    const indicatorsWithData = uniq(data.map(d => d.indicator_id));
    return indicators.filter(
      i => i.name && indicatorsWithData.indexOf(i.id) > -1
    );
  }
);

export const getCategoryOptions = createSelector(
  [getIndicatorsWithData],
  indicators => {
    if (!indicators) return null;
    const categories = indicators.filter(i => i.category).map(i => ({
      label: i.category.name,
      value: i.category.id
    }));
    return uniqBy(categories, 'value');
  }
);

export const getCategorySelected = createSelector(
  [getCategoryOptions, getCategory],
  (categories, categorySelected) => {
    if (!categories) return null;
    if (!categorySelected) {
      return categories[0];
    }
    return categories.find(i => i.value === categorySelected);
  }
);

export const getSubCategoryOptions = createSelector(
  [getIndicatorsWithData, getCategorySelected],
  (indicators, category) => {
    if (!indicators || !category) return null;
    const indicatorsSelected = indicators.filter(
      i => i.category.id === category.value
    );
    const subcategories = (indicatorsSelected || []).map(i => ({
      label: i.subcategory.name,
      value: i.subcategory.id
    }));
    return uniqBy(subcategories, 'value');
  }
);

export const getSubcategorySelected = createSelector(
  [getSubCategoryOptions, getSubcategory],
  (subcategories, subcategorySelected) => {
    if (!subcategories) return null;
    if (!subcategorySelected) {
      const defaultSubcategory =
        subcategories.find(s => s.label === 'GHG Emissions by gas') ||
        subcategories.find(s => s.label === 'Total GHG Emissions');
      return defaultSubcategory || subcategories[0];
    }
    return subcategories.find(s => subcategorySelected === s.value);
  }
);

export const getIndicatorsOptions = createSelector(
  [getIndicatorsWithData, getSubcategorySelected],
  (indicators, subcategory) => {
    if (!indicators || !indicators.length || !subcategory) return [];
    let filteredIndicators = indicators;
    if (subcategory) {
      filteredIndicators = indicators.filter(
        i => i.subcategory.id === subcategory.value
      );
    }

    return filteredIndicators.map(i => ({
      label: i.name || i.composite_name || '',
      value: i.id,
      unit: i.unit,
      subcategory: i.subcategory.name
    }));
  }
);

export const getIndicatorSelected = createSelector(
  [getIndicatorsOptions, getIndicator],
  (indicators, indicatorSelected) => {
    if (!indicators || !indicators.length) return null;
    if (!indicatorSelected) {
      const defaultIndicator = indicators.find(i => i.label === 'CO2');
      return defaultIndicator || indicators[0];
    }
    return indicators.find(i => indicatorSelected === i.value);
  }
);

export const filterDataByIndicator = createSelector(
  [filterDataByScenario, getIndicatorSelected],
  (data, indicator) => {
    if (!data || isEmpty(data) || !indicator) return null;
    return data.filter(d => d.indicator_id === indicator.value);
  }
);

export const getFiltersOptions = createSelector(
  [
    getLocationsOptions,
    getModelsOptions,
    getScenariosOptions,
    getIndicatorsOptions,
    getCategoryOptions,
    getSubCategoryOptions
  ],
  (locations, models, scenarios, indicators, category, subcategory) => ({
    locations,
    models,
    scenarios,
    indicators,
    category,
    subcategory
  })
);

export const getFiltersSelected = createSelector(
  [
    getLocationSelected,
    getModelSelected,
    getScenariosSelected,
    getCategorySelected,
    getSubcategorySelected,
    getIndicatorSelected
  ],
  (location, model, scenarios, category, subcategory, indicator) => ({
    location,
    model,
    scenarios,
    category,
    subcategory,
    indicator
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

export const getChartXDomain = createSelector([getChartData], data => {
  if (!data) return null;
  const xValues = data.map(d => d.x);
  return { x: [Math.min(...xValues), Math.max(...xValues)] };
});

export const getChartConfig = createSelector(
  [filterDataByIndicator, getScenariosOptions, getIndicatorSelected],
  (data, scenarios, indicator) => {
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
    const axes = indicator
      ? {
        ...AXES_CONFIG,
        yLeft: { ...AXES_CONFIG.yLeft, unit: indicator.unit }
      }
      : AXES_CONFIG;

    return {
      axes,
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
const getModelSelectedMetadata = createSelector(
  [getModels, getModelSelected],
  (models, modelSelected) => {
    if (!models || !modelSelected) return null;
    return models.find(m => modelSelected.value === m.id);
  }
);

const addLinktoModelSelectedMetadata = createSelector(
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
      s => selectedScenarioIds.indexOf(s.id) > -1
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
    return indicators.find(i => indicatorSelected.value === i.id);
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

const filterIndicatorsByBlackList = createSelector(
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
  getChartXDomain,
  getChartConfig,
  getFiltersOptions,
  getFiltersSelected
};
