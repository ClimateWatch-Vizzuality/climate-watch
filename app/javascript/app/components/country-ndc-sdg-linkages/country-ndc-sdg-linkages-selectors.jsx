import { createSelector } from 'reselect';

const getSectors = state => {
  if (!state) return [];
  return state.sectors;
};

export const getSectorOptions = createSelector([getSectors], sectors => {
  if (!sectors) return [];
  const sectorIds = Object.keys(sectors);
  const sectorOptions = sectorIds.map(sector => ({
    label: sectors[sector].name,
    value: sector
  }));
  return sectorOptions;
});

export default {
  getSectorOptions
};
