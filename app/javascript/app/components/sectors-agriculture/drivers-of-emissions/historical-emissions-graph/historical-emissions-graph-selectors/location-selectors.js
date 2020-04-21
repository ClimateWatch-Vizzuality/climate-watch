import { createSelector } from 'reselect';
import get from 'lodash/get';
import qs from 'query-string';

const getCountries = state => state.countries || null;
const getRegions = state => state.regions || null;
const getSourceSelection = state =>
  (state.location && state.location.search) || null;
const getLocationsWithData = state =>
  get(state, 'agricultureEmissions.meta.emission_locations_with_data', null);

/**  LOCATIONS SELECTORS */
const getCountriesOptions = createSelector([getCountries], countries => {
  if (!countries) return null;
  return countries.map(d => ({
    label: d.wri_standard_name,
    value: d.iso_code3,
    groupId: 'countries'
  }));
});

const getRegionsOptions = createSelector([getRegions], regions => {
  if (!regions) return null;
  return regions.map(d => ({
    label: d.wri_standard_name,
    value: d.iso_code3,
    members: d.members && d.members.map(({ iso_code3 }) => iso_code3),
    groupId: 'regions'
  }));
});

const getLocationsOptionsUnfiltered = createSelector(
  [getCountriesOptions, getRegionsOptions],
  (countries, regions) => {
    if (!countries || !regions) return [];

    return [...countries, ...regions];
  }
);

export const getLocationsOptions = createSelector(
  [getLocationsOptionsUnfiltered, getLocationsWithData],
  (locations, locationsWithData) => {
    if (!locations || !locationsWithData) return [];

    return locations.filter(l => locationsWithData.includes(l.value));
  }
);

export const getEmissionCountrySelected = createSelector(
  [getSourceSelection, getLocationsOptionsUnfiltered],
  (selectedEmissionOption, countriesOptions) => {
    if (!countriesOptions) return null;
    const defaultCountry = countriesOptions.find(
      ({ value }) => value === 'WORLD'
    );
    if (!selectedEmissionOption) {
      return defaultCountry || null;
    }
    const { emissionsCountry } = qs.parse(selectedEmissionOption);
    const selectedCountry = countriesOptions.find(
      ({ value }) => value === emissionsCountry
    );
    return selectedCountry || defaultCountry;
  }
);
