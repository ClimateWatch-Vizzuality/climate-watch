import { createSelector } from 'reselect';
import upperFirst from 'lodash/upperFirst';

const getSectors = state => {
  if (!state.data) return [];
  return state.data.sectors;
};

const getSDGs = state => {
  if (!state.data) return [];
  return state.data.sdgs;
};

const getActiveSectorId = state => {
  if (!state.activeSector) return null;
  return state.activeSector;
};

const getNdcsSdgsTargets = state => {
  if (!state.data) return null;
  return state.data.targets;
};

export const parsedNdcsSdgs = createSelector(getNdcsSdgsTargets, targets => {
  if (!targets) return {};
  const mappedTargets = {};
  targets.forEach(target => {
    mappedTargets[target.number] = {
      title: target.title,
      sectors: target.sectors
    };
  });
  return mappedTargets;
});

export const mapSDGs = createSelector(getSDGs, sdgs => {
  if (!sdgs) return [];
  const sdgIds = Object.keys(sdgs);
  const mappedSDGs = sdgIds.map(sdg => ({
    id: sdg,
    number: sdg,
    title: sdgs[sdg].title,
    colour: sdgs[sdg].colour,
    targets: sdgs[sdg].targets
  }));
  return mappedSDGs;
});

export const getSectorOptions = createSelector([getSectors], sectors => {
  if (!sectors) return [];
  const sectorOptions = Object.keys(sectors).map(sector => ({
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

export const getSectorSelected = createSelector(
  [getSectorOptions, getActiveSectorId],
  (sectors, activeSector) => {
    if (!sectors && !sectors.length) return {};
    return sectors.find(sector => sector.value === activeSector);
  }
);

export const filterSDGs = createSelector([mapSDGs], sdgs => {
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
  filterSDGs,
  getSectorSelected,
  parsedNdcsSdgs
};
