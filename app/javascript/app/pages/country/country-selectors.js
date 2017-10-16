import { createSelector } from 'reselect';

const getCountries = state => state.countries.data;
const getIso = state => state.iso;

const getCountryByIso = (countries = [], iso) =>
  countries.find(country => country.iso_code3 === iso);

export const getCountry = createSelector(
  [getCountries, getIso],
  getCountryByIso
);

export const getCountryName = createSelector(
  [getCountry],
  (country = {}) => country.wri_standard_name || ''
);

export const getCountryDescription = createSelector(
  [getCountry],
  (country = {}) => country.description || ''
);

export const getAnchorLinks = createSelector(
  [
    state => state.route.sections || [],
    state => state.iso,
    state => state.location.search
  ],
  (sections, iso, search) =>
    sections.filter(section => section.anchor).map(section => ({
      label: section.label,
      path: `/countries/${iso}`,
      hash: section.hash,
      search
    }))
);

export default {
  getCountryName,
  getCountryDescription,
  getAnchorLinks
};
