import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import upperCase from 'lodash/upperCase';

const getCountries = state => state.countries || null;
const getIso = state => state.iso || null;
const getDocuments = state => state.data || null;

const getCountryByIso = (countries, iso) =>
  countries.find(country => country.iso_code3 === iso);

export const getCountry = createSelector(
  [getCountries, getIso],
  getCountryByIso
);

export const getAnchorLinks = createSelector(
  [
    state => state.route.routes || [],
    state => state.iso,
    state => state.location.search
  ],
  (routes, iso, search) =>
    routes.filter(route => route.anchor).map(route => ({
      label: route.label,
      path: `/ndcs/country/${iso}/${route.param ? route.param : ''}`,
      search
    }))
);

export const getDocumentsOptions = createSelector(
  [getDocuments, getIso],
  (documents, iso) => {
    if (isEmpty(documents) || !iso) return null;
    return documents[iso].map(doc => ({
      label: `${upperCase(doc.document_type)}(${doc.language})`,
      value: `${doc.document_type}(${doc.language})`,
      path: `/ndcs/country/${iso}/full?document=${doc.document_type}-${doc.language}`
    }));
  }
);

export default {
  getCountry,
  getAnchorLinks,
  getDocumentsOptions
};
