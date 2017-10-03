import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import {
  getYColumnValue,
  getThemeConfig,
  getTooltipConfig
} from './ghg-emissions-utils';

// constants needed for data parsing
const TOP_EMITTERS = [
  'CHN',
  'USA',
  'EU28',
  'IND',
  'RUS',
  'JPN',
  'BRA',
  'IDN',
  'CAN',
  'MEX'
];

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

const BREAY_BY_OPTIONS = [
  {
    label: 'Sector',
    value: 'sector'
  },
  {
    label: 'Regions',
    value: 'location'
  },
  {
    label: 'Gas',
    value: 'gas'
  }
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
const getBreakSelection = state => state.search.breakBy || null;
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

// BreakBy selectors
export const getBreaksByOptions = () => BREAY_BY_OPTIONS;

export const getBreakSelected = createSelector(
  [getBreaksByOptions, getBreakSelection],
  (breaks, selected) => {
    if (!breaks || !breaks.length) return {};
    if (!selected) return breaks[0];
    return breaks.find(category => category.value === selected);
  }
);

// Filters selector
export const getFilterOptions = createSelector(
  [getMeta, getSourceSelected, getBreakSelected, getRegionsOptions],
  (meta, sourceSelected, breakSelected, regions) => {
    if (!sourceSelected || !breakSelected || isEmpty(meta)) return [];
    const breakByValue = breakSelected.value;
    const activeSourceData = meta.data_source.find(
      source => source.value === sourceSelected.value
    );
    const activeFilterKeys = activeSourceData[breakByValue];
    const filteredSelected = meta[breakByValue].filter(
      filter => activeFilterKeys.indexOf(filter.value) > -1
    );
    if (breakByValue === 'location') {
      const countries = filteredSelected.map(d => ({
        ...d,
        groupId: 'countries'
      }));
      return uniqBy(countries.concat(regions), 'value');
    }
    return filteredSelected;
  }
);

export const getFiltersSelected = createSelector(
  [getFilterOptions, getFilterSelection, getBreakSelected],
  (filters, selected, breakBy) => {
    if (!filters || !filters.length) return [];
    if (!selected && breakBy.value !== 'location') return filters;
    let selectedFilters = [];
    if (breakBy.value === 'location' && !selected) {
      const selectedValues = TOP_EMITTERS;
      selectedFilters = filters.filter(
        filter => selectedValues.indexOf(filter.iso) > -1
      );
    } else {
      const selectedValues = selected.split(',');
      const selectedValuesNum = selectedValues.map(d => parseInt(d, 10));
      selectedFilters = filters.filter(
        filter => selectedValuesNum.indexOf(filter.value) > -1
      );
    }
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
  [getData, getVersionSelected, getFiltersSelected, getBreakSelected],
  (data, version, filters, breakBy) => {
    if (!data || !data.length || !filters || !filters.length) return [];
    const filterValues = filters.map(filter => filter.label);
    return data.filter(
      d =>
        d.gwp === version.label && filterValues.indexOf(d[breakBy.value]) > -1
    );
  }
);

export const getChartData = createSelector(
  [filterData, getBreakSelected, getFiltersSelected],
  (data, breakBy, filters) => {
    if (!data || !data.length || !breakBy || !filters) return [];
    const xValues = data[0].emissions.map(d => d.year);
    const dataParsed = xValues.map(x => {
      const yItems = {};
      data.forEach(d => {
        const yKey = getYColumnValue(d[breakBy.value]);
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
  [filterData, getBreakSelected],
  (data, breakBy) => {
    const yColumns = data.map(d => ({
      label: d[breakBy.value],
      value: getYColumnValue(d[breakBy.value])
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
  getBreaksByOptions,
  getBreakSelected,
  getFilterOptions,
  getFiltersSelected
};
