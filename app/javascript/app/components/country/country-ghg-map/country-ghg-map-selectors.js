import { createSelector } from 'reselect';
import { scalePow } from 'd3-scale';
import isEmpty from 'lodash/isEmpty';
import { CALCULATION_OPTIONS } from 'app/data/constants';
import { shouldShowPath } from 'utils/map';
import groupBy from 'lodash/groupBy';

import worldPaths from 'app/data/world-50m-paths';
import { getGhgEmissionDefaults } from 'utils/ghg-emissions';

const calculationKeys = Object.keys(CALCULATION_OPTIONS);
const options = calculationKeys.map(
  calculationKey => CALCULATION_OPTIONS[calculationKey]
);
const getCountries = state => state.countries;
const getIso = state => state.iso;
const getData = state => state.data;
const isLoaded = state => state.loaded;
const isLoading = state => state.loading;
const getSources = state => (state.meta && state.meta.data_source) || null;
const getSourceSelection = state => state.search.source || false;
const getYear = state => parseInt(state.year, 10);
const getCalculationSelection = state => state.search.calculation || null;
const getCalculationData = state => state.calculationData || null;
const getMeta = state => state.meta || {};
const getZoom = state => state.zoom || null;

export const getCalculationSelected = createSelector(
  [getCalculationSelection],
  selected => {
    if (!selected) return options[0];
    return options.find(calculation => calculation.value === selected);
  }
);

const EXCLUDED_INDICATORS = ['WORLD'];

const buckets = [
  '#fffffb',
  '#ffffd5',
  '#f4f6c8',
  '#a6d8b3',
  '#6cc1a7',
  '#439c9a',
  '#2b6c85',
  '#1b4a75',
  '#163449'
];

const steps = [0, 0.4, 0.8, 2, 4, 8, 16, 32, 64];
let colorScale = null;
function setScale(ranges) {
  colorScale = scalePow()
    .domain(ranges)
    .range(buckets);
}

function getRanges(min, max) {
  return buckets.map((el, i) => (max / 100) * steps[i]); // eslint-disable-line
}

export const getSourceOptions = createSelector(getSources, sources => {
  if (!sources || !sources.length) return null;
  return sources.map(d => ({
    label: d.label,
    value: d.value
  }));
});

export const getSourceSelected = createSelector(
  [getSourceOptions, getSourceSelection],
  (sources, selected) => {
    if (!sources || !sources.length) return null;
    if (!selected) return sources[0];
    return sources.find(category => category.value === parseInt(selected, 10));
  }
);

export const getYearSelected = createSelector(
  [getData, getYear],
  (data, year) => {
    if (!data || !data.length) return null;
    let selectedYear = year;
    if (!selectedYear) {
      selectedYear = data[0].emissions[data[0].emissions.length - 1].year;
    }
    return selectedYear;
  }
);

const calculatedRatio = (selected, calculationData, x) => {
  if (isEmpty(calculationData)) return 1;
  if (selected === CALCULATION_OPTIONS.PER_GDP.value) {
    return calculationData[x][0].gdp;
  }
  if (selected === CALCULATION_OPTIONS.PER_CAPITA.value) {
    return calculationData[x][0].population;
  }
  return 1;
};

// If we dont have calculationData the selected calculation is Absolute value so it should show that data
const countryHasCalculationDataForYear = (calculationData, data, year) =>
  isEmpty(calculationData) || (data && data[year]);

export const getDataParsed = createSelector(
  [getData, getCalculationData, getYearSelected, getCalculationSelected],
  (data, calculationData, year, calculationSelected) => {
    if (!data || isEmpty(data) || !calculationSelected) {
      return null;
    }
    const dataParsed = {};
    let max = 0;
    let min = 9999999999;

    data.forEach(d => {
      const iso = d.iso_code3;
      const calculationDataGroupedByYear =
        calculationData &&
        calculationData[iso] &&
        groupBy(calculationData[iso], 'year');
      const item = d.emissions.find(e => e.year === year);
      if (
        item &&
        item.value &&
        !EXCLUDED_INDICATORS.includes(iso) &&
        countryHasCalculationDataForYear(
          calculationData,
          calculationDataGroupedByYear,
          item.year
        )
      ) {
        const calculationRatio = calculatedRatio(
          calculationSelected.value,
          calculationDataGroupedByYear,
          item.year
        );

        const value = item.value / calculationRatio;
        if (value > max) max = value;
        if (value < min) min = value;
        dataParsed[iso] = value;
      } else {
        dataParsed[iso] = null;
      }
    });
    return {
      min,
      max,
      year,
      values: dataParsed
    };
  }
);

export const getSelectorDefaults = createSelector(
  [getSourceSelected, getMeta],
  (sourceSelected, meta) => {
    if (!sourceSelected || !meta) return null;
    return getGhgEmissionDefaults(sourceSelected, meta);
  }
);

// get selector defaults
export const getDefaultValues = createSelector(
  [getSources, getSourceSelected, getMeta, getSelectorDefaults],
  (sources, sourceSelected, meta, selectorDefaults) => {
    if (!sourceSelected || !meta) return null;
    return {
      ...selectorDefaults,
      source: sources[0].value
    };
  }
);

export const getPathsWithStyles = createSelector(
  [getDataParsed, getZoom],
  (data, zoom) => {
    if (!data) return worldPaths;
    const { min, max } = data;
    if (min && max) setScale(getRanges(min, max));

    const paths = [];
    worldPaths.forEach(path => {
      if (shouldShowPath(path, zoom)) {
        let color = '#E5E5EB'; // default color
        const iso = path.properties && path.properties.id;
        if (data && data.values && data.values[iso]) {
          color = colorScale(data.values[iso]);
        }
        const style = {
          default: {
            fill: color,
            stroke: '#000',
            strokeWidth: 0.1,
            outline: 'none'
          },
          hover: {
            fill: color,
            stroke: '#000',
            strokeWidth: 0.1,
            outline: 'none'
          },
          pressed: {
            fill: color,
            stroke: '#000',
            strokeWidth: 0.5,
            outline: 'none'
          }
        };

        paths.push({
          ...path,
          style
        });
      }
    });
    return paths;
  }
);

export const getLegendData = createSelector(
  [getCalculationSelected, getYearSelected],
  (calculation, year) => {
    let calculationText = '';
    if (
      calculation &&
      calculation.value &&
      calculation.value !== CALCULATION_OPTIONS.ABSOLUTE_VALUE.value
    ) {
      calculationText = `${CALCULATION_OPTIONS[calculation.value].label} `;
    }

    return {
      title: `GHG Emissions ${calculationText}in ${year}`,
      buckets
    };
  }
);

export const getMapReady = createSelector(
  [isLoaded, isLoading],
  (loaded, loading) => loaded && !loading
);

export const getMapCenter = createSelector(
  [getCountries, getIso],
  (countries, iso) => {
    const country = countries.find(c => c.iso_code3 === iso);
    if (!country || !country.centroid) return [0, 20];
    return country.centroid.coordinates;
  }
);

export default {
  getPathsWithStyles,
  getMapCenter
};
