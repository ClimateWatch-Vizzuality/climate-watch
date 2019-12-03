import { createSelector } from 'reselect';
import qs from 'query-string';

const getCountries = state => state.countries || null;
const getIso = state => state.iso || null;

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

export default {
  getCountry,
  getAnchorLinks
};
