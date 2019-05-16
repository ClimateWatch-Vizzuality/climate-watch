import { createSelector } from 'reselect';
import qs from 'query-string';

const getCountries = state => state.countries || null;
const getRegions = state => state.regions || null;
const getSourceSelection = state => (state.location && state.location.search) || null;

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

export const getLocationsOptions = createSelector(
  [getCountriesOptions, getRegionsOptions],
  (countries, regions) =>
    (!countries || !countries.length || !regions || !regions.length ? [] : [...countries, ...regions])
);

export const getEmissionCountrySelected = createSelector(
  [getSourceSelection, getLocationsOptions],
  (selectedEmissionOption, countriesOptions) => {
    if (!countriesOptions) return null;
    const defaultCountry = countriesOptions.find(({ value }) => value === 'WORLD');
    if (!selectedEmissionOption) {
      return defaultCountry || countriesOptions[0];
    }
    const { emissionsCountry } = qs.parse(selectedEmissionOption);
    const selectedCountry = countriesOptions.find(({ value }) => value === emissionsCountry);
    return selectedCountry || defaultCountry;
  }
);
