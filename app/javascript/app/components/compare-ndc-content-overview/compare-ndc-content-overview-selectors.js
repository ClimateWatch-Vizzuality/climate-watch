import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
// values from search
const getSelectedLocations = state => state.selectedLocations || null;
const getContentOverviewData = state => state.ndcContentOverviewData || null;

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
    const locations = selectedLocations;
    return locations.split(',').filter(l => !parseInt(l, 10) && l !== '');
  }
);

export const getSummaryText = createSelector(
  [parseSelectedLocations, getContentOverviewData],
  (selectedLocations, data) => {
    if (!selectedLocations || !data || isEmpty(data)) return null;
    const locations = selectedLocations;
    const s = locations.map(l => {
      const d = data[l.iso_code3];
      const text =
        d && d.values && d.values.find(v => v.slug === 'indc_summary').value;
      return {
        text,
        index: l.index,
        location: l.iso_code3
      };
    });
    return s;
  }
);

export default {
  parseSelectedLocations,
  getSummaryText,
  getSelectedLocationsFilter
};
