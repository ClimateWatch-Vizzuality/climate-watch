import { createSelector, createStructuredSelector } from 'reselect';
import { getGhgEmissionsFilter } from 'components/sectors-agriculture/drivers-of-emissions/card-pie-chart/ghg-metadata-selectors';
import { useSlug } from 'utils/utils';
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
  getMetricSelected,
  getMetricOptions
} from './historical-emissions-graph-selectors/line-chart-selectors';

const getMeta = state =>
  (state && state.ghgEmissionsMeta && state.ghgEmissionsMeta.meta) || null;

const getAgricultureEmissionsLoading = state =>
  (state.agricultureEmissions && state.agricultureEmissions.loading) || false;

const getExploreEmissionsButtonConfig = createSelector(
  [getGhgEmissionsFilter, getEmissionCountrySelected, getMeta],
  (filters, location, meta) => {
    if (!filters || !location || !meta) return {};
    const { source, gas } = filters;
    const gasMeta = meta.gas.find(g => g.value === gas);
    const gasSlug = gasMeta && useSlug(gasMeta.label);
    const sourceMeta = meta.data_source.find(s => s.value === source);
    const sourceSlug = sourceMeta && sourceMeta.label;
    return {
      link: `/ghg-emissions?regions=${location.value}&source=${sourceSlug}&gases=${gasSlug}`
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
  emissionMetric: getMetricSelected,
  emissionMetrics: getMetricOptions
});
