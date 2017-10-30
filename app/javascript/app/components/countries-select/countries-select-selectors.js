import { createSelector } from 'reselect';
import { deburrUpper, isCountryDisabled } from 'app/utils';
import sortBy from 'lodash/sortBy';
import worldPaths from 'app/data/world-50m-paths';

const getCountries = state => sortBy(state.countries, 'wri_standard_name');
export const getPreSelect = state => state.preSelect;
export const getFilterUpper = state => deburrUpper(state.query);

const filterCountries = (countries, queryUpper) => {
  if (!queryUpper) return countries;
  return countries.filter(country =>
    deburrUpper(country.wri_standard_name).includes(queryUpper)
  );
};

const addCountriesPath = countries =>
  countries.map(country => ({
    value: country.iso_code3,
    label: country.wri_standard_name,
    path: `/countries/${country.iso_code3}`
  }));

export const getFilteredCountries = createSelector(
  [getCountries, getFilterUpper],
  filterCountries
);

export const getFilteredCountriesWithPath = createSelector(
  getFilteredCountries,
  addCountriesPath
);

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

const activeCountryStyles = {
  ...countryStyles,
  default: {
    ...countryStyles.defaut,
    fill: '#ffc735',
    fillOpacity: 1
  }
};

const semiActiveCountryStyles = {
  ...activeCountryStyles,
  default: {
    ...activeCountryStyles.default,
    fill: '#ecde85'
  }
};

export const getPathsWithStyles = createSelector(
  [getFilterUpper, getPreSelect],
  (query, preSelect) =>
    worldPaths.map(path => {
      if (!path.properties || isCountryDisabled(path.properties.id)) {
        return {
          ...path,
          style: countryStyles
        };
      }

      const nameUpper = deburrUpper(path.properties.name);
      const isEqual = path.properties.id === preSelect || nameUpper === query;

      if (isEqual) {
        return {
          ...path,
          style: activeCountryStyles
        };
      }

      const isInFilter = query ? nameUpper.includes(query) : false;
      const style = isInFilter ? semiActiveCountryStyles : countryStyles;
      return {
        ...path,
        style
      };
    })
);

export default {
  getFilteredCountries,
  getFilteredCountriesWithPath,
  getPathsWithStyles
};
