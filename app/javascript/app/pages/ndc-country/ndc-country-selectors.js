import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';
import upperCase from 'lodash/upperCase';
import qs from 'query-string';

const getIso = state => state.iso || null;
const getDocuments = state => state.data || null;
const getCountries = state => sortBy(state.countries, 'wri_standard_name');

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

const documentValue = document =>
  `${document.document_type}-${document.language}`;

const documentOption = document => ({
  label: upperCase(document.document_type),
  value: documentValue(document)
});

export const getDocumentsOptions = createSelector(
  [getCountryDocuments],
  documents => {
    if (isEmpty(documents)) return null;
    const groupedDocuments = groupBy(documents, 'document_type');
    const englishDocuments = Object.values(groupedDocuments).map(
      docs => docs.find(d => d.language === 'EN') || docs[0]
    );
    return englishDocuments.map(document => documentOption(document));
  }
);

export const getDocumentSelected = createSelector(
  [getCountryDocuments, getSearch],
  (documents, search) => {
    if (isEmpty(documents)) return null;
    if (!search || !search.document) return documentOption(documents[0]);
    const selectedDocument = documents.find(
      d => documentValue(d) === search.document
    );
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
