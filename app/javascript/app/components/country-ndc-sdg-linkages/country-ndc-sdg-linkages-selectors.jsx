import { createSelector } from 'reselect';

const getSectors = state => {
  if (!state) return [];
  return state.sectors;
};

const getActiveSector = state => {
  if (!state) return [];
  return state.activeSector;
};

const getSDGs = state => {
  if (!state.data) return [];
  const sdgIds = Object.keys(state.data.sdgs);
  const sdgs = sdgIds.map(sdg => ({
    id: sdg,
    title: state.data.sdgs[sdg].title,
    colour: state.data.sdgs[sdg].colour,
    targets: state.data.sdgs[sdg].targets
  }));
  return sdgs;
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

export const filterSDGs = createSelector(
  [getSDGs, getActiveSector],
  (sdgs, sector) => {
    if (!sdgs) return [];
    const filteredSDGs = sdgs.map(sdg => {
      const targets = Object.keys(sdg.targets).filter(
        target => sdg.targets[target].sectors.indexOf(sector) > -1
      );
      return {
        ...sdg,
        targets
      };
    });
    return filteredSDGs;
  }
);

export default {
  getSectorOptions,
  filterSDGs
};
