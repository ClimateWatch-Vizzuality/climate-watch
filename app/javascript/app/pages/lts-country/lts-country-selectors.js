import { createSelector } from 'reselect';
import qs from 'query-string';
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
  (routes, iso, search) => {
    const searchParams = { search: qs.parse(search).search };
    return routes
      .filter(route => route.anchor)
      .map(route => ({
        label: route.label,
        path: `/lts/country/${iso}/${route.param ? route.param : ''}`,
        search: `?${qs.stringify(searchParams)}`
      }));
  }
);

export const getDocumentsOptions = createSelector(
  [getDocuments, getIso],
  (documents, iso) => {
    if (isEmpty(documents) || !iso || !documents[iso]) return null;
    return documents[iso].map(doc => ({
      label: `${upperCase(doc.document_type)}(${doc.language})`,
      value: `${doc.document_type}(${doc.language})`,
      path: `/lts/country/${iso}/full?document=${doc.document_type}-${doc.language}`
    }));
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
