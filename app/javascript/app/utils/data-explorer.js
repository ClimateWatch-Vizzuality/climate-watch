import invertBy from 'lodash/invertBy';
import qs from 'querystring';
import {
  DATA_EXPLORER_TO_MODULES_PARAMS,
  FILTERS_DATA_WITHOUT_MODEL,
  DATA_EXPLORER_EXTERNAL_PREFIX
} from 'data/data-explorer-constants';
import { replaceAll } from 'utils/utils';
import { getStorageWithExpiration } from 'utils/localStorage';
import { handleAnalytics } from './analytics';

const REPLACEMENTS = {
  regions: 'regions[]',
  data_sources: 'source_ids[]',
  gases: 'gas_ids[]',
  sectors: 'sector_ids[]',
  goals: 'goal_ids[]',
  indicators: 'indicator_ids[]',
  categories: 'category_ids[]',
  labels: 'label_ids[]',
  countries: 'countries[]',
  targets: 'target_ids[]',
  models: 'model_ids[]',
  scenarios: 'scenario_ids[]',
  locations: 'location_ids[]',
  sort_col: 'sort_col',
  sort_dir: 'sort_dir'
};

export const parseQuery = query => query && replaceAll(query, REPLACEMENTS);

export const openDownloadModal = (
  downloadUrl,
  setModalDownloadParams,
  section
) => {
  if (getStorageWithExpiration('userSurvey')) {
    handleAnalytics(
      'Data Explorer',
      'Download Data',
      section || 'Download All Data'
    );
    return window.location.assign(downloadUrl);
  }
  return setModalDownloadParams({
    open: true,
    downloadUrl
  });
};

const parseFilters = (search, section) => {
  const modulesToDataExplorerParamsSchema = invertBy(
    DATA_EXPLORER_TO_MODULES_PARAMS[section],
    value => value.key
  );
  const parsedFilters = {};
  Object.keys(search).forEach(key => {
    const parsedKey = `${DATA_EXPLORER_EXTERNAL_PREFIX}-${section}-${modulesToDataExplorerParamsSchema[key]}`.replace(
      '_',
      '-'
    );
    parsedFilters[parsedKey] = search[key];
  });
  return parsedFilters;
};

export const generateLinkToDataExplorer = (search, section) => {
  const sectionUrl = section ? `/${section}` : '';
  const params = search
    ? `?${qs.stringify(parseFilters(search, section))}`
    : '';
  return `/data-explorer${sectionUrl}${params}`;
};

export const isNoColumnField = (section, key) =>
  FILTERS_DATA_WITHOUT_MODEL[section] &&
  FILTERS_DATA_WITHOUT_MODEL[section].includes(key);

export default {
  parseQuery,
  openDownloadModal,
  generateLinkToDataExplorer,
  isNoColumnField
};
