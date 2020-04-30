import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
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
  getColorPalette,
  setXAxisDomain,
  setYAxisDomain
} from 'utils/graphs';
import {
  CALCULATION_OPTIONS,
  QUANTIFICATIONS_CONFIG,
  DEFAULT_AXES_CONFIG,
  DATA_SCALE
} from 'data/constants';

// constants needed for data parsing
const BASE_COLORS = ['#25597C', '#DFE9ED'];

const options = Object.keys(CALCULATION_OPTIONS).map(
  calculationKey => CALCULATION_OPTIONS[calculationKey]
);

// meta data for selectors
const getMeta = state => state.meta || {};
const getSectors = state => (state.meta && state.meta.sector) || null;
const getQuantifications = state => state.quantifications || null;
const getCalculationData = state =>
  (state.calculationData && state.calculationData[state.iso]) || [];

// values from search
const getSourceSelection = state => state.search.source || null;
const getCalculationSelection = state => state.search.calculation || null;
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

export const getSourceOptions = createSelector(getSources, sources => {
  if (!sources) return [];
  return sources.map(d => ({
    name: d.name,
    label: d.label,
    value: String(d.value),
    source: d.source,
    sectors: d.sector
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
      const defaultSource = sources.find(s => s.name === 'CAIT');
      return defaultSource || sources[0];
    }

    return sources.find(category => category.name === selected);
  }
);

export const getCalculationSelected = createSelector(
  [getCalculationSelection],
  selected => {
    if (!selected) return options[0];
    return options.find(calculation => calculation.value === selected);
  }
);

export const getAllowedSectors = createSelector(
  [getSourceSelected, getSectors],
  (source, sectors) => {
    if (!source || !source.sectors || !sectors) return null;
    return sectors
      .filter(d => d.label !== 'Bunker Fuels')
      .filter(d => source.sectors.indexOf(d.value) > -1)
      .filter(d => isEmpty(d.aggregatedSectorIds))
      .filter(d => !d.parentId);
  }
);

// Filters selector
export const getFilterOptions = createSelector(
  [getData, getMeta, getAllowedSectors],
  (data, meta, sectorsAllowed) => {
    if (isEmpty(sectorsAllowed) || isEmpty(data) || isEmpty(meta)) return [];
    return sectorsAllowed;
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
    return getGhgEmissionDefaults(sourceSelected, meta);
  }
);

// Map the data from the API
export const filterData = createSelector(
  [getData, getSourceSelected, getCalculationSelected, getFiltersSelected],
  (data, sourceSelected, calculation, filters) => {
    if (!data || !data.length) return [];
    const filteredData = sortEmissionsByValue(
      data.filter(d => filters.map(f => f.label).indexOf(d.sector.trim()) >= 0)
    );
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
