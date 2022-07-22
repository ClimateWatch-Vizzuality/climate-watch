import { createSelector } from 'reselect';

const getPreviousComparisonIndicators = state =>
  state.ndcsPreviousComparison && state.ndcsPreviousComparison.data;

const getIso = state => state.iso || null;
const getCountries = state => state.countries.data || null;

const getCountry = createSelector([getCountries, getIso], (countries, iso) => {
  if (!countries || !iso) return null;
  return countries.find(country => country.iso_code3 === iso);
});

export const getCountryName = createSelector(
  [getCountry],
  country => (country && country.wri_standard_name) || null
);

export const getPreviousComparisonCountryValues = createSelector(
  [getPreviousComparisonIndicators, getIso],
  (previousComparisonIndicators, iso) => {
    if (!previousComparisonIndicators) return null;
    return previousComparisonIndicators.map(indicator => [
      indicator.name,
      indicator.locations[iso].value
    ]);
  }
);
