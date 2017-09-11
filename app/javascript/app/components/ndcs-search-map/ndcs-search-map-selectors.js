import { createSelector } from 'reselect';

const getResultsData = state => state.data || [];

export const getCountriesIncluded = createSelector(getResultsData, results => {
  if (!results || !results.length) return [];
  return results.map(result => result.iso_code3);
});

export default {
  getCountriesIncluded
};
