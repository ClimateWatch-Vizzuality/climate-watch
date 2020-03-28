import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import qs from 'query-string';

const getIso = (state, { iso }) => iso || null;
const getDocuments = state => (state && state.documents) || null;
const getOverviewData = state =>
  state.ndcContentOverview.data && state.ndcContentOverview.data.locations;
const getCountryOverviewData = createSelector(
  [getOverviewData, getIso],
  (data, iso) => (data && data[iso] && data[iso]) || null
);

const getSearch = (state, { location }) => {
  const { search } = location;
  if (!search) return null;
  const parsedSearch = qs.parse(search);
  return parsedSearch || null;
};

export const getSectors = createSelector(
  [getCountryOverviewData],
  data => (data && data.sectors) || null
);

export const getValuesGrouped = createSelector(
  getCountryOverviewData,
  overviewData => {
    const { values } = overviewData || {};
    if (!values || !values.length) return null;
    const groupedValues = groupBy(values, 'slug');
    Object.keys(groupedValues).forEach(key => {
      if (!groupedValues[key].length) groupedValues[key] = null;
    });
    return groupedValues;
  }
);

export const getCountryDocuments = createSelector(
  [getDocuments, getIso],
  (documents, iso) => {
    if (isEmpty(documents) || !iso || !documents[iso]) return null;
    return documents[iso];
  }
);

const documentValue = document =>
  `${document.document_type}(${document.language})`;

export const getSelectedDocument = createSelector(
  [getCountryDocuments, getSearch],
  (documents, search) => {
    if (isEmpty(documents)) return null;
    const lastDocument = documents[documents.length - 1];
    if (!search.document) return lastDocument;
    return (
      documents.find(document => documentValue(document) === search.document) ||
      lastDocument
    );
  }
);

export default {
  getValuesGrouped
};
