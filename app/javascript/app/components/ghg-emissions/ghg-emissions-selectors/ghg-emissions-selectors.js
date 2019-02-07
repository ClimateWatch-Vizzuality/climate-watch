import { createStructuredSelector } from 'reselect';
import {
  getSearch,
  getLinkToDataExplorer
} from './ghg-emissions-selectors-get';
import {
  getOptions,
  getOptionsSelected,
  getLegendDataOptions,
  getDisableAccumulatedCharts,
  getModelSelected
} from './ghg-emissions-selectors-filters';
import {
  getLegendDataSelected,
  getChartDomain,
  getChartData,
  getChartConfig,
  getLoading,
  onlyOneRegionSelected
} from './ghg-emissions-selectors-data';
import { getProviderFilters } from './ghg-emissions-selectors-providers';

const groups = [
  {
    groupId: 'regions',
    title: 'Regions'
  },
  {
    groupId: 'countries',
    title: 'Countries'
  }
];

export const getGHGEmissions = createStructuredSelector({
  groups: () => groups,
  search: getSearch,
  downloadLink: getLinkToDataExplorer,
  options: getOptions,
  selected: getOptionsSelected,
  accumulatedChartsConflict: getDisableAccumulatedCharts,
  legendOptions: getLegendDataOptions,
  legendSelected: getLegendDataSelected,
  data: getChartData,
  domain: getChartDomain,
  config: getChartConfig,
  loading: getLoading,
  fieldToBreakBy: getModelSelected,
  hideRemoveOptions: onlyOneRegionSelected,
  providerFilters: getProviderFilters
});
