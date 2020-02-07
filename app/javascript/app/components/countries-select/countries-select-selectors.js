import { createSelector } from 'reselect';
import { deburrUpper, isCountryIncluded } from 'app/utils';
import sortBy from 'lodash/sortBy';
import worldPaths from 'app/data/world-50m-paths';
import { shouldShowPath } from 'utils/map';

const COUNTRY_PLATFORMS_ISOS = ['ZAF', 'IDN', 'IND'];

const getCountries = state => sortBy(state.countries, 'wri_standard_name');
export const getPreSelect = state => state.preSelect;
export const getFilter = state => state.query;

const filterCountries = (countries, query) => {
  if (!query) return countries;
  return countries.filter(country =>
    deburrUpper(country.wri_standard_name).includes(deburrUpper(query))
  );
};

const addCountriesPath = countries =>
  countries.map(country => ({
    value: country.iso_code3,
    label: country.wri_standard_name,
    path: `/countries/${country.iso_code3}`
  }));

export const getFilteredCountries = createSelector(
  [getCountries, getFilter],
  filterCountries
);

export const getISOCountries = createSelector([getCountries], countries =>
  countries.map(country => country.iso_code3)
);

export const getFilteredCountriesWithPath = createSelector(
  getFilteredCountries,
  addCountriesPath
);

const countryStyles = {
  default: {
    fill: '#e5e5eb',
    fillOpacity: 1,
    stroke: '#ffffff',
    strokeWidth: 0.7,
    outline: 'none'
  },
  hover: {
    fill: '#ffc735',
    stroke: '#ffffff',
    strokeWidth: 0.7,
    outline: 'none'
  },
  pressed: {
    fill: '#ffc735',
    stroke: '#ffffff',
    strokeWidth: 1,
    outline: 'none'
  }
};

const countryPlatformsStyles = {
  default: {
    fill: '#B1B1C0',
    fillOpacity: 1,
    stroke: '#ffffff',
    strokeWidth: 0.7,
    outline: 'none'
  }
};

const activeCountryStyles = {
  ...countryStyles,
  default: {
    ...countryStyles.default,
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
  [getFilter, getPreSelect, getISOCountries],
  (query, preSelect, isoCountries) => {
    const paths = [];
    worldPaths.forEach(path => {
      if (shouldShowPath(path)) {
        const iso = path.properties && path.properties.id;
        if (!iso || (isoCountries && !isCountryIncluded(isoCountries, iso))) {
          return paths.push({
            ...path,
            style: countryStyles
          });
        }

        if (COUNTRY_PLATFORMS_ISOS.includes(iso)) {
          return paths.push({
            ...path,
            style: { ...countryStyles, ...countryPlatformsStyles }
          });
        }

        const name = path.properties.name;
        const isEqual = iso === preSelect || name === query;
        if (isEqual) {
          return paths.push({
            ...path,
            style: activeCountryStyles
          });
        }

        const isInFilter = query ? name.includes(query) : false;
        const style = isInFilter ? semiActiveCountryStyles : countryStyles;
        return paths.push({
          ...path,
          style
        });
      }
      return null;
    });

    // reorder map paths to show EU geometry if selected
    if (preSelect === 'EUU') {
      const EUPath = paths.find(p => p.properties.id === 'EUU');
      const EUUIndex = paths.indexOf(EUPath);
      paths.push(paths.splice(EUUIndex, 1)[0]);
    }
    return paths;
  }
);

export default {
  getFilteredCountries,
  getFilteredCountriesWithPath,
  getPathsWithStyles
};
