import { createStructuredSelector } from 'reselect';
import getLocationsOptions from './historical-emissions-graph-selectors/location-selectors';
import getPieChartPayload from './historical-emissions-graph-selectors/pie-chart-selectors';
import {
  getGhgEmissionsFilter,
  getEmissionCountrySelected
} from './historical-emissions-graph-selectors/ghg-metadata-selectors';
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

export const getAllData = createStructuredSelector({
  data: getChartData,
  loading: getAgricultureEmissionsLoading,
  config: getChartConfig,
  domain: getChartDomain,
  filters: getFilterOptions,
  filtersSelected: getFiltersSelected,
  locations: getLocationsOptions,
  emissionsCountry: getEmissionCountrySelected,
  ghgEmissionsFilters: getGhgEmissionsFilter,
  pieChartData: getPieChartPayload,
  emissionTypes: getEmissionTypes,
  emissionType: getEmissionTypeSelected,
  emissionMetric: getMetricSelected
});
