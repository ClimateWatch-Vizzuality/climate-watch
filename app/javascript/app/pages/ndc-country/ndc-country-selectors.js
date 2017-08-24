import { createSelector } from 'reselect';

const getCountries = state => state.countries;
const getIso = state => state.iso;

const getCountryByIso = (countries, iso) =>
  countries.find(country => country.value === iso);

export const getCountry = createSelector(
  [getCountries, getIso],
  getCountryByIso
);

export default {
  getCountry
};
