import { createSelector } from 'reselect';

const getPreviousComparisonIndicators = state =>
  state.ndcsPreviousComparison && state.ndcsPreviousComparison.data;

const getCountriesDocuments = state => state.countriesDocuments.data || null;

const getIso = state => state && state.iso;

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
export const getCountriesDocumentsValues = createSelector(
  [getCountriesDocuments, getIso],
  (countriesDocuments, iso) => {
    if (!countriesDocuments || !iso || !countriesDocuments[iso]) return null;
    return null;
  }
);
