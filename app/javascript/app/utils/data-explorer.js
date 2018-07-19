import { replaceAll } from 'utils/utils';

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
  locations: 'location_ids[]'
};

export const parseQuery = query => query && replaceAll(query, REPLACEMENTS);

export default { parseQuery };
