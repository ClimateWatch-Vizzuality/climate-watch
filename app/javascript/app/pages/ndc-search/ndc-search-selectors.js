import { createSelector } from 'reselect';

const getResultsData = state => state.data;

export const getSearchResults = createSelector(
  getResultsData,
  results => results
);

export default {
  getSearchResults
};
