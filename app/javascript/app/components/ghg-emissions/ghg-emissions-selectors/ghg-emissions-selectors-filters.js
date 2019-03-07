import { createSelector, createStructuredSelector } from 'reselect';
import difference from 'lodash/difference';
import intersection from 'lodash/intersection';
import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';
import { arrayToSentence } from 'utils';
import { getGhgEmissionDefaults, toPlural } from 'utils/ghg-emissions';
import { sortLabelByAlpha } from 'utils/graphs';
import { TOP_EMITTERS_OPTION, METRIC_OPTIONS } from 'data/constants';
import { getMeta, getRegions, getSources, getSelection } from './ghg-emissions-selectors-get';

const DEFAULTS = {
  breakBy: `regions-${METRIC_OPTIONS.ABSOLUTE_VALUE.value}`
};

const getOptionSelectedFunction = filter => (options, selected) => {
  if (!options) return null;
  if (!selected) {
    const defaultOption = options.find(b => b.value === DEFAULTS[filter]);
    return defaultOption || options[0];
  }
  return options.find(o => o.value === selected);
};

// Sources selectors
const getSourceOptions = createSelector([getSources], sources => {
  if (!sources) return null;

  return sources.map(source => ({
    name: source.name,
    label: source.label,
    value: String(source.value)
  }));
});

const getSourceSelected = createSelector(
  [getSourceOptions, getSelection('source')],
  getOptionSelectedFunction('source')
);

// BreakBy selectors
const BREAK_BY_OPTIONS = [
  {
    label: `Regions-${METRIC_OPTIONS.ABSOLUTE_VALUE.label}`,
    value: `regions-${METRIC_OPTIONS.ABSOLUTE_VALUE.value}`
  },
  {
    label: `Regions-${METRIC_OPTIONS.PER_CAPITA.label}`,
    value: `regions-${METRIC_OPTIONS.PER_CAPITA.value}`
  },
  {
    label: `Regions-${METRIC_OPTIONS.PER_GDP.label}`,
    value: `regions-${METRIC_OPTIONS.PER_GDP.value}`
  },
  {
    label: 'Sector',
    value: 'sector'
  },
  {
    label: 'Gas',
    value: 'gas'
  }
];

const getBreakByOptions = () => BREAK_BY_OPTIONS;

const getBreakByOptionSelected = createSelector(
  [getBreakByOptions, getSelection('breakBy')],
  getOptionSelectedFunction('breakBy')
);

const getBreakBySelected = createSelector(getBreakByOptionSelected, breakBySelected => {
  if (!breakBySelected) return null;
  const breakByArray = breakBySelected.value.split('-');
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

const getRegionsOptions = createSelector([getRegions], regions => {
  if (!regions) return null;
  const mappedRegions = [TOP_EMITTERS_OPTION];
  regions.forEach(region => {
    const regionMembers = region.members.map(m => m.iso_code3);
    mappedRegions.push({
      label: region.wri_standard_name,
      value: region.iso_code3,
      iso: region.iso_code3,
      expandsTo: regionMembers,
      groupId: 'regions'
    });
  });
  return mappedRegions;
});

const filterOptionsBySource = field =>
  createSelector([getMeta, getSourceSelected], (meta, sourceSelected) => {
    if (isEmpty(meta) || !sourceSelected) return null;
    const fieldOptions = meta[field];
    const sourceValue = sourceSelected.value;
    const sourceMeta = meta.data_source.find(s => String(s.value) === sourceValue);
    const allowedIds = sourceMeta[field];
    return fieldOptions.filter(o => allowedIds.includes(o.value));
  });

const getFieldOptions = field =>
  createSelector([getRegionsOptions, filterOptionsBySource(field)], (regions, filteredOptions) => {
    if (!filteredOptions) return [];
    const fieldOptions = filteredOptions;

    if (field === 'location') {
      if (!regions) return [];
      const countries = [];
      const regionIsos = regions.map(r => r.iso);
      fieldOptions.forEach(d => {
        if (!regionIsos.includes(d.iso)) {
          countries.push({
            ...d,
            value: d.iso,
            groupId: 'countries'
          });
        }
      });
      const sortedRegions = sortLabelByAlpha(regions).sort(x => (x.value === 'TOP' ? -1 : 0));
      return sortedRegions.concat(sortLabelByAlpha(countries));
    }

    return sortLabelByAlpha(fieldOptions);
  });

const getDefaultOptions = createSelector([getSourceSelected, getMeta], (sourceSelected, meta) => {
  if (!sourceSelected || !meta) return null;
  const defaults = getGhgEmissionDefaults(sourceSelected, meta);
  const defaultOptions = {};
  Object.keys(defaults).forEach(key => {
    const keyDefault = String(defaults[key]).split(',');
    defaultOptions[key] = meta[key].filter(
      m =>
        keyDefault.includes(m.iso) ||
        keyDefault.includes(m.label) ||
        keyDefault.includes(String(m.value))
    );
  });
  defaultOptions.location = [TOP_EMITTERS_OPTION];
  return defaultOptions;
});

const getSectorOptions = createSelector([getFieldOptions('sector')], options => {
  if (!options || isEmpty(options)) return null;
  const hasChildren = d => options.some(o => o.parentId === d.value);
  const aggregatesComesFirst = o => (o.groupId === 'aggregations' ? -1 : 0);

  const sectors = options
    .filter(s => !s.parentId)
    .map(d => ({
      label: d.label,
      value: d.value,
      expandsTo: d.aggregatedSectorIds,
      groupParent: hasChildren(d) ? String(d.value) : null,
      groupId: isEmpty(d.aggregatedSectorIds) ? 'sectors' : 'aggregations'
    }))
    .sort(aggregatesComesFirst);

  const subsectors = options.filter(s => s.parentId).map(d => ({
    label: d.label,
    value: d.value,
    group: String(d.parentId),
    groupId: 'sectors'
  }));
  return [...sectors, ...subsectors];
});

const CHART_TYPE_OPTIONS = [
  { label: 'line', value: 'line' },
  { label: 'area', value: 'area' },
  { label: 'percentage', value: 'percentage' }
];

const getChartTypeOptions = () => CHART_TYPE_OPTIONS;

export const getOptions = createStructuredSelector({
  sources: getSourceOptions,
  chartType: getChartTypeOptions,
  breakBy: getBreakByOptions,
  regions: getFieldOptions('location'),
  sectors: getSectorOptions,
  gases: getFieldOptions('gas')
});

const getFiltersSelected = field =>
  createSelector(
    [getOptions, getSelection(field), getDefaultOptions],
    (options, selected, defaults) => {
      const fieldOptions =
        options && (field === 'location' ? options.regions : options[toPlural(field)]);
      if (!defaults) return null;
      if (!selected || !fieldOptions || isEmpty(fieldOptions)) {
        return [...defaults[field]];
      }
      let selectedFilters = [];
      if (selected) {
        const selectedValues = selected.split(',');
        selectedFilters = fieldOptions.filter(
          filter =>
            selectedValues.indexOf(String(filter.value)) !== -1 ||
            selectedValues.indexOf(filter.iso_code3) !== -1
        );
      }

      return selectedFilters;
    }
  );

const getChartTypeSelected = createSelector(
  [getChartTypeOptions, getSelection('chartType')],
  getOptionSelectedFunction('chartType')
);

const getOverlappingConflicts = optionsSelected => {
  if (!optionsSelected || optionsSelected.length <= 1) return [];

  const conflicts = [];
  const overlapsCheckedIds = [];

  optionsSelected.forEach(option => {
    if (option.expandsTo) {
      const overlappingOptions = [];
      optionsSelected.forEach(option2 => {
        if (option2.value === option.value) return;
        if (overlapsCheckedIds.includes(option2.value)) return;

        const expandedOption = [option.value, ...(option.expandsTo || [])].map(String);
        const expandedOption2 = [option2.value, option2.group, ...(option2.expandsTo || [])].map(
          String
        );

        if (intersection(expandedOption, expandedOption2).length > 0) {
          overlappingOptions.push(option2.label);
        }
      });

      if (overlappingOptions.length) {
        conflicts.push(`${option.label} overlaps with ${arrayToSentence(overlappingOptions)}`);
      }

      overlapsCheckedIds.push(option.value);
    }
  });

  return conflicts;
};

const getGasConflicts = gasSelected => {
  const aggregatedGases = ['All GHG', 'Aggregate F-gases', 'Aggregate GHGs'];

  if (!gasSelected || gasSelected.length <= 1) return [];

  const conflicts = [];

  aggregatedGases.forEach(gas => {
    if (gasSelected.some(g => g.label.includes(gas))) {
      conflicts.push(`${gas} option cannot be selected with any other gas`);
    }
  });

  return conflicts;
};

const getChartConflicts = (metricSelected, chartSelected) => {
  const conflicts = [];

  if (['PER_CAPITA', 'PER_GDP'].includes(metricSelected) && chartSelected.value !== 'line') {
    const metricOption = METRIC_OPTIONS[metricSelected];
    conflicts.push(`${metricOption.label} metric is not allowed with ${chartSelected.label} chart`);
  }

  return conflicts;
};

export const getFiltersConflicts = createSelector(
  [
    getFiltersSelected('location'),
    getFiltersSelected('gas'),
    getFiltersSelected('sector'),
    getModelSelected,
    getMetricSelected,
    getChartTypeSelected
  ],
  (
    locationSelected,
    gasSelected,
    sectorsSelected,
    modelSelected,
    metricSelected,
    chartSelected
  ) => {
    let conflicts = [];
    let canChangeBreakByTo = difference(['sector', 'gas', 'regions'], [modelSelected]);
    const solutions = ['Please deselect all conflicting options'];
    const isAggregatedChart = chartSelected.value !== 'line';
    const notBreakBySector = modelSelected !== 'sector';
    const notBreakByGas = modelSelected !== 'gas';
    const notBreakByRegion = modelSelected !== 'regions';

    const sectorConflicts = getOverlappingConflicts(sectorsSelected);
    const regionConflicts = getOverlappingConflicts(locationSelected);
    const gasConflicts = getGasConflicts(gasSelected);
    const chartConflicts = getChartConflicts(metricSelected, chartSelected);

    if (sectorConflicts.length) {
      canChangeBreakByTo = difference(canChangeBreakByTo, ['gas', 'regions']);
    }
    if (regionConflicts.length) {
      canChangeBreakByTo = difference(canChangeBreakByTo, ['sector', 'gas']);
    }
    if (gasConflicts.length) {
      canChangeBreakByTo = difference(canChangeBreakByTo, ['sector', 'regions']);
    }

    if (sectorConflicts.length && (isAggregatedChart || notBreakBySector)) {
      conflicts = conflicts.concat(sectorConflicts);
    }

    if (gasConflicts.length && (isAggregatedChart || notBreakByGas)) {
      conflicts = conflicts.concat(gasConflicts);
    }

    if (regionConflicts.length && (isAggregatedChart || notBreakByRegion)) {
      conflicts = conflicts.concat(regionConflicts);
    }

    conflicts = conflicts.concat(chartConflicts);

    if (conflicts.length && isAggregatedChart) {
      solutions.push('change "Chart Type" to line chart');
    }

    if (canChangeBreakByTo.length) {
      solutions.push(`change "Break by" to ${arrayToSentence(canChangeBreakByTo)}`);
    }

    return {
      conflicts,
      solutionText: uniq(solutions).join(' or ')
    };
  }
);

export const getOptionsSelected = createStructuredSelector({
  sourcesSelected: getSourceSelected,
  regionsSelected: getFiltersSelected('location'),
  sectorsSelected: getFiltersSelected('sector'),
  gasesSelected: getFiltersSelected('gas'),
  breakBySelected: getBreakByOptionSelected,
  chartTypeSelected: getChartTypeSelected
});
