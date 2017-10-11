import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';

const getResultsData = state => state.results || null;

export const groupSearchResults = createSelector(getResultsData, results => {
  if (!results) return null;
  return groupBy(results.map(d => ({
    location: d.location.iso_code3,
    label: d.location.name,
    documentType: d.document_type,
    language: d.language,
    matches: d.matches
  })), 'location');
});

export const getSearchResults = createSelector(groupSearchResults,
  results => {
    if (!results) return [];
    const mappedResults = Object.keys(results).map(d => ({
      label: results[d][0].label,
      location: results[d][0].location,
      results: results[d]
    }));
    return mappedResults.sort((a, b) => a.results[0].matches.length < b.results[0].matches.length);
  }
);


export default {
  getSearchResults
};
