import { createSelector, createStructuredSelector } from 'reselect';
import qs from 'query-string';
import { emissionTabs } from './drivers-of-emissions-data';

const getSourceSelection = state =>
  (state.location && state.location.search) || null;

const getEmissionsTabSelected = createSelector(
  [getSourceSelection],
  selectedEmissionOption => {
    if (!selectedEmissionOption) return emissionTabs[0];
    const { tab } = qs.parse(selectedEmissionOption);
    const selectedTab = emissionTabs.find(({ value }) => value === tab);
    return selectedTab || emissionTabs[0];
  }
);

export const getAllData = createStructuredSelector({
  activeTab: getEmissionsTabSelected
});
