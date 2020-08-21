import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import groupBy from 'lodash/groupBy';
import qs from 'query-string';
import upperCase from 'lodash/upperCase';

const FEATURE_NDC_FILTERING = process.env.FEATURE_NDC_FILTERING === 'true';

const getIso = state => state.iso || null;
const getDocuments = state => {
  if (FEATURE_NDC_FILTERING) {
    if (!state.countriesDocuments || !state.countriesDocuments.data) {
      return null;
    }
    return state.countriesDocuments.data || null;
  }
  return state.ndcsDocumentsMeta.data || null;
};

const getCountries = state => {
  if (!state.countries || !state.countries.data) {
    return null;
  }
  return sortBy(state.countries.data, 'wri_standard_name');
};

const getCountryByIso = (countries, iso) =>
  (countries ? countries.find(country => country.iso_code3 === iso) : null);

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
    const submittedDocuments = documents[iso].filter(
      ({ slug, submission_date }) =>
        !(slug === 'second_ndc' && !submission_date)
    );
    return submittedDocuments;
  }
);

const documentOption = document => ({
  label: document.long_name,
  value: document.slug
});

const legacyDocumentValue = document =>
  `${document.document_type}-${document.language}`;

const legacyDocumentOption = document => ({
  label: upperCase(document.document_type),
  value: legacyDocumentValue(document)
});

export const getDocumentsOptions = createSelector(
  [getCountryDocuments],
  documents => {
    if (isEmpty(documents)) return null;
    if (FEATURE_NDC_FILTERING) {
      return sortBy(
        documents
          .filter(d => d.is_ndc)
          .map(document => documentOption(document)),
        'ordering'
      );
    }
    const groupedDocuments = groupBy(documents, 'document_type');
    const englishDocuments = Object.values(groupedDocuments).map(
      docs => docs.find(d => d.language === 'EN') || docs[0]
    );
    return englishDocuments.map(document => legacyDocumentOption(document));
  }
);

export const getDocumentSelected = createSelector(
  [getCountryDocuments, getSearch],
  (documents, search) => {
    if (!documents || isEmpty(documents)) return null;
    const lastDocument = documents[documents.length - 1];
    if (FEATURE_NDC_FILTERING) {
      if (!search || !search.document) {
        return documentOption(lastDocument);
      }
      const selectedDocument = documents.find(d => d.slug === search.document);
      return selectedDocument
        ? documentOption(selectedDocument)
        : documentOption(lastDocument);
    }

    if (!search || !search.document) {
      return legacyDocumentOption(lastDocument);
    }
    const selectedDocument = documents.find(
      d => legacyDocumentValue(d) === search.document
    );

    return selectedDocument
      ? legacyDocumentOption(selectedDocument)
      : legacyDocumentOption(lastDocument);
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
