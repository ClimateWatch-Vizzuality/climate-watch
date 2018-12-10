import { createStructuredSelector, createSelector } from 'reselect';
import {
  ALL_SELECTED_OPTION,
  METRIC_OPTIONS,
  TOP_EMITTERS
} from 'data/constants';

import {
  getMetadata,
  getSourcesMeta,
  getSearch
} from './ghg-emissions-get-selectors';

const findOption = (options, value) =>
  options &&
  options.find(
    o =>
      String(o.value) === String(value) || o.name === value || o.label === value
  );

// OPTIONS
const CHART_TYPE_OPTIONS = [
  { label: 'area', value: 'area' },
  { label: 'line', value: 'line' }
];

const BREAK_BY_OPTIONS = [
  {
    label: 'Regions - Absolute',
    value: `regions-${METRIC_OPTIONS.ABSOLUTE_VALUE.value}`
  },
  {
    label: 'Regions - Per GDP',
    value: `regions-${METRIC_OPTIONS.PER_GDP.value}`
  },
  {
    label: 'Province - Per Capita',
    value: `region-${METRIC_OPTIONS.PER_CAPITA.value}`
  },
  {
    label: 'Sector - Absolute',
    value: `sector-${METRIC_OPTIONS.ABSOLUTE_VALUE.value}`
  },
  {
    label: 'Sector - Per GDP',
    value: `sector-${METRIC_OPTIONS.PER_CAPITA.value}`
  },
  {
    label: 'Sector - Per Capita',
    value: `sector-${METRIC_OPTIONS.PER_GDP.value}`
  },
  {
    label: 'Gas - Absolute',
    value: `gas-${METRIC_OPTIONS.ABSOLUTE_VALUE.value}`
  },
  { label: 'Gas - Per GDP', value: `gas-${METRIC_OPTIONS.PER_GDP.value}` },
  { label: 'Gas - Per Capita', value: `gas-${METRIC_OPTIONS.PER_CAPITA.value}` }
];

const getFieldOptions = field =>
  createSelector(getMetadata, metadata => {
    if (!metadata || !metadata[field]) return null;
    // if (field === 'dataSource') {
    //   return metadata[field].map(o => ({
    //     name: o.label,
    //     value: String(o.value)
    //   }));
    // }
    return metadata[field].map(o => ({
      label: o.label,
      value: String(o.value)
    }));
  });

const getSourceOptions = createSelector(getSourcesMeta, sources => {
  if (!sources) return null;
  return sources.map(d => ({
    label: d.label,
    value: d.value,
    source: d.source
  }));
});

export const getFilterOptions = createStructuredSelector({
  source: getSourceOptions,
  chartType: () => CHART_TYPE_OPTIONS,
  breakBy: () => BREAK_BY_OPTIONS,
  regions: getFieldOptions('location'),
  sector: getFieldOptions('sector'),
  gas: getFieldOptions('gas')
});

const getFieldSelected = field => state => {
  const { search: query } = state;
  if (!query || !query[field]) return getDefaults(state)[field];
  const queryValue = String(query[field]);
  // if (queryValue === ALL_SELECTED) return ALL_SELECTED_OPTION;
  const findSelectedOption = value =>
    findOption(getFilterOptions(state)[field], value);
  return queryValue.includes(',')
    ? queryValue.split(',').map(v => findSelectedOption(v))
    : findSelectedOption(queryValue);
};

export const getSourceSelected = createSelector(
  [getSourceOptions, getSearch],
  (sources, search) => {
    if (!sources) return null;
    const selected = search && search.source;
    if (!selected) return sources[0];
    return sources.find(category => category.value === parseInt(selected, 10));
  }
);

// DEFAULTS
const getDefaults = createSelector(getFilterOptions, options => ({
  source: findOption(options.source, 'SIGN SMART'),
  chartType: findOption(CHART_TYPE_OPTIONS, 'line'),
  breakBy: findOption(
    BREAK_BY_OPTIONS,
    `provinces-${METRIC_OPTIONS.ABSOLUTE_VALUE.value}`
  ),
  provinces: TOP_EMITTERS,
  sector: ALL_SELECTED_OPTION,
  gas: ALL_SELECTED_OPTION
}));

// SELECTED

const filterSectorSelectedByMetrics = createSelector(
  [
    getFieldSelected('sector'),
    getFieldOptions('sector'),
    getFieldSelected('breakBy')
  ],
  (sectorSelected, sectorOptions, breakBy) => {
    if (!sectorOptions || !breakBy) return null;
    if (!breakBy.value.endsWith(METRIC_OPTIONS.ABSOLUTE_VALUE.value)) {
      return sectorOptions.find(o => o.label === 'Total') || sectorSelected;
    }
    return sectorSelected;
  }
);

export const getSelectedOptions = createStructuredSelector({
  source: getFieldSelected('source'),
  chartType: getFieldSelected('chartType'),
  breakBy: getFieldSelected('breakBy'),
  provinces: getFieldSelected('provinces'),
  sector: filterSectorSelectedByMetrics,
  gas: getFieldSelected('gas')
});

const getBreakBySelected = createSelector(getSelectedOptions, options => {
  if (!options || !options.breakBy) return null;
  const breakByArray = options.breakBy.value.split('-');
  return { modelSelected: breakByArray[0], metricSelected: breakByArray[1] };
});

export const getModelSelected = createSelector(
  getBreakBySelected,
  breakBySelected => (breakBySelected && breakBySelected.modelSelected) || null
);
export const getMetricSelected = createSelector(
  getBreakBySelected,
  breakBySelected => (breakBySelected && breakBySelected.metricSelected) || null
);
