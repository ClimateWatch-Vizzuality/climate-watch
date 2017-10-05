import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import {
  getYColumnValue,
  getThemeConfig,
  getTooltipConfig,
  sortEmissionsByValue,
  sortLabelByAlpha,
  getColorPalette
} from 'utils/graphs';

// constants needed for data parsing
const DATA_SCALE = 1000000;

const BASE_COLORS = ['#25597C', '#DFE9ED'];

const AXES_CONFIG = {
  xBottom: {
    name: 'Year',
    unit: 'date',
    format: 'YYYY'
  },
  yLeft: {
    name: 'Emissions',
    unit: 'CO2e',
    format: 'number'
  }
};

const EXCLUDED_SECTORS = [
  'Total excluding LUCF',
  'Total including LUCF',
  'Total including LULUCF',
  'Total excluding LULUCF'
];

// meta data for selectors
const getMeta = state => state.meta || {};
const getSources = state => state.meta.data_source || [];
const getVersions = state => state.meta.gwp || [];

// values from search
const getSourceSelection = state => state.search.source || null;
const getVersionSelection = state => state.search.version || null;
const getFilterSelection = state => state.search.filter || null;

// data for the graph
const getData = state => state.data || [];

// Sources selectors
export const getSourceOptions = createSelector(getSources, sources => {
  if (!sources) return [];
  return sources.map(d => ({
    label: d.label,
    value: d.value
  }));
});

export const getSourceSelected = createSelector(
  [getSourceOptions, getSourceSelection],
  (sources, selected) => {
    if (!sources || !sources.length) return {};
    if (!selected) return sources[0];
    return sources.find(category => category.value === parseInt(selected, 10));
  }
);

// Versions selectors
export const getVersionOptions = createSelector(
  [getVersions, getSources, getSourceSelected],
  (versions, sources, sourceSelected) => {
    if (!sourceSelected || !versions) return [];
    const sourceData = sources.find(d => sourceSelected.value === d.value);
    return versions.filter(filter => sourceData.gwp.indexOf(filter.value) > -1);
  }
);

export const getVersionSelected = createSelector(
  [getVersionOptions, getVersionSelection],
  (versions, selected) => {
    if (!versions || !versions.length) return {};
    if (!selected) return versions[0];
    return versions.find(version => version.value === parseInt(selected, 10));
  }
);

// Filters selector
export const getFilterOptions = createSelector(
  [getMeta, getSourceSelected],
  (meta, sourceSelected) => {
    if (!sourceSelected || isEmpty(meta)) return [];
    const activeSourceData = meta.data_source.find(
      source => source.value === sourceSelected.value
    );
    const activeFilterKeys = activeSourceData.sector;
    const filteredSelected = meta.sector.filter(
      filter => activeFilterKeys.indexOf(filter.value) > -1
    );
    return sortLabelByAlpha(filteredSelected);
  }
);

export const getFiltersSelected = createSelector(
  [getFilterOptions, getFilterSelection],
  (filters, selected) => {
    if (!filters || !filters.length) return [];
    if (!selected) return filters;
    let selectedFilters = [];
    const selectedValues = selected.split(',');
    const selectedValuesNum = selectedValues.map(d => parseInt(d, 10));
    selectedFilters = filters.filter(
      filter => selectedValuesNum.indexOf(filter.value) > -1
    );
    return selectedFilters;
  }
);

// get selector defaults
export const getSelectorDefaults = createSelector(
  [getSources, getSourceSelected],
  (sources, sourceSelected) => {
    if (!sources || !sources.length || !sourceSelected) return {};
    const sourceData = sources.find(d => d.value === sourceSelected.value);
    return {
      sector: sourceData.sector[0],
      gas: sourceData.gas[0],
      source: sources[0].value
    };
  }
);

// Map the data from the API
export const filterData = createSelector(
  [getData, getFiltersSelected],
  data => {
    if (!data || !data.length) return [];
    return sortEmissionsByValue(
      data.filter(d => EXCLUDED_SECTORS.indexOf(d.sector) === -1)
    );
  }
);

export const getChartData = createSelector(
  [filterData, getFiltersSelected],
  (data, filters) => {
    if (!data || !data.length || !filters) return [];
    const xValues = data[0].emissions.map(d => d.year);
    const dataParsed = xValues.map(x => {
      const yItems = {};
      data.forEach(d => {
        const yKey = getYColumnValue(d.sector);
        const yData = d.emissions.find(e => e.year === x);
        yItems[yKey] = yData.value * DATA_SCALE;
      });
      const item = {
        x,
        ...yItems
      };
      return item;
    });
    return dataParsed;
  }
);

export const getChartConfig = createSelector([filterData], data => {
  if (!data || !data.length) return {};
  const yColumns = data.map(d => ({
    label: d.sector,
    value: getYColumnValue(d.sector)
  }));
  const yColumnsChecked = uniqBy(yColumns, 'value');
  const theme = getThemeConfig(
    yColumnsChecked,
    getColorPalette(BASE_COLORS, yColumnsChecked.length)
  );
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
});

export default {
  getSourceOptions,
  getSourceSelected,
  getFilterOptions,
  getFiltersSelected
};
