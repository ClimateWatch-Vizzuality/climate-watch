import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';

const getCountries = state => state.data;
const getIpData = state => state.ipData;

export const getCountriesOptions = createSelector([getCountries], countries => {
  const countriesOptions = countries.map(country => ({
    label: country.wri_standard_name,
    value: country.iso_code3
  }));
  return sortBy(countriesOptions, ['label']);
});

export const getCountryLocationData = createSelector([getIpData], ipData => ({
  iso: ipData.iso3 || '',
  country: ipData.country_name || ''
}));

export default {
  getCountriesOptions,
  getCountryLocationData
};
