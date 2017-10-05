import { createSelector } from 'reselect';
import { scaleLinear } from 'd3-scale';

import worldPaths from 'app/data/world-50m-paths';

const getCountries = state => state.countries;
const getSelected = state => state.selected;
const getData = state => state.data;

let colorScale = null;
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
function setScale({ min, max }) {
  colorScale = scaleLinear()
    .domain([min, max])
    .range(buckets);
}

const countryStyles = {
  default: {
    fill: '#ECEFF1',
    fillOpacity: 0.3,
    stroke: '#396d90',
    strokeWidth: 0.7,
    outline: 'none'
  },
  hover: {
    fill: '#ffc735',
    stroke: '#396d90',
    strokeWidth: 0.7,
    outline: 'none'
  },
  pressed: {
    fill: '#ffc735',
    stroke: '#396d90',
    strokeWidth: 1,
    outline: 'none'
  }
};

export const getPathsWithStyles = createSelector(getData, data => {
  setScale({ min: 0, max: 10, buckets });
  return worldPaths.map(path => {
    const style = {
      ...countryStyles,
      default: {
        ...countryStyles.default,
        fill: colorScale(data[path.id])
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
  [getCountries, getSelected],
  (countries, iso) => {
    const country = countries.find(c => c.iso_code3 === iso);
    if (!country || !country.centroid) return [0, 20];
    return country.centroid.coordinates;
  }
);

export default {
  getPathsWithStyles
};
