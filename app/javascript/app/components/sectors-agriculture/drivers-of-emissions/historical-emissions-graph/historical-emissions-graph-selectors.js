import { /** createSelector, */ createStructuredSelector } from 'reselect';
import {
  getLocationsOptions,
  getEmissionCountrySelected
} from './historical-emissions-graph-selectors/location-selectors';

import {
  getChartData,
  getChartConfig,
  getChartDomain,
  getFilterOptions,
  getFiltersSelected,
  getEmissionTypes,
  getEmissionTypeSelected,
  getMetricSelected
} from './historical-emissions-graph-selectors/line-chart-selectors';

const getAgricultureEmissionsLoading = state =>
  (state.agricultureEmissions && state.agricultureEmissions.loading) || false;

// TO DO
// const getExploreEmissionsButtonConfig = createSelector(
//   getGhgEmissionsFilter,
//   filters => {
//     // if (!filters) return {};
//     // const { location, source, gas } = filters;
//     // return {
//     //   link: `/ghg-emissions?regions=${location}&source=${source}&gases=${gas}`
//     // };
//   }
// );

export const getAllData = createStructuredSelector({
  data: getChartData,
  loading: getAgricultureEmissionsLoading,
  config: getChartConfig,
  domain: getChartDomain,
  filters: getFilterOptions,
  filtersSelected: getFiltersSelected,
  locations: getLocationsOptions,
  emissionsCountry: getEmissionCountrySelected,
  exploreEmissionsConfig: /** getExploreEmissionsButtonConfig, */ () => {},
  emissionTypes: getEmissionTypes,
  emissionType: getEmissionTypeSelected,
  emissionMetric: getMetricSelected
});
