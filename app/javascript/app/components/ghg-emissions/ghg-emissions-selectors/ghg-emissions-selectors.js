import { createStructuredSelector } from 'reselect';
import { getSearch, getLinkToDataExplorer } from './ghg-emissions-selectors-get';
import {
  getOptions,
  getOptionsSelected,
  getFiltersConflicts,
  getModelSelected
} from './ghg-emissions-selectors-filters';
import {
  getLegendDataOptions,
  getLegendDataSelected,
  getChartDomain,
  getChartData,
  getChartConfig,
  getLoading,
  getHideRemoveOptions
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
  filtersConflicts: getFiltersConflicts,
  legendOptions: getLegendDataOptions,
  legendSelected: getLegendDataSelected,
  data: getChartData,
  domain: getChartDomain,
  config: getChartConfig,
  loading: getLoading,
  fieldToBreakBy: getModelSelected,
  hideRemoveOptions: getHideRemoveOptions,
  providerFilters: getProviderFilters
});
