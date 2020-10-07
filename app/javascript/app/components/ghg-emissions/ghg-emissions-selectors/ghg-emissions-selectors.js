import { createStructuredSelector } from 'reselect';
import {
  getSearch,
  getDataZoomYears,
  getLinkToDataExplorer
} from './ghg-emissions-selectors-get';
import {
  getOptions,
  getOptionsSelected,
  getModelSelected
} from './ghg-emissions-selectors-filters';
import { getFiltersConflicts } from './ghg-emissions-selectors-conflicts';
import {
  getChartConfig,
  getSortedChartDataWithOthers,
  getChartDomain,
  getHideRemoveOptions,
  getLegendDataOptionsWithOthers,
  getLegendDataSelectedWithOthers,
  getLoading,
  getDataZoomData
} from './ghg-emissions-selectors-data';
import {
  getTableData,
  getTitleLinks
} from './ghg-emissions-selectors-table-data';
import { getProviderFilters } from './ghg-emissions-selectors-providers';

export const getGHGEmissions = createStructuredSelector({
  search: getSearch,
  downloadLink: getLinkToDataExplorer,
  options: getOptions,
  selected: getOptionsSelected,
  filtersConflicts: getFiltersConflicts,
  legendOptions: getLegendDataOptionsWithOthers,
  legendSelected: getLegendDataSelectedWithOthers,
  data: getSortedChartDataWithOthers,
  tableData: getTableData,
  titleLinks: getTitleLinks,
  domain: getChartDomain,
  config: getChartConfig,
  dataZoomData: getDataZoomData,
  dataZoomYears: getDataZoomYears,
  loading: getLoading,
  fieldToBreakBy: getModelSelected,
  hideRemoveOptions: getHideRemoveOptions,
  providerFilters: getProviderFilters
});
