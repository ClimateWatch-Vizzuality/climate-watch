import { createSelector } from 'reselect';
import { deburrUpper } from 'app/utils';

const filterCountries = (countries, queryUpper) => {
  if (!queryUpper) return countries;
  return countries.filter(country =>
    deburrUpper(country.label).includes(queryUpper)
  );
};

const getCountries = state => state.countries;
const getQuery = state => state.query;
export const getQueryUpper = state => deburrUpper(state.query);

const addCountriesPath = (countries, query) => {
  const ndcResults = countries.reduce((ndcResult, country) => {
    ndcResult.push({
      value: `${country.value}-overview`,
      label: `${country.label} NDC - Overview`,
      path: `ndcs/${country.value}`
    });
    ndcResult.push({
      value: `${country.value}-full`,
      label: `${country.label} NDC - Full Text`,
      path: `ndcs/${country.value}`
    });
    return ndcResult;
  }, []);

  ndcResults.push({
    value: 'search',
    label: `Search "${query}" in the content of all NDC's`,
    path: `ndcs?search=${query}`
  });
  return ndcResults;
};

export const getFilteredCountries = createSelector(
  [getCountries, getQueryUpper],
  filterCountries
);

export const getFilteredCountriesWithPath = createSelector(
  [getFilteredCountries, getQuery],
  addCountriesPath
);

export default {
  getFilteredCountries,
  getFilteredCountriesWithPath
};
