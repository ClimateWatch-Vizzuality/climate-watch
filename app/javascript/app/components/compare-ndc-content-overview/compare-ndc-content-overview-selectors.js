import { createSelector } from 'reselect';
// values from search
const getSelectedLocations = state => state.selectedLocations || null;

export const parseSelectedLocations = createSelector(
  getSelectedLocations,
  selectedLocations => {
    if (!selectedLocations) return null;
    const filteredLocations = [];
    selectedLocations.split(',').forEach((l, index) => {
      if (!parseInt(l, 10) && l !== '') {
        filteredLocations.push({
          iso_code3: l,
          index
        });
      }
    });
    return filteredLocations;
  }
);

export const getSelectedLocationsFilter = createSelector(
  getSelectedLocations,
  selectedLocations => {
    if (!selectedLocations) return null;
    return selectedLocations
      .split(',')
      .filter(l => !parseInt(l, 10) && l !== '');
  }
);

export default {
  parseSelectedLocations,
  getSelectedLocationsFilter
};
