import { createSelector } from 'reselect';
import { scalePow } from 'd3-scale';
import isEmpty from 'lodash/isEmpty';

import worldPaths from 'app/data/world-50m-paths';

const getCountries = state => state.countries;
const getIso = state => state.iso;
const getData = state => state.data;
const isLoaded = state => state.loaded;
const isLoading = state => state.loading;
const getSources = state => state.meta.data_source || null;
const getSourceSelection = state => state.search.source || false;
const getYear = state => parseInt(state.year, 10);

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
  return buckets.map((el, i) => max / 100 * steps[i]); // eslint-disable-line
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

export const getDataParsed = createSelector(
  [getData, getYearSelected],
  (data, year) => {
    if (!data || isEmpty(data)) return null;
    const dataParsed = {};
    let max = 0;
    let min = 9999999999;
    data.forEach(d => {
      const item = d.emissions.find(e => e.year === year);
      if (item && item.value && !EXCLUDED_INDICATORS.includes(item.iso_code3)) {
        if (item.value > max) max = item.value;
        if (item.value < min) min = item.value;
        dataParsed[d.iso_code3] = item.value;
      } else {
        dataParsed[d.iso_code3] = null;
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

// get selector defaults
export const getDefaultValues = createSelector(
  [getSources, getSourceSelected],
  (sources, sourceSelected) => {
    if (!sources || !sources.length || !sourceSelected) return null;
    const sourceData = sources.find(d => d.value === sourceSelected.value);
    return {
      sector: sourceData.sector[0],
      gas: sourceData.gas[0],
      source: sources[0].value
    };
  }
);

export const getPathsWithStyles = createSelector([getDataParsed], data => {
  if (!data) return worldPaths;

  const { min, max } = data;

  if (min && max) setScale(getRanges(data.min, data.max));
  return worldPaths.map(path => {
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

    return {
      ...path,
      style
    };
  });
});

export const getLegendData = createSelector(getYearSelected, year => ({
  title: `GHG Emissions per capita in ${year}`,
  buckets
}));

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
