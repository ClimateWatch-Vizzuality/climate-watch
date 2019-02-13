import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import uniqBy from 'lodash/uniqBy';
import uniq from 'lodash/uniq';
import groupBy from 'lodash/groupBy';
import isArray from 'lodash/isArray';
import sortBy from 'lodash/sortBy';
import remove from 'lodash/remove';
import pick from 'lodash/pick';
import {
  getYColumnValue,
  getThemeConfig,
  getTooltipConfig,
  setYAxisDomain,
  setChartColors
} from 'utils/graphs';

import { generateLinkToDataExplorer } from 'utils/data-explorer';

import {
  ESP_BLACKLIST,
  CHART_COLORS,
  CHART_COLORS_EXTENDED
} from 'data/constants';

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

const DEFAULT_SELECTIONS = {
  model: 'Global Change Assessment Model',
  indicator: 'CO2'
};

const getSearch = state => state.search || null;

// meta data for selectors
const getLocations = state => state.locations || null;
const getModels = state => state.models || null;
const getAllScenarios = state => state.allScenarios || null;
const getIndicators = state => state.indicators || null;

const getLocation = state => parseInt(state.location, 10) || null;
const getModel = state => parseInt(state.model, 10) || null;
const getScenarios = state => state.scenario || null;
const getIndicator = state => parseInt(state.indicator, 10) || null;
const getCategory = () => 3; // 3 is for Agriculture, Land use and Forestry

// data for the graph
const getData = state => state.data || null;

// Selector options
export const getLocationsOptions = createSelector([getLocations], locations => {
  if (!locations || !locations.length) return [];
  return sortBy(locations, 'name').map(l => ({
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
      return null;
    }
    const modelOptions = [];
    models.forEach(m => {
      if (availableModels.indexOf(m.id) > -1) {
        modelOptions.push({
          label: m.full_name,
          value: m.id,
          scenarios: m.scenario_ids,
          logo: m.logo,
          url: m.url
        });
      }
    });
    return modelOptions;
  }
);

export const getModelSelected = createSelector(
  [getModelsOptions, getModel, getModels],
  (models, modelSelected, allModels) => {
    if (!models || isEmpty(allModels)) return null;
    if (!modelSelected) {
      const defaultModel = models.find(
        m => m.label === DEFAULT_SELECTIONS.model
      );
      return defaultModel || models[0];
    }
    return models.find(m => modelSelected === m.value);
  }
);

export const getUnavailableModelSelected = createSelector(
  [getModel, getModelSelected, getModels],
  (modelSelected, availableModel, allModels) => {
    if (isEmpty(allModels) || !modelSelected) return null;
    if (availableModel) return availableModel;
    const unavailableModel = allModels.find(m => modelSelected === m.id);
    return { label: unavailableModel.full_name };
  }
);

export const getScenariosOptions = createSelector(
  [getAllScenarios, getModelSelected],
  (allScenarios, modelSelected) => {
    if (!modelSelected || !allScenarios || !allScenarios.length) return null;
    const filteredScenarios = allScenarios.filter(
      s => modelSelected.scenarios.indexOf(s.id) > -1
    );
    return filteredScenarios.map(s => ({
      label: s.name,
      value: s.id,
      purpose: s.purpose_or_objective || ''
    }));
  }
);

export const getScenariosSelected = createSelector(
  [getScenariosOptions, getScenarios, getModelSelected],
  (scenarios, scenariosSelected, model) => {
    if (!scenarios || !model) return null;
    if ((!scenariosSelected && !model.scenarios) || scenariosSelected === '') {
      return null;
    }
    if (!scenariosSelected) {
      return scenarios;
    }
    const scenarioSelectedArray = isArray(scenariosSelected)
      ? scenariosSelected
      : scenariosSelected.split(',');
    const scenarioSelectedParsed = scenarioSelectedArray.map(s =>
      parseInt(s, 10)
    );
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

export const getIndicatorsOptions = createSelector(
  [getIndicatorsWithData, getCategory],
  (indicators, category) => {
    if (!indicators || !indicators.length || !category) return [];
    let filteredIndicators = indicators;

    if (category) {
      filteredIndicators = indicators.filter(
        i => i.category && i.category.id === category
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
      const defaultIndicator = indicators.find(
        i => i.label === DEFAULT_SELECTIONS.indicator
      );
      return defaultIndicator || indicators[0];
    }
    return indicators.find(i => indicatorSelected === i.value);
  }
);

export const getUnavailableIndicatorSelected = createSelector(
  [getIndicator, getIndicatorSelected, getIndicators],
  (indicatorSelected, availableIndicator, allIndicators) => {
    if (isEmpty(allIndicators)) return null;
    if (!isUndefined(availableIndicator)) return availableIndicator;
    const unavailableIndicator = allIndicators.find(
      m => indicatorSelected === m.id
    );
    return { label: unavailableIndicator.name };
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
    getCategoryOptions
  ],
  (locations, models, scenarios, indicators, category) => ({
    locations,
    models,
    scenarios,
    indicators,
    category
  })
);

export const getFiltersSelected = createSelector(
  [
    getLocationSelected,
    getModelSelected,
    getUnavailableModelSelected,
    getScenariosSelected,
    getCategorySelected,
    getIndicatorSelected,
    getUnavailableIndicatorSelected
  ],
  (
    location,
    model,
    unavailableModel,
    scenario,
    category,
    indicator,
    unavailableIndicator
  ) => ({
    location,
    model: model || unavailableModel,
    scenario,
    category,
    indicator: indicator || unavailableIndicator
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

export const getChartDomain = createSelector([getChartData], data => {
  if (!data) return null;
  const xValues = data.map(d => d.x);

  return {
    x: [Math.min(...xValues), Math.max(...xValues)],
    y: setYAxisDomain()
  };
});

export const getChartNeededPrecision = createSelector(
  [getChartDomain],
  domain => {
    if (!domain) return null;
    const yValuesDifference = domain.y[1] - domain.y[0];
    const decimalZerosBeforeNumber = String(yValuesDifference).match(
      /0\.(0+)[^0]/
    );
    const neededPrecision =
      decimalZerosBeforeNumber &&
      decimalZerosBeforeNumber[1] &&
      decimalZerosBeforeNumber.length;
    return neededPrecision && neededPrecision + 1;
  }
);
// The y axis domain has some margins added when the values are very similar to each other to represent this little difference
export const getChartDomainWithYMargins = createSelector(
  [getChartDomain, getChartNeededPrecision],
  (domain, neededPrecision) => {
    if (!domain) return null;
    if (!neededPrecision) return domain;
    const y = [
      dataMin => dataMin - 10 ** ((neededPrecision - 1) * -1),
      dataMax => dataMax + 10 ** ((neededPrecision - 1) * -1)
    ];
    return {
      x: domain.x,
      y
    };
  }
);

// variable that caches chart elements assigned color
// to avoid element color changing when the chart is updated
let colorThemeCache = {};

export const getChartConfig = createSelector(
  [
    filterDataByIndicator,
    getAllScenarios,
    getScenariosOptions,
    getIndicatorSelected,
    getChartNeededPrecision
  ],
  (data, allScenarios, scenariosInChart, indicator, precision) => {
    if (!data || !allScenarios) return null;
    const yColumns = data.map(d => {
      const scenario = scenariosInChart.find(
        s => parseInt(s.value, 10) === d.scenario_id
      );
      return {
        label: scenario ? scenario.label : null,
        value: getYColumnValue(d.scenario_id),
        url: `/pathways/scenarios/${scenario.value}`,
        legendTooltip: scenario.purpose
      };
    });

    const yColumnsChecked = uniqBy(yColumns, 'value');
    const chartColors = setChartColors(
      yColumnsChecked,
      CHART_COLORS,
      CHART_COLORS_EXTENDED
    );
    const theme = getThemeConfig(yColumnsChecked, chartColors);
    colorThemeCache = { ...theme, ...colorThemeCache };
    const tooltip = getTooltipConfig(yColumnsChecked);
    const axes = indicator
      ? {
        ...AXES_CONFIG,
        yLeft: { ...AXES_CONFIG.yLeft, unit: indicator.unit }
      }
      : AXES_CONFIG;
    return {
      axes,
      theme: colorThemeCache,
      tooltip,
      precision,
      columns: {
        x: [{ label: 'year', value: 'x' }],
        y: yColumnsChecked
      },
      legendNote: true
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
      Link: `/pathways/models/${model.id}`
    };
  }
);

export const getScenariosSelectedMetadata = createSelector(
  [getAllScenarios, getScenariosSelected],
  (allScenarios, scenariosSelected) => {
    if (isEmpty(allScenarios) || !scenariosSelected) return null;
    const selectedScenarioIds = scenariosSelected.map(s => s.value);
    const scenariosMetadata = allScenarios.filter(
      s => selectedScenarioIds.indexOf(s.id) > -1
    );
    return (
      scenariosMetadata.length > 0 &&
      scenariosMetadata.map(s => ({
        name: s.name,
        description: s.description,
        Link: `/pathways/scenarios/${s.id}`
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

export const getLinkToDataExplorer = createSelector(
  [getSearch, getAllScenarios],
  (search, allScenarios) => {
    const section = 'emission-pathways';
    if (!allScenarios.length) return null;
    if (!search.scenario && search.model) {
      // Adds the first scenario belonging to the selected model to populate
      // Data Explorer dropdown and table in case there's no scenario selected
      const scenarioId = allScenarios.find(
        s => s.model.id === parseInt(search.model, 10)
      ).id;
      const filtersWithScenario = {
        ...search,
        scenario: scenarioId
      };
      return generateLinkToDataExplorer(filtersWithScenario, section);
    }
    return generateLinkToDataExplorer(search, section);
  }
);

export const getExplorePathwaysButtonConfig = createSelector(
  getFiltersSelected,
  filters => {
    if (!filters) return {};
    const { location, category, indicator, model } = filters;
    const locationParam = location ? `currentLocation=${location.value}` : '';
    const categoryParam = category ? `category=${category.value}` : '';
    const indicatorParam = indicator ? `indicator=${indicator.value}` : '';
    const modelParam = model && model.value ? `model=${model.value}` : '';
    const selection = [
      locationParam,
      categoryParam,
      indicatorParam,
      modelParam
    ];
    const paramsString = selection.filter(p => p !== '').join('&');
    return paramsString
      ? {
        link: `/pathways/model?${paramsString}`
      }
      : { link: '/pathways/model' };
  }
);

export default {
  getChartData,
  getChartDomainWithYMargins,
  getChartConfig,
  getFiltersOptions,
  getFiltersSelected,
  getExplorePathwaysButtonConfig
};
