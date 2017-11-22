import { DEFAULT_EMISSIONS_SELECTIONS } from 'data/constants';

export const getGhgEmissionDefaults = (source, meta) => {
  const defaults = DEFAULT_EMISSIONS_SELECTIONS[source];
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

export default getGhgEmissionDefaults;
