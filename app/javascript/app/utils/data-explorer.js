import { replaceAll } from 'utils/utils';
import { getStorageWithExpiration } from 'utils/localStorage';

const FEATURE_DATA_SURVEY = process.env.FEATURE_DATA_SURVEY === 'true';

const REPLACEMENTS = {
  regions: 'regions[]',
  data_sources: 'source_ids[]',
  gwps: 'gwp_ids[]',
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

export const openDownloadModal = (downloadUrl, setModalDownloadParams) => {
  if (!FEATURE_DATA_SURVEY || getStorageWithExpiration('userSurvey')) {
    return window.location.assign(downloadUrl);
  }
  return setModalDownloadParams({
    open: true,
    downloadUrl
  });
};

export default { parseQuery, openDownloadModal };
