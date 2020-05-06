import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import qs from 'query-string';

const getIso = state => state.iso || null;
const getDocuments = state => {
  if (!state.countriesDocuments || !state.countriesDocuments.data) {
    return null;
  }
  return state.countriesDocuments.data || null;
};

const getCountries = state => {
  if (!state.countries || !state.countries.data) {
    return null;
  }
  return sortBy(state.countries.data, 'wri_standard_name');
};

const getCountryByIso = (countries, iso) =>
  countries.find(country => country.iso_code3 === iso);

const getSearch = state => {
  const { search } = state.location;
  if (!search) return null;
  const parsedSearch = qs.parse(state.location.search);
  return parsedSearch || null;
};

export const getCountry = createSelector(
  [getCountries, getIso],
  getCountryByIso
);

export const getAnchorLinks = createSelector(
  [state => state.route.routes || [], state => state.iso, getSearch],
  (routes, iso, search) => {
    if (!search) return null;
    const searchParams = { search: search.search, document: search.document };
    return routes
      .filter(route => route.anchor)
      .map(route => ({
        label: route.label,
        path: `/ndcs/country/${iso}/${route.param ? route.param : ''}`,
        search: `?${qs.stringify(searchParams)}`
      }));
  }
);

const getCountryDocuments = createSelector(
  [getDocuments, getIso],
  (documents, iso) => {
    if (isEmpty(documents) || !iso || !documents[iso]) return null;
    return documents[iso];
  }
);

const documentOption = document => ({
  label: document.long_name,
  value: document.slug
});

export const getDocumentsOptions = createSelector(
  [getCountryDocuments],
  documents => {
    if (isEmpty(documents)) return null;
    return documents
      .filter(d => d.is_ndc)
      .map(document => documentOption(document));
  }
);

export const getDocumentSelected = createSelector(
  [getCountryDocuments, getSearch],
  (documents, search) => {
    if (isEmpty(documents)) return null;
    if (!search || !search.document) return documentOption(documents[0]);
    const selectedDocument = documents.find(d => d.slug === search.document);
    return selectedDocument ? documentOption(selectedDocument) : null;
  }
);

export const addUrlToCountries = createSelector(
  [getCountries, getCountry],
  (countries, country) => {
    if (!countries) return null;
    return countries
      .filter(c => c.iso_code3 !== country.iso_code3)
      .map(c => ({
        value: c.iso_code3,
        label: c.wri_standard_name
      }));
  }
);
