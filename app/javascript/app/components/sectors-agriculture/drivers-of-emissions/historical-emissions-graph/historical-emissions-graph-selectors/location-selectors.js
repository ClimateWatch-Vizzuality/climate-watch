import { createSelector } from 'reselect';

const getCountries = state => state.countries || null;
const getRegions = state => state.regions || null;

/**  LOCATIONS SELECTORS */
const getCountriesOptions = createSelector([getCountries], countries => {
  if (!countries) return null;
  return countries.map(d => ({
    label: d.wri_standard_name,
    value: d.iso_code3
  }));
});

const getRegionsOptions = createSelector([getRegions], regions => {
  if (!regions) return null;
  return regions.map(d => ({
    label: d.wri_standard_name,
    value: d.iso_code3
  }));
});

export default createSelector(
  [getCountriesOptions, getRegionsOptions],
  (countries, regions) =>
    (!countries || !countries.length || !regions || !regions.length
      ? []
      : [...countries, ...regions])
);
