import { createSelector } from 'reselect';

const getResultsData = state => state.results;

export const getSearchResults = createSelector(getResultsData, results =>
  results.sort((a, b) => a.matches.length < b.matches.length)
);

export default {
  getSearchResults
};
