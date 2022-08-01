import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import isEmpty from 'lodash/isEmpty';
import qs from 'query-string';

const getIso = (state, { iso }) => iso || null;
const getDataDocuments = state => state.countriesDocuments.data || null;
const getCountries = state => state.countries.data || [];

const getOverviewData = state =>
  state.ndcContentOverview.data && state.ndcContentOverview.data.locations;

const getNdcsData = state => state.ndcs?.data?.indicators || null;

const getCountryOverviewData = createSelector(
  [getOverviewData, getIso],
  (data, iso) => (data && data[iso]) || null
);

const getReducersLoading = state =>
  state.countries.loading ||
  state.countriesDocuments.loading ||
  state.ndcContentOverview.loading;

// TODO: Improve solution. Currently the ndcs nedpoint is called several times so we only know if data is loaded checking some specific indicator
export const getLoading = createSelector(
  [getReducersLoading, getNdcsData],
  (loading, ndcsData) =>
    loading || !ndcsData || !ndcsData.some(i => i.slug === 'ghg_target')
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

export const getCountryNdcsData = createSelector(
  [getNdcsData, getIso],
  (ndcsData, iso) => {
    if (!ndcsData) return null;
    const dataKeys = [
      'ghg_target',
      'mitigation_contribution_type',
      'adaptation',
      'ndce_source',
      'lts_target',
      'lts_date',
      'lts_document',
      'nz_status',
      'nz_year',
      'nz_source'
    ];

    return dataKeys.reduce(
      (acc, dataKey) => ({
        ...acc,
        [dataKey]: ndcsData.find(({ slug }) => slug === dataKey)?.locations?.[
          iso
        ]?.value
      }),
      {}
    );
  }
);

export const getCountryDocuments = createSelector(
  [getDataDocuments, getIso],
  (documents, iso) => {
    if (isEmpty(documents) || !iso || !documents[iso]) return null;
    return documents[iso];
  }
);

export const getNdcsDocument = createSelector(
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

export const getLtsDocument = createSelector(
  [getCountryDocuments, getSearch],
  (countryDocuments, search) => {
    if (isEmpty(countryDocuments)) return null;
    // Intended submission documents don't have submission date
    const ndcDocuments = countryDocuments.filter(
      d => d.slug === 'lts' && d.submission_date
    );
    const lastDocument = ndcDocuments[ndcDocuments.length - 1];
    if (!search || !search.document) return lastDocument;
    return (
      countryDocuments.find(document => document.slug === search.document) ||
      lastDocument
    );
  }
);

export const getCountryName = createSelector(
  [getCountries, getIso],
  (countries, iso) =>
    (countries.find(({ iso_code3 }) => iso === iso_code3) || {})
      .wri_standard_name
);

export default {
  getValuesGrouped
};
