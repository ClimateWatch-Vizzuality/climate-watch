import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import qs from 'query-string';

const getIso = (state, { iso }) => iso || null;
const getDataDocuments = state =>
  (state && state.ndcsDocumentsMeta.data) || null;
const getOverviewData = state =>
  state.ndcContentOverview.data && state.ndcContentOverview.data.locations;
const getCountryOverviewData = createSelector(
  [getOverviewData, getIso],
  (data, iso) => (data && data[iso]) || null
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
  [getDataDocuments, getIso],
  (documents, iso) => {
    if (isEmpty(documents) || !iso || !documents[iso]) return null;
    return documents[iso];
  }
);

const documentValue = document =>
  `${document.document_type}-${document.language}`;

export const getSelectedDocument = createSelector(
  [getCountryDocuments, getSearch],
  (countryDocuments, search) => {
    if (isEmpty(countryDocuments)) return null;
    const lastDocument = countryDocuments[countryDocuments.length - 1];
    if (!search || !search.document) return lastDocument;
    return (
      countryDocuments.find(
        document => documentValue(document) === search.document
      ) || lastDocument
    );
  }
);

export default {
  getValuesGrouped
};
