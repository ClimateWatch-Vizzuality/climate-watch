import { createSelector } from 'reselect';
import qs from 'query-string';
import {
  emissionTabs,
  HISTORICAL_EMISSIONS
} from './drivers-of-emissions-data';

const getSourceSelection = routeData => routeData.location.search || null;

export const getEmissionsTabSelected = createSelector(
  [getSourceSelection],
  selectedEmissionOption => {
    if (!selectedEmissionOption) {
      const defaultSource = emissionTabs.find(
        ({ value }) => value === HISTORICAL_EMISSIONS
      );
      return defaultSource || emissionTabs[0];
    }
    const { tab } = qs.parse(selectedEmissionOption);
    const selectedTab = emissionTabs.find(({ value }) => value === tab);
    return selectedTab ? selectedTab.value : emissionTabs[0];
  }
);

export default {
  getEmissionsTabSelected
};
