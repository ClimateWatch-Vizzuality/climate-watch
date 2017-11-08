import { createSelector } from 'reselect';
import compact from 'lodash/compact';
import qs from 'query-string';

const getCountries = state => state.data || null;
const getLocations = state => state.locations || null;
const getIso = state => state.iso;

const getCountryByIso = (countries, iso) =>
  countries.find(country => country.iso_code3 === iso);

export const getActiveCountries = createSelector(
  [getCountries, getLocations],
  (countries, locations) => {
    if (!countries && !countries.length) return null;
    const activeCountries = locations.map(location => {
      if (parseInt(location, 10)) return null;
      const countryDetail = countries.find(
        country => country.iso_code3 === location
      );
      return {
        label: countryDetail && countryDetail.wri_standard_name,
        value: countryDetail && countryDetail.iso_code3
      };
    });
    return activeCountries;
  }
);

export const getCountriesOptions = createSelector([getCountries], countries =>
  countries.map(country => ({
    label: country.wri_standard_name,
    value: country.iso_code3
  }))
);

export const getCountriesOptionsFiltered = createSelector(
  [getCountriesOptions, getActiveCountries],
  (countries, activeCountries) => {
    const activeCountriesISOs = compact(activeCountries).map(
      activeCountry => activeCountry.value
    );
    return countries.filter(
      country => activeCountriesISOs.indexOf(country.value) === -1
    );
  }
);

export const getCountry = createSelector(
  [getCountries, getIso],
  getCountryByIso
);

export const getAnchorLinks = createSelector(
  [state => state.route.routes || [], state => state.location.search],
  (routes, search) => {
    const searchQuery = qs.parse(search);
    const searchParams = { locations: searchQuery.locations };
    return routes.filter(route => route.anchor).map(route => ({
      label: route.label,
      path: `/ndcs/compare/${route.param ? route.param : ''}`,
      search: `?${qs.stringify(searchParams)}`
    }));
  }
);

export default {
  getCountry,
  getCountriesOptions,
  getCountriesOptionsFiltered,
  getActiveCountries,
  getAnchorLinks
};
