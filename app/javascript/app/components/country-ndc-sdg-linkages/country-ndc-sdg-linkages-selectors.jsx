import { createSelector } from 'reselect';

const getSectors = state => {
  if (!state) return [];
  return state.sectors;
};

const getSDGs = state => {
  if (!state) return {};
  return state.sdgs;
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

export const filterSDGs = createSelector([getSDGs], sdgs => {
  if (!sdgs) return {};
  const sdgIds = Object.keys(sdgs);
  const filteredSDGs = sdgIds.map(sdg => ({
    id: sdg,
    title: sdgs[sdg].title,
    colour: sdgs[sdg].colour,
    targets: sdgs[sdg].targets
  }));
  return filteredSDGs;
});

export default {
  getSectorOptions,
  filterSDGs
};
