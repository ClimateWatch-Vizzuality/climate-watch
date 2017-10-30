import { createSelector } from 'reselect';
import compact from 'lodash/compact';

const getCountries = state => state.data || null;
const getLocations = state => state.locations || null;
const getIso = state => state.iso;
const getAllIndicators = state => state.data.indicators || null;
const getCategories = state => state.data.categories || null;

const getCountryByIso = (countries, iso) =>
  countries.find(country => country.iso_code3 === iso);

export const getActiveCountries = createSelector(
  [getCountries, getLocations],
  (countries, locations) => {
    if (!countries && !countries.length && !locations) return null;
    const activeCountries = locations.map(location => {
      if (parseInt(location, 10)) return null;
      const countryDetail = countries.find(
        country => country.iso_code3 === location
      );
      return {
        label: countryDetail ? countryDetail.wri_standard_name : '',
        value: countryDetail ? countryDetail.iso_code3 : ''
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

export const parseIndicatorsDefs = createSelector(
  [getAllIndicators, getCategories, getLocations],
  (indicators, categories, countries) => {
    if (!indicators || !categories || !countries) return {};
    const parsedIndicators = {};
    Object.keys(categories).forEach(category => {
      const categoryIndicators = indicators.filter(
        indicator => indicator.category_ids.indexOf(category) > -1
      );
      const parsedDefinitions = categoryIndicators.map(def => {
        const descriptions = countries.map(country => ({
          iso: country,
          value: def.locations[country] ? def.locations[country].value : null
        }));
        return {
          title: def.name,
          slug: def.slug,
          descriptions
        };
      });
      parsedIndicators[category] = parsedDefinitions;
    });
    return parsedIndicators;
  }
);

export const getNDCs = createSelector(
  [getCategories, parseIndicatorsDefs],
  (categories, indicators) => {
    if (!categories) return [];
    const ndcs = Object.keys(categories).map(category => ({
      title: categories[category].name,
      slug: categories[category].slug,
      definitions: indicators[category] ? indicators[category] : []
    }));
    return ndcs;
  }
);

export const getCountry = createSelector(
  [getCountries, getIso],
  getCountryByIso
);

export const getAnchorLinks = createSelector(
  [
    state => state.route.routes || [],
    state => state.location.search
  ],
  (routes, search) =>
    routes.filter(route => route.anchor).map(route => ({
      label: route.label,
      path: `/ndcs/compare/${route.param ? route.param : ''}`,
      search
    }))
);

export default {
  getCountry,
  getCountriesOptions,
  getCountriesOptionsFiltered,
  getActiveCountries,
  getNDCs,
  getAnchorLinks
};
