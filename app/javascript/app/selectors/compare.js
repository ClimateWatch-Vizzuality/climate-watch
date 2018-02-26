import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

export const getSelectedLocationsFilter = getSelectedLocations =>
  createSelector(getSelectedLocations, selectedLocations => {
    if (!selectedLocations) return null;
    return selectedLocations
      .split(',')
      .filter(l => !parseInt(l, 10) && l !== '');
  });

export const parseSelectedLocations = getSelectedLocations =>
  createSelector(getSelectedLocations, selectedLocations => {
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
  });

export const addSelectedNameToLocations = (getCountriesData, parseLocations) =>
  createSelector(
    [getCountriesData, parseLocations],
    (countriesData, selectedLocations) => {
      if (!selectedLocations || !countriesData || isEmpty(countriesData)) {
        return null;
      }
      return selectedLocations.map(l => ({
        ...l,
        name:
          countriesData.find(d => d.iso_code3 === l.iso_code3)
            .wri_standard_name || null
      }));
    }
  );

export default {
  parseSelectedLocations,
  getSelectedLocationsFilter,
  addSelectedNameToLocations
};
