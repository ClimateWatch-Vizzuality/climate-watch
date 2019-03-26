import { createSelector } from 'reselect';
import { has } from 'lodash';
import qs from 'query-string';
import getLocationsOptions from './location-selectors';

const getGhgSources = state =>
  (has(state, 'ghgEmissionsMeta.meta.data_source') &&
    state.ghgEmissionsMeta.meta.data_source) ||
  null;
const getGhgGas = state =>
  (has(state, 'ghgEmissionsMeta.meta.gas') &&
    state.ghgEmissionsMeta.meta.gas) ||
  null;
const getSourceSelection = state =>
  (state.location && state.location.search) || null;

/** GHG EMISSIONS METADATA SELECTORS (for piechart) */
export const getEmissionCountrySelected = createSelector(
  [getSourceSelection, getLocationsOptions],
  (selectedEmissionOption, countriesOptions) => {
    if (!countriesOptions) return null;
    const defaultCountry = countriesOptions.find(
      ({ value }) => value === 'WORLD'
    );
    if (!selectedEmissionOption) {
      return defaultCountry || countriesOptions[0];
    }
    const { emissionsCountry } = qs.parse(selectedEmissionOption);
    const selectedCountry = countriesOptions.find(
      ({ value }) => value === emissionsCountry
    );
    return selectedCountry || defaultCountry;
  }
);

const getGhgEmissionGas = createSelector([getGhgGas], gases => {
  if (!gases) return null;
  const defaultGas = gases.find(s => s.label === 'All GHG');
  return defaultGas || gases[0];
});

const getGhgEmissionSource = createSelector([getGhgSources], sources => {
  if (!sources) return null;
  const defaultSource = sources.find(s => s.label === 'CAIT');
  return defaultSource || sources[0];
});

export const getGhgEmissionsFilter = createSelector(
  [getEmissionCountrySelected, getGhgEmissionSource, getGhgEmissionGas],
  (selectedCountry, source, gas) => {
    if (!selectedCountry || !source || !gas) return null;
    return {
      location: `WORLD,${selectedCountry.value}`,
      source: source.value,
      gas: gas.value
    };
  }
);
