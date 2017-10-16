import { createSelector } from 'reselect';
import worldPaths from 'app/data/world-50m-paths';

const getResultsData = state => state.data || [];

export const getCountriesIncluded = createSelector(getResultsData, results => {
  if (!results || !results.length) return [];
  return results.map(result => result.location.iso_code3);
});

const countryStyle = {
  default: {
    fill: '#b1b1c1',
    fillOpacity: 0.3,
    stroke: '#ffffff',
    strokeWidth: 0.3,
    outline: 'none'
  },
  hover: {
    fill: '#25597c',
    stroke: '#ffffff',
    strokeWidth: 0.3,
    outline: 'none'
  },
  pressed: {
    fill: '#b1b1c1',
    stroke: '#ffffff',
    strokeWidth: 0.3,
    outline: 'none'
  }
};

const activeCountryStyle = {
  ...countryStyle,
  default: {
    ...countryStyle.default,
    fill: '#25597c',
    fillOpacity: 0.9
  },
  hover: {
    ...countryStyle.hover,
    fill: '#25597c',
    fillOpacity: 1
  }
};

export const getPathsWithStyles = createSelector(
  [getCountriesIncluded],
  countriesIncluded =>
    worldPaths.map(path => {
      const isCountryIncluded = countriesIncluded.includes(path.id);
      return {
        ...path,
        style: isCountryIncluded ? activeCountryStyle : countryStyle
      };
    })
);

export default {
  getCountriesIncluded,
  getPathsWithStyles
};
