import { createSelector } from 'reselect';
import worldPaths from 'app/data/world-50m-paths';
import { PATH_LAYERS } from 'app/data/constants';

const getResultsData = state => state.data.data || [];
const getLoading = state => state.data.loading || null;
const getDocument = state => state.search.document || null;

export const getCountriesIncluded = createSelector(
  [getResultsData, getDocument],
  (results, documents) => {
    if (!results || !results.length) return [];
    const resultsFiltered = documents
      ? results.filter(result => result.document_type === documents)
      : results;
    return resultsFiltered.map(result => result.location.iso_code3);
  }
);

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
  [getCountriesIncluded, getLoading],
  (countriesIncluded, loading) => {
    const paths = [];
    worldPaths.forEach(path => {
      if (path.properties.layer !== PATH_LAYERS.ISLANDS) {
        const iso = path.properties && path.properties.id;
        const isCountryIncluded = countriesIncluded.includes(iso);
        paths.push({
          ...path,
          style:
            isCountryIncluded && !loading ? activeCountryStyle : countryStyle
        });
      }
    });
    return paths;
  }
);

export default {
  getCountriesIncluded,
  getPathsWithStyles
};
