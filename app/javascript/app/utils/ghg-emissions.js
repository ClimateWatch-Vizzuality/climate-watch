export const getGhgEmissionDefaults = (source, meta) => {
  const defaults = {};
  switch (source) {
    case 'CAIT':
      defaults.sector = meta.sector.find(
        s => s.label === 'Total excluding LUCF'
      ).value;
      defaults.gas = meta.gas.find(g => g.label === 'All GHG').value;
      defaults.location = 'WORLD';
      break;
    case 'PIK':
      defaults.sector = meta.sector.find(
        s => s.label === 'Total excluding LUCF'
      ).value;
      defaults.gas = meta.gas.find(g => g.label === 'All GHG').value;
      defaults.location = 'WORLD';
      break;
    case 'UNFCCC':
      defaults.sector = meta.sector
        .filter(
          s =>
            s.label === 'Total GHG emissions without LULUCF' ||
            s.label === 'Total GHG emissions excluding LULUCF/LUCF'
        )
        .map(d => d.value)
        .toString();
      defaults.gas = meta.gas.find(g => g.label === 'Aggregate GHGs').value;
      defaults.location = 'ANNEXI';
      break;
    default:
      return null;
  }
  return defaults;
};

export default getGhgEmissionDefaults;
