import { createSelector } from 'reselect';
import { scaleLinear } from 'd3-scale';
import isEmpty from 'lodash/isEmpty';

import worldPaths from 'app/data/world-50m-paths';

const getCountries = state => state.countries;
const getIso = state => state.iso;
const getData = state => state.data;
const getYear = state => state.search.year || false;
const getSources = state => state.meta.data_source || [];
const getSourceSelection = state => state.search.source || false;

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
let colorScale = null;
function setScale(ranges) {
  colorScale = scaleLinear()
    .domain(ranges)
    .range(['#fffffb', '#163449']);
}

function getRanges(min, max) {
  // TODO calculate with buckets length
  return [min, max];
}

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
    if (!data || isEmpty(data)) return {};
    const dataParsed = {};
    let max = 0;
    let min = 9999999999;
    data.forEach(d => {
      const item = d.emissions.find(e => e.year === year);
      if (item.value) {
        if (item.value > max) max = item.value;
        if (item.value < min) min = item.value;
      }
      dataParsed[d.iso_code3] = item.value;
    });
    return {
      min,
      max,
      values: dataParsed
    };
  }
);

export const getPathsWithStyles = createSelector([getDataParsed], data => {
  const { values, min, max } = data;
  if (min && max) setScale(getRanges(data.min, data.max));

  return worldPaths.map(path => {
    let color = '#8f8fa1';
    if (values && values[path.id]) {
      color = colorScale(values[path.id]);
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

export const getLegendData = () => ({
  title: 'GHG Emissions per capita',
  buckets
});

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
