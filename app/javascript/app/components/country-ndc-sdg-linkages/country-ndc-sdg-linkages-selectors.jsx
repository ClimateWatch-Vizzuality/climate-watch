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
  return state.data.sdgs;
};

export const mapSDGs = createSelector(getSDGs, sdgs => {
  if (!sdgs) return [];
  const sdgIds = Object.keys(sdgs);
  const mappedSDGs = sdgIds.map(sdg => ({
    id: sdg,
    title: sdgs[sdg].title,
    colour: sdgs[sdg].colour,
    targets: sdgs[sdg].targets
  }));
  return mappedSDGs;
});

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
  [mapSDGs, getActiveSector],
  (sdgs, sector) => {
    if (!sdgs) return [];
    const filteredSDGs = sdgs.map(sdg => {
      const sectorTargetKeys = Object.keys(sdg.targets).filter(
        targetKey =>
          !sector ||
          (sdg.targets[targetKey].sectors &&
            sdg.targets[targetKey].sectors.indexOf(parseInt(sector.value, 10)) >
              -1)
      );
      const sectorTargets = sectorTargetKeys.map(targetKey => ({
        targetKey,
        title: sdg.targets[targetKey].title,
        sectors: sdg.targets[targetKey].sectors
      }));
      return {
        ...sdg,
        targets: sectorTargets
      };
    });
    return filteredSDGs;
  }
);

export default {
  getSectorOptions,
  filterSDGs
};
