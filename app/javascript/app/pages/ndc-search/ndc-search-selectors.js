import { createSelector } from 'reselect';

const getResultsData = state => state.results;

export const getSearchResults = createSelector(
  getResultsData,
  results => results
);

export default {
  getSearchResults
};
