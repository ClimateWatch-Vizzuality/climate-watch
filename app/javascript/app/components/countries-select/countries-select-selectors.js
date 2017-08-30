import { createSelector } from 'reselect';
import { deburrUpper } from 'app/utils';
import sortBy from 'lodash/sortBy';

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

export default {
  getFilteredCountries,
  getFilteredCountriesWithPath
};
