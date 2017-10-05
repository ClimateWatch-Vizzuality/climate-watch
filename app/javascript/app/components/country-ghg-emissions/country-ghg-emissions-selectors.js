import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import {
  getYColumnValue,
  getThemeConfig,
  getTooltipConfig,
  sortEmissionsByValue,
  sortLabelByAlpha
} from './country-ghg-emissions-utils';

// constants needed for data parsing
const DATA_SCALE = 1000000;

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
  '#938126'
];

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

// meta data for selectors
const getMeta = state => state.meta || {};
const getSources = state => state.meta.data_source || [];
const getRegions = state => state.regions || [];
const getVersions = state => state.meta.gwp || [];

// values from search
const getSourceSelection = state => state.search.source || null;
const getVersionSelection = state => state.search.version || null;
const getFilterSelection = state => state.search.filter || null;

// data for the graph
const getData = state => state.data || [];

//
export const getRegionsOptions = createSelector(getRegions, regions => {
  if (!regions) return [];
  return regions.map(d => ({
    label: d.wri_standard_name,
    value: d.iso_code3,
    groudId: 'regions'
  }));
});

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
  [getMeta, getSourceSelected, getRegionsOptions],
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
      gas: sourceData.gas[0]
    };
  }
);

// Map the data from the API
export const filterData = createSelector(
  [getData, getFiltersSelected],
  (data, filters) => {
    if (!data || !data.length || !filters || !filters.length) return [];
    const filterValues = filters.map(filter => filter.label);
    return sortEmissionsByValue(
      data.filter(
        d =>
          filterValues.indexOf(d.value) > -1
      )
    );
  }
);

export const getChartData = createSelector(
  [getData, getFiltersSelected],
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

export const getChartConfig = createSelector(
  [getData],
  (data) => {
    if (!data || !data.length) return {};
    const yColumns = data.map(d => ({
      label: d.sector,
      value: getYColumnValue(d.sector)
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
  getSourceOptions,
  getSourceSelected,
  getFilterOptions,
  getFiltersSelected
};
