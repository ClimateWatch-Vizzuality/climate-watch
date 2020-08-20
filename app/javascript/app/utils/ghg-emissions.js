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

export const replaceSubscript = text => {
  const super_sub_script_dict = {
    '\u2070': '0',
    '\u00B9': '1',
    '\u00B2': '2',
    '\u00B3': '3',
    '\u2074': '4',
    '\u2075': '5',
    '\u2076': '6',
    '\u2077': '7',
    '\u2078': '8',
    '\u2079': '9',
    '\u2080': '0',
    '\u2081': '1',
    '\u2082': '2',
    '\u2083': '3',
    '\u2084': '4',
    '\u2085': '5',
    '\u2086': '6',
    '\u2087': '7',
    '\u2088': '8',
    '\u2089': '9'
  };
  const regex = /[\u00B9\u00B2\u00B3\u2070\u2074-\u2089]/g;
  return text.replace(regex, x => super_sub_script_dict[x]);
};
