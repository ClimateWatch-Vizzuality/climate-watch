import { createSelector } from 'reselect';

const getPreviousComparisonIndicators = state =>
  state.ndcsPreviousComparison && state.ndcsPreviousComparison.data;

const getIso = state => state.iso || null;

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
