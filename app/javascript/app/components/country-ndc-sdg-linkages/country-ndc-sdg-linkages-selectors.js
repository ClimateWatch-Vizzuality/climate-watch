import { createSelector } from 'reselect';
import upperFirst from 'lodash/upperFirst';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';

const getSectors = state => {
  if (!state.data) return null;
  return state.data.sectors;
};

const getTargets = state => {
  if (!state.data.targets) return null;
  return state.data.targets;
};

const getActiveSectorId = state => {
  if (!state.activeSector) return null;
  return state.activeSector;
};

export const getSectorsMapped = createSelector([getSectors], sectors => {
  if (!sectors) return null;
  const sectorsMapped = {};
  sectors.forEach(sector => {
    sectorsMapped[sector.id] = sector.name;
  });
  return sectorsMapped;
});

export const getSectorOptions = createSelector([getSectors], sectors => {
  if (!sectors) return null;

  const sectorOptions = Object.keys(sectors).map(sector => ({
    label: upperFirst(sectors[sector].name),
    value: sectors[sector].id
  }));
  return sectorOptions;
});

export const getSectorOptionsSorted = createSelector(
  [getSectorOptions],
  sectors => {
    if (!sectors) return null;
    return sectors.sort((a, b) => {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
    });
  }
);

export const getSectorSelected = createSelector(
  [getSectorOptions, getActiveSectorId],
  (sectors, activeSector) => {
    if (!sectors) return null;
    return sectors.find(sector => sector.value === parseInt(activeSector, 10));
  }
);

export const groupTargetsMeta = createSelector([getTargets], targets => {
  if (!targets) return {};
  return groupBy(sortBy(targets, 'number'), 'goal_number');
});

export default {
  getSectorOptionsSorted,
  groupTargetsMeta,
  getSectorSelected,
  getSectorsMapped
};
