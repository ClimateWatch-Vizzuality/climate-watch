import {
  DEFAULT_EMISSIONS_SELECTIONS,
  DATA_SCALE,
  CALCULATION_OPTIONS
} from 'data/constants';

export const getGhgEmissionDefaults = (source, meta) => {
  const defaults = DEFAULT_EMISSIONS_SELECTIONS[source];
  if (!defaults) return {};

  const sectorDefaults =
    source === 'UNFCCC'
      ? Object.keys(defaults.sector).map(key => defaults.sector[key])
      : defaults.sector;
  return {
    gas: meta.gas.find(g => g.label === defaults.gas).value,
    sector: meta.sector
      .filter(s => sectorDefaults.indexOf(s.label) > -1)
      .map(s => s.value)
      .toString(),
    location: defaults.location
  };
};

export const calculatedRatio = (selected, calculationData, x) => {
  if (!calculationData || !calculationData[x]) return 1;
  if (selected === CALCULATION_OPTIONS.PER_GDP.value) {
    // GDP is in dollars and we want to display it in million dollars
    return calculationData[x][0].gdp / DATA_SCALE;
  }
  if (selected === CALCULATION_OPTIONS.PER_CAPITA.value) {
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
