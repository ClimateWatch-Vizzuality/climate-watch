import { createSelector } from 'reselect';
import { has } from 'lodash';
import getIsoCode from './location-selectors';

const getGhgSources = state =>
  (has(state, 'ghgEmissionsMeta.meta.data_source') &&
    state.ghgEmissionsMeta.meta.data_source) ||
  null;

const getGhgGas = state =>
  (has(state, 'ghgEmissionsMeta.meta.gas') &&
    state.ghgEmissionsMeta.meta.gas) ||
  null;

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
  [getIsoCode, getGhgEmissionSource, getGhgEmissionGas],
  (isoCode, source, gas) => {
    if (!isoCode || !source || !gas) return null;
    return {
      location: `WORLD,${isoCode}`,
      source: source.value,
      gas: gas.value
    };
  }
);
