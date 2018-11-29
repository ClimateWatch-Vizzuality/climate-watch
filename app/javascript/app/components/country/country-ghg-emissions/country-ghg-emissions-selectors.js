import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import uniq from 'lodash/uniq';
import groupBy from 'lodash/groupBy';
import intersection from 'lodash/intersection';
import isArray from 'lodash/isArray';
import orderBy from 'lodash/orderBy';
import flatten from 'lodash/flatten';
import sumBy from 'lodash/sumBy';
import { getGhgEmissionDefaults, calculatedRatio } from 'utils/ghg-emissions';

import {
  getYColumnValue,
  getThemeConfig,
  getTooltipConfig,
  sortEmissionsByValue,
  sortLabelByAlpha,
  getColorPalette,
  setXAxisDomain,
  setYAxisDomain
} from 'utils/graphs';
import {
  CALCULATION_OPTIONS,
  QUANTIFICATIONS_CONFIG,
  DEFAULT_AXES_CONFIG,
  ALLOWED_SECTORS_BY_SOURCE,
  DATA_SCALE
} from 'data/constants';

// constants needed for data parsing
const BASE_COLORS = ['#25597C', '#DFE9ED'];

const options = Object.keys(CALCULATION_OPTIONS).map(
  calculationKey => CALCULATION_OPTIONS[calculationKey]
);

// meta data for selectors
const getMeta = state => state.meta || {};
const getQuantifications = state => state.quantifications || null;
const getCalculationData = state =>
  (state.calculationData && state.calculationData[state.iso]) || [];

// values from search
const getSourceSelection = state => state.search.source || null;
const getCalculationSelection = state => state.search.calculation || null;
const getVersionSelection = state => state.search.version || null;
const getFilterSelection = state => state.search.filter;

// data for the graph
const getData = state => state.data || [];

const getCountries = state => state.countries.data || null;
const getIso = state => state.iso;

const getCountryByIso = (countries = [], iso) =>
  countries.find(country => country.iso_code3 === iso);

export const getCountry = createSelector(
  [getCountries, getIso],
  getCountryByIso
);

export const getCountryName = createSelector(
  [getCountry],
  (country = {}) => country.wri_standard_name || ''
);

// Sources selectors
export const getSources = createSelector(
  getMeta,
  meta => meta.data_source || null
);
export const getVersions = createSelector(getMeta, meta => meta.gwp || null);

export const getSourceOptions = createSelector(getSources, sources => {
  if (!sources) return [];
  return sources.map(d => ({
    label: d.label,
    value: d.value,
    source: d.source
  }));
});

const parseCalculationData = createSelector([getCalculationData], data => {
  if (!data || !data.length) return null;
  return groupBy(data, 'year');
});

export const getCalculationOptions = () => options;

export const getSourceSelected = createSelector(
  [getSourceOptions, getSourceSelection],
  (sources, selected) => {
    if (!sources || !sources.length) return {};
    if (!selected) {
      const defaultSource = sources.find(s => s.label === 'UNFCCC');
      return defaultSource || sources[0];
    }
    return sources.find(category => category.value === parseInt(selected, 10));
  }
);

export const getCalculationSelected = createSelector(
  [getCalculationSelection],
  selected => {
    if (!selected) return options[0];
    return options.find(calculation => calculation.value === selected);
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
    if (!versions || !versions.length) return null;
    if (!selected) {
      const AR4Version = versions.find(version => version.label === 'AR4');
      return AR4Version || versions[0];
    }
    return versions.find(version => version.value === parseInt(selected, 10));
  }
);

export const getAllowedSectors = createSelector(
  [getSourceSelected, getVersionSelected],
  (source, version) => {
    if (!source || !version) return null;
    if (source.label === 'UNFCCC') {
      return ALLOWED_SECTORS_BY_SOURCE[source.label][version.label];
    }
    return ALLOWED_SECTORS_BY_SOURCE[source.label];
  }
);

// Filters selector
export const getFilterOptions = createSelector(
  [getData, getMeta, getAllowedSectors],
  (data, meta, sectorsAllowed) => {
    if (!sectorsAllowed || isEmpty(data) || isEmpty(meta)) return [];
    const sectorLabels = uniq(data.map(d => d.sector));
    const filteredSelected = meta.sector.filter(
      filter =>
        sectorLabels.indexOf(filter.label) > -1 &&
        sectorsAllowed.indexOf(filter.label) > -1
    );
    return sortLabelByAlpha(filteredSelected);
  }
);

export const getFiltersSelected = createSelector(
  [getFilterOptions, getFilterSelection, getCalculationSelected],
  (filters, selected, calculation) => {
    if (!filters || !filters.length) return [];
    if (selected === '') return [];
    if (!selected || calculation.value !== 'ABSOLUTE_VALUE') return filters;
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
  [getSourceSelected, getMeta],
  (sourceSelected, meta) => {
    if (!sourceSelected || !meta || isEmpty(meta)) return null;
    return getGhgEmissionDefaults(sourceSelected.label, meta);
  }
);

// Map the data from the API
export const filterData = createSelector(
  [getData, getSourceSelected, getCalculationSelected, getFiltersSelected],
  (data, sourceSelected, calculation, filters) => {
    if (!data || !data.length) return [];
    let filteredData = sortEmissionsByValue(
      data.filter(d => filters.map(f => f.label).indexOf(d.sector.trim()) >= 0)
    );
    // If the data has the AR4 version (latest) we only want to display that data to avoid duplicates
    const hasAR4 = filteredData.some(d => d.gwp === 'AR4');
    if (hasAR4) filteredData = filteredData.filter(d => d.gwp === 'AR4');
    if (calculation.value !== 'ABSOLUTE_VALUE') {
      const dataGrouped = groupBy(
        flatten(filteredData.map(d => d.emissions)),
        'year'
      );
      const dataSummed = Object.keys(dataGrouped).map(year => ({
        year: parseInt(year, 10),
        value: sumBy(dataGrouped[year], 'value')
      }));
      const compressedData = {
        ...filteredData[0],
        sector: 'Total',
        emissions: dataSummed
      };
      return [compressedData];
    }
    return filteredData;
  }
);

export const getQuantificationsData = createSelector(
  getQuantifications,
  quantifications => {
    if (!quantifications) return [];
    const qGrouped = groupBy(quantifications, 'year');
    const qParsed = [];
    // Grouping the same year and value to concat the labels
    Object.keys(qGrouped).forEach(function (year) {
      const values = groupBy(qGrouped[year], 'value');
      Object.keys(values).forEach(function (value) {
        let valuesParsed = {};
        values[value].forEach(function (v, index) {
          if (index === 0) {
            const isRange = isArray(v.value);
            const yValue = isRange
              ? v.value.map(y => y * DATA_SCALE).sort()
              : v.value * DATA_SCALE;
            valuesParsed = {
              x: v.year,
              y: v.value !== null && v.value !== undefined ? yValue : null,
              label: v.label,
              isRange
            };
          } else {
            valuesParsed.label += `, ${v.label}`;
          }
        });
        qParsed.push(valuesParsed);
      });
    });
    // Sort desc to avoid z-index problem in the graph
    return orderBy(qParsed, 'y', 'desc');
  }
);

export const getQuantificationsTagsConfig = createSelector(
  getQuantifications,
  quantifications => {
    if (!quantifications) return [];
    const config = [];
    const bau = quantifications.find(
      q => q.label.includes('BAU') && q.value !== null
    );
    const qua = quantifications.find(
      q => q.label !== null && !q.label.includes('BAU')
    );
    const nq = quantifications.find(q => q.value === null);
    if (bau) {
      config.push(QUANTIFICATIONS_CONFIG.bau);
    }
    if (qua) {
      config.push(QUANTIFICATIONS_CONFIG.quantified);
    }
    if (nq) {
      config.push(QUANTIFICATIONS_CONFIG.not_quantifiable);
    }
    return config;
  }
);

export const getChartData = createSelector(
  [
    filterData,
    getFiltersSelected,
    parseCalculationData,
    getCalculationSelected,
    getQuantifications
  ],
  (data, filters, calculationData, calculationSelected) => {
    if (!data || !data.length || !filters || !calculationSelected) {
      return [];
    }
    let xValues = [];
    xValues = data[0].emissions.map(d => d.year);
    if (
      calculationData &&
      calculationSelected.value !== CALCULATION_OPTIONS.ABSOLUTE_VALUE.value
    ) {
      xValues = intersection(
        xValues,
        Object.keys(calculationData || []).map(y => parseInt(y, 10))
      );
    }

    const dataParsed = xValues.map(x => {
      const yItems = {};
      data.forEach(d => {
        const yKey = getYColumnValue(d.sector);
        const yData = d.emissions.find(e => e.year === x);
        const calculationRatio = calculatedRatio(
          calculationSelected.value,
          calculationData,
          x
        );
        if (yData) {
          const scaledYData = yData.value * DATA_SCALE;
          if (yData.value) {
            yItems[yKey] = scaledYData / calculationRatio;
          }
        }
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

export const getChartDomain = createSelector([getChartData], data => {
  if (!data) return null;
  return { x: setXAxisDomain(), y: setYAxisDomain() };
});

// variable that caches chart elements assigned color
// to avoid element color changing when the chart is updated
let colorThemeCache = {};

export const getChartConfig = createSelector(
  [filterData, getCalculationSelected],
  (data, calculationSelected) => {
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
    colorThemeCache = { ...theme, ...colorThemeCache };
    const tooltip = getTooltipConfig(yColumnsChecked);
    let unit = DEFAULT_AXES_CONFIG.yLeft.unit;
    if (calculationSelected.value === CALCULATION_OPTIONS.PER_GDP.value) {
      unit = `${unit}/ million $ GDP`;
    } else if (
      calculationSelected.value === CALCULATION_OPTIONS.PER_CAPITA.value
    ) {
      unit = `${unit} per capita`;
    }
    const axes = {
      ...DEFAULT_AXES_CONFIG,
      yLeft: {
        ...DEFAULT_AXES_CONFIG.yLeft,
        unit
      }
    };
    return {
      axes,
      theme: colorThemeCache,
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
  getFiltersSelected,
  getCalculationData
};
