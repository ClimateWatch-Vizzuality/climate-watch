import { createSelector } from 'reselect';

const getCountries = state => state.countries;
const getIso = state => state.iso;

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

export default {
  getCountry,
  getAnchorLinks
};
