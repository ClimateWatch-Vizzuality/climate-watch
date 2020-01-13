import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import {
  parseSelectedLocations,
  getSelectedLocationsFilter,
  addSelectedNameToLocations
} from 'selectors/compare';

// values from search
const getSelectedLocations = state => state.selectedLocations || null;
const getContentOverviewData = state => state.ndcContentOverviewData || null;
const getCountriesData = state => state.countriesData || null;

const parseLocations = parseSelectedLocations(getSelectedLocations);
export const getLocationsFilter = getSelectedLocationsFilter(
  getSelectedLocations
);
export const addNameToLocations = addSelectedNameToLocations(
  getCountriesData,
  parseLocations
);

export const getSummaryText = createSelector(
  [addNameToLocations, getContentOverviewData],
  (selectedLocations, data) => {
    if (!selectedLocations || !data || isEmpty(data)) return null;
    return selectedLocations.map(l => {
      const d = data[l.iso_code3];
      const text =
        d && d.values && d.values.find(v => v.slug === 'indc_summary');
      return { ...l, text: text && text.value };
    });
  }
);

export default {
  getSummaryText,
  getLocationsFilter
};
