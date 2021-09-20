import { createSelector } from 'reselect';
import { getDocumentsColumns } from 'utils/country-documents';

const getPreviousComparisonIndicators = state =>
  state.ndcsPreviousComparison && state.ndcsPreviousComparison.data;

const getCountriesDocuments = state => state.countriesDocuments.data || null;

const getIso = state => state.iso || null;
const getCountries = state => (state.countries && state.countries.data) || null;

const getCountry = createSelector([getCountries, getIso], (countries, iso) => {
  if (!countries || !iso) return null;
  return countries.find(country => country.iso_code3 === iso);
});

export const getCountryName = createSelector(
  [getCountry],
  country => (country && country.wri_standard_name) || null
);

export const getPreviousComparisonCountryValues = createSelector(
  [getPreviousComparisonIndicators, getIso],
  (previousComparisonIndicators, iso) => {
    if (!previousComparisonIndicators) return null;
    return previousComparisonIndicators.map(indicator => [
      indicator.name,
      indicator.locations[iso].value
    ]);
  }
);

// nz_status
// const positiveLabels = [
//   'Net-zero Target in Law',
//   'Net-zero Target in Policy Document',
//   'Net-zero Target in Political Pledge'
// ];

// MAP: 'ndce_status_2020'
// export const LABEL_SLUGS = {
//   SUBMITTED_2020: 'submitted_2020',
// };

export const DOCUMENT_COLUMNS_SLUGS = {
  NDC: 'first_ndc',
  'NET ZERO': 'nz_status',
  '2020 NDC': 'ndce_status_2020',
  'Long Term Support': 'lts'
};

export const getCountriesDocumentsValues = createSelector(
  [getCountriesDocuments, getIso],
  (countriesDocuments, iso) => {
    if (!countriesDocuments || !iso || !countriesDocuments[iso]) return null;
    const documentColumns = getDocumentsColumns(
      countriesDocuments[iso],
      DOCUMENT_COLUMNS_SLUGS
    );
    return Object.entries(documentColumns).map(entry => entry);
  }
);
