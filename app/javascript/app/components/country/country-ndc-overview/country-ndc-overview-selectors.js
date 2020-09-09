import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import qs from 'query-string';

const getIso = (state, { iso }) => iso || null;
const getDataDocuments = state => state.countriesDocuments.data || null;

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

export const getSelectedDocument = createSelector(
  [getCountryDocuments, getSearch],
  (countryDocuments, search) => {
    if (isEmpty(countryDocuments)) return null;
    // Intended submission documents don't have submission date
    const ndcDocuments = countryDocuments.filter(
      d => d.is_ndc && d.submission_date
    );
    const lastDocument = ndcDocuments[ndcDocuments.length - 1];
    if (!search || !search.document) return lastDocument;
    return (
      countryDocuments.find(document => document.slug === search.document) ||
      lastDocument
    );
  }
);

export default {
  getValuesGrouped
};
