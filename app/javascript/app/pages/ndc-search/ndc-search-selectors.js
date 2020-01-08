import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import toUpper from 'lodash/toUpper';
import uniqBy from 'lodash/uniqBy';
import isEmpty from 'lodash/isEmpty';

const getResultsData = state => state.results || null;
const getDocQuery = state => state.search.document || null;

export const getDocumentOptions = createSelector([getResultsData], results => {
  if (!results) return null;
  const groupedByDoc = groupBy(results, 'document_type');
  return Object.keys(groupedByDoc).map(d => ({
    label: toUpper(groupedByDoc[d][0].document_type),
    value: d
  }));
});

const getDocumentSelected = createSelector(
  [getDocumentOptions, getDocQuery],
  (docs, docQuery) => {
    if (!docs || !docQuery || docQuery === 'all') return null;
    return docs.find(d => d.value === docQuery);
  }
);

export const filterSearchResults = createSelector(
  [getResultsData, getDocumentSelected, getDocQuery],
  (results, docSelected, docQuery) => {
    if (!results) return null;
    if (docQuery === 'all') return results;
    if (!docSelected) return null;
    return uniqBy(
      results.filter(d => d.document_type === docSelected.value),
      'location.iso_code3'
    );
  }
);

export const getSearchResultsSorted = createSelector(
  filterSearchResults,
  results => {
    if (!results || !results.length) return null;
    return results.sort((a, b) => {
      if (a.matches.length > b.matches.length) return -1;
      if (a.matches.length < b.matches.length) return 1;
      if (a.location.name > b.location.name) return 1;
      if (a.location.name < b.location.name) return -1;
      return 0;
    });
  }
);

export function getMessageText(search) {
  if (isEmpty(search)) {
    return 'Please select an option from the available filters or type a keyword to search through the NDCs.';
  }
  return 'No results for this search.';
}

export default {
  getSearchResultsSorted,
  getMessageText
};
