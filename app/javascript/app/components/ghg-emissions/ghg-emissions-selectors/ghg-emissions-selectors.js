import { createStructuredSelector } from 'reselect';
import {
  getSearch,
  getDataZoomYears,
  getLinkToDataExplorer
} from './ghg-emissions-selectors-get';
import {
  getOptions,
  getOptionsSelected,
  getModelSelected,
  getDynamicSEOTitlePart
} from './ghg-emissions-selectors-filters';
import { getFiltersConflicts } from './ghg-emissions-selectors-conflicts';
import {
  getChartConfig,
  getWorldCorrectedChartDataWithOthers,
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
import { getPngSelectionSubtitle } from './ghg-emissions-selectors-png';
import {
  getProviderFilters,
  getIsSubnationalSource
} from './ghg-emissions-selectors-providers';

export const getGHGEmissions = createStructuredSelector({
  search: getSearch,
  downloadLink: getLinkToDataExplorer,
  options: getOptions,
  selected: getOptionsSelected,
  filtersConflicts: getFiltersConflicts,
  legendOptions: getLegendDataOptionsWithOthers,
  legendSelected: getLegendDataSelectedWithOthers,
  data: getWorldCorrectedChartDataWithOthers,
  tableData: getTableData,
  titleLinks: getTitleLinks,
  domain: getChartDomain,
  config: getChartConfig,
  dataZoomData: getDataZoomData,
  dataZoomYears: getDataZoomYears,
  loading: getLoading,
  fieldToBreakBy: getModelSelected,
  hideRemoveOptions: getHideRemoveOptions,
  providerFilters: getProviderFilters,
  isSubnationalSource: getIsSubnationalSource,
  dynamicSEOTitlePart: getDynamicSEOTitlePart,
  pngSelectionSubtitle: getPngSelectionSubtitle
});
