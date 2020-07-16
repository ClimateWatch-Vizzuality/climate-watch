import {
  DEFAULT_EMISSIONS_SELECTIONS,
  GHG_CALCULATION_OPTIONS
} from 'data/constants';
import { useSlug } from 'utils';

export const getGhgEmissionDefaults = (source, meta) => {
  const sourceName = source.name || source.label;
  const defaults = DEFAULT_EMISSIONS_SELECTIONS[sourceName];
  if (!defaults) return {};

  const sectorDefaults = defaults.sector;
  return {
    gas: (meta.gas.find(g => g.label === defaults.gas) || {}).value,
    sector: (meta.sector.find(s => s.label === sectorDefaults) || {}).value,
    location: defaults.location
  };
};

export const getGhgEmissionDefaultSlugs = (source, meta) => {
  const sourceName = source.name || source.label;
  const defaults = DEFAULT_EMISSIONS_SELECTIONS[sourceName];
  if (!defaults) return {};
  const gas = meta.gas.find(g => g.label === defaults.gas);
  const sector = meta.sector.find(s => s.label === defaults.sector);
  return {
    gas: gas && useSlug(gas.label),
    sector: sector && useSlug(sector.label),
    location: defaults.location
  };
};

export const calculatedRatio = (selected, calculationData, x) => {
  if (!calculationData || !calculationData[x]) return 1;
  if (selected === GHG_CALCULATION_OPTIONS.PER_GDP.value) {
    // GDP is in dollars and we want to display it in million dollars
    return calculationData[x][0].gdp / 1000000;
  }
  if (selected === GHG_CALCULATION_OPTIONS.PER_CAPITA.value) {
    return calculationData[x][0].population;
  }
  return 1;
};

export const toPlural = model => {
  const plurals = {
    sector: 'sectors',
    gas: 'gases'
  };
  return plurals[model] || model;
};
