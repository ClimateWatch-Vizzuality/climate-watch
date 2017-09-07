import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';

const getCountries = state => state.data;

export const getCountriesOptions = createSelector([getCountries], countries => {
  const countriesOptions = countries.map(country => ({
    label: country.wri_standard_name,
    value: country.iso_code3
  }));
  return sortBy(countriesOptions, ['label']);
});

export default {
  getCountriesOptions
};
