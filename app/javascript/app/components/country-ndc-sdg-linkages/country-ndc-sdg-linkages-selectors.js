import { createSelector } from 'reselect';
import upperFirst from 'lodash/upperFirst';

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
    label: upperFirst(sectors[sector].name),
    value: sector
  }));
  return sectorOptions;
});

export const getSectorOptionsSorted = createSelector(
  [getSectorOptions],
  sectors =>
    sectors.sort((a, b) => {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
    })
);

export const filterSDGs = createSelector([mapSDGs, getActiveSector], sdgs => {
  if (!sdgs) return [];
  const filteredSDGs = sdgs.map(sdg => {
    const sectorTargets = Object.keys(sdg.targets).map(targetKey => ({
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
});

export default {
  getSectorOptionsSorted,
  filterSDGs
};
