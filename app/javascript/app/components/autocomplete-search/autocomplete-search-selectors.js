import { createSelector } from 'reselect';
import { deburrUpper } from 'app/utils';

const filterCountries = (countries, queryUpper) => {
  if (!queryUpper) return countries;
  return countries.filter(country =>
    deburrUpper(country.wri_standard_name).includes(queryUpper)
  );
};

const getCountries = state => state.countries;
const getQuery = state => state.query;
export const getQueryUpper = state => deburrUpper(state.query);

const addCountriesPath = (countries, query) => {
  const ndcResults = countries.reduce((ndcResult, country) => {
    ndcResult.push({
      value: `${country.iso_code3}`,
      label: `${country.wri_standard_name} Country Page`,
      path: `/countries/${country.iso_code3}`
    });
    ndcResult.push({
      value: `${country.iso_code3}-overview`,
      label: `${country.wri_standard_name} NDC - Overview`,
      path: `/ndcs/country/${country.iso_code3}`
    });
    return ndcResult;
  }, []);

  ndcResults.push({
    value: query,
    label: `Search "${query}" in the content of all NDC's`,
    path: `/ndc-search?searchBy=query&query=${encodeURIComponent(query)}`
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
