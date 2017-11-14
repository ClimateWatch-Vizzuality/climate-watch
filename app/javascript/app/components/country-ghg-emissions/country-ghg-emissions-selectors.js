import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import groupBy from 'lodash/groupBy';
import intersection from 'lodash/intersection';
import isArray from 'lodash/isArray';
import orderBy from 'lodash/orderBy';
import { CALCULATION_OPTIONS } from 'app/data/constants';

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
    unit: 'CO<sub>2</sub>e',
    format: 'number'
  }
};

const INCLUDED_SECTORS = {
  CAIT: [
    'Energy',
    'Industrial Processes',
    'Agriculture',
    'Waste',
    'Bunker Fuels'
  ],
  PIK: [
    'Energy',
    'Agriculture',
    'Waste',
    'Solvent sector',
    'Industrial process',
    'Other'
  ],
  UNFCCC: [
    'Energy',
    'Industrial Processes',
    'Solvent and Other Product Use',
    'Agriculture',
    'Waste',
    'Other'
  ]
};

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
const getFilterSelection = state => state.search.filter || null;

// data for the graph
const getData = state => state.data || [];

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
    if (!selected) return sources[0];
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
  [getSourceSelected, getMeta],
  (sourceSelected, meta) => {
    if (!sourceSelected || !meta) return null;
    const defaults = {};
    switch (sourceSelected.label) {
      case 'CAIT':
        defaults.sector = meta.sector.find(
          s => s.label === 'Total excluding LUCF'
        ).value;
        defaults.gas = meta.gas.find(g => g.label === 'All GHG').value;
        break;
      case 'PIK':
        defaults.sector = meta.sector.find(
          s => s.label === 'Total excluding LUCF'
        ).value;
        defaults.gas = meta.gas.find(g => g.label === 'All GHG').value;
        break;
      case 'UNFCCC':
        defaults.sector = meta.sector
          .filter(
            s =>
              s.label === 'Total GHG emissions without LULUCF' ||
              s.label === 'Total GHG emissions excluding LULUCF/LUCF'
          )
          .map(d => d.value)
          .toString();
        defaults.gas = meta.gas.find(g => g.label === 'Aggregate GHGs').value;
        break;
      default:
        return null;
    }
    return defaults;
  }
);

// Map the data from the API
export const filterData = createSelector(
  [getData, getSourceSelected],
  (data, sourceSelected) => {
    if (!data || !data.length) return [];
    return sortEmissionsByValue(
      data.filter(
        d =>
          INCLUDED_SECTORS[sourceSelected.label].indexOf(d.sector.trim()) >= 0
      )
    );
  }
);

const calculatedRatio = (selected, calculationData, x) => {
  if (!calculationData) return 1;
  if (selected === CALCULATION_OPTIONS.PER_GDP.value) {
    // GDP is in dollars and we want to display it in million dollars
    return calculationData[x][0].gdp / DATA_SCALE;
  }
  if (selected === CALCULATION_OPTIONS.PER_CAPITA.value) {
    return calculationData[x][0].population;
  }
  return 1;
};

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
              y: yValue,
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
    return orderBy(qParsed, 'x', 'desc');
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
    const tooltip = getTooltipConfig(yColumnsChecked);
    let unit = AXES_CONFIG.yLeft.unit;
    if (calculationSelected.value === CALCULATION_OPTIONS.PER_GDP.value) {
      unit = `${unit}/ million $ GDP`;
    } else if (
      calculationSelected.value === CALCULATION_OPTIONS.PER_CAPITA.value
    ) {
      unit = `${unit} per capita`;
    }
    const axes = {
      ...AXES_CONFIG,
      yLeft: {
        ...AXES_CONFIG.yLeft,
        unit
      }
    };
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

export default {
  getSourceOptions,
  getSourceSelected,
  getFilterOptions,
  getFiltersSelected,
  getCalculationData
};
