import { createSelector } from 'reselect';
import { deburrUpper } from 'app/utils';

const filterCountries = (countries, queryUpper) => {
  if (!queryUpper) return countries;
  return countries.filter(country =>
    deburrUpper(country.label).includes(queryUpper)
  );
};

const addCountriesPath = countries =>
  countries.map(country => ({
    value: country.value,
    label: country.label,
    path: `countries/${country.value}`
  }));

export const getFilteredCountries = createSelector(
  [state => state.countries, state => deburrUpper(state.query)],
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
