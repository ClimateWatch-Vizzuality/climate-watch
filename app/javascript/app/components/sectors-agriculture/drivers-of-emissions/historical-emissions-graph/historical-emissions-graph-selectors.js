import { createSelector, createStructuredSelector } from 'reselect';
import { getGhgEmissionsFilter } from 'components/sectors-agriculture/drivers-of-emissions/card-pie-chart/ghg-metadata-selectors';
import {
  getLocationsOptions,
  getEmissionCountrySelected
} from './historical-emissions-graph-selectors/location-selectors';
import {
  getChartData,
  getChartConfig,
  getFilterOptions,
  getFiltersSelected,
  getEmissionTypes,
  getEmissionTypeSelected,
  getMetricSelected
} from './historical-emissions-graph-selectors/line-chart-selectors';

const getAgricultureEmissionsLoading = state =>
  (state.agricultureEmissions && state.agricultureEmissions.loading) || false;

const getExploreEmissionsButtonConfig = createSelector(
  [getGhgEmissionsFilter, getEmissionCountrySelected],
  (filters, location) => {
    if (!filters || !location) return {};
    const { source, gas } = filters;
    return {
      link: `/ghg-emissions?regions=${location.value}&source=${source}&gases=${gas}`
    };
  }
);

export const getAllData = createStructuredSelector({
  data: getChartData,
  loading: getAgricultureEmissionsLoading,
  config: getChartConfig,
  filters: getFilterOptions,
  filtersSelected: getFiltersSelected,
  locations: getLocationsOptions,
  emissionsCountry: getEmissionCountrySelected,
  exploreEmissionsConfig: getExploreEmissionsButtonConfig,
  emissionTypes: getEmissionTypes,
  emissionType: getEmissionTypeSelected,
  emissionMetric: getMetricSelected
});
