import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { useSlug } from 'utils';
import {
  getGhgEmissionDefaultSlugs,
  toPlural,
  replaceSubscript
} from 'utils/ghg-emissions';
import { sortLabelByAlpha } from 'utils/graphs';
import {
  GAS_AGGREGATES,
  TOP_EMITTERS_OPTION,
  GHG_CALCULATION_OPTIONS
} from 'data/constants';
import {
  getMeta,
  getRegions,
  getSources,
  getSelection
} from './ghg-emissions-selectors-get';

const DEFAULTS = {
  breakBy: 'regions',
  calculation: GHG_CALCULATION_OPTIONS.ABSOLUTE_VALUE.value
};

const getOptionSelectedFunction = filter => (options, selected) => {
  if (!options) return null;
  if (!selected) {
    const defaultOption = options.find(b => b.value === DEFAULTS[filter]);
    return defaultOption || options[0];
  }

  if (filter === 'breakBy') {
    return options.find(
      o => o.value === selected || selected.startsWith(o.value) // to support legacy URL
    );
  }

  return options.find(o => o.value === selected || o.name === selected);
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

// Calculation selectors
const getCalculationOptions = () =>
  Object.keys(GHG_CALCULATION_OPTIONS).reduce(
    (acc, key) =>
      acc.concat({
        label: GHG_CALCULATION_OPTIONS[key].label,
        value: GHG_CALCULATION_OPTIONS[key].value
      }),
    []
  );

// BreakBy selectors
const breakByOptions = [
  {
    label: 'Countries',
    value: 'countries'
  },
  {
    label: 'Regions',
    value: 'regions'
  },
  {
    label: 'Sectors',
    value: 'sector'
  },
  {
    label: 'Gases',
    value: 'gas'
  }
];

const getBreakByOptions = () => breakByOptions;

// Filtered calculation selectors
const getFilteredCalculationOptions = createSelector(
  [getCalculationOptions, getSourceSelected],
  (calculationOptions, sourceSelected) => {
    if (!calculationOptions || !sourceSelected) return null;
    if (sourceSelected.name === 'UNFCCC_NAI') {
      return calculationOptions.filter(
        ({ value }) => value !== GHG_CALCULATION_OPTIONS.CUMULATIVE.value
      );
    }
    return calculationOptions;
  }
);

export const getCalculationSelected = createSelector(
  [
    getFilteredCalculationOptions,
    getSelection('calculation'),
    getSelection('breakBy')
  ],
  (options, selected, breakBySelected) => {
    if (!options) return null;
    const defaultOption = options.find(
      ({ value }) => value === DEFAULTS.calculation
    );
    if (!selected) {
      const breakByArray = breakBySelected && breakBySelected.split('-');
      if (breakByArray && breakByArray[1]) {
        return options.find(
          o => o.value === breakByArray[1] // to support legacy URLs
        );
      }
      return defaultOption || options[0];
    }
    const selectedCalculation = options.find(o => o.value === selected);
    return selectedCalculation || defaultOption;
  }
);

export const getBreakByOptionSelected = createSelector(
  [getBreakByOptions, getSelection('breakBy')],
  getOptionSelectedFunction('breakBy')
);

const getBreakBySelected = createSelector(
  [getBreakByOptionSelected],
  breakBySelected => {
    if (!breakBySelected) return null;
    const selected = breakBySelected.value.split('-')[0];
    const isRegions = selected === 'regions';
    return {
      modelSelected: ['countries', 'regions'].includes(selected)
        ? 'regions'
        : selected,
      isRegions
    };
  }
);

export const getModelSelected = createSelector(
  getBreakBySelected,
  breakBySelected => (breakBySelected && breakBySelected.modelSelected) || null
);
export const getMetricSelected = createSelector(
  [getCalculationSelected],
  calculationSelected =>
    (calculationSelected && calculationSelected.value) || null
);
export const getIsRegionAggregated = createSelector(
  getBreakBySelected,
  breakBySelected => (breakBySelected && breakBySelected.isRegions) || null
);

const filterOptionsBySource = field =>
  createSelector([getMeta, getSourceSelected], (meta, sourceSelected) => {
    if (isEmpty(meta) || !sourceSelected) return null;
    const fieldOptions = meta[field];
    const sourceValue = sourceSelected.value;
    const sourceMeta = meta.data_source.find(
      s => String(s.value) === sourceValue
    );
    const allowedIds = sourceMeta[field];
    return fieldOptions.filter(o => allowedIds.includes(o.value));
  });

const getFieldOptions = field =>
  createSelector([filterOptionsBySource(field)], filteredOptions => {
    if (!filteredOptions) return [];
    const fieldOptions = filteredOptions;
    return sortLabelByAlpha(fieldOptions);
  });

const getRegionOptions = createSelector(
  [getRegions, getSourceSelected, getFieldOptions('location')],
  (regions, sourceSelected, options) => {
    if (!regions || !sourceSelected) return null;

    const regionOptions = [TOP_EMITTERS_OPTION];
    regions.forEach(region => {
      if (
        (sourceSelected.name.startsWith('UNFCCC') &&
          region.iso_code3 === 'WORLD') ||
        !region.ghg_sources ||
        !region.ghg_sources.includes(sourceSelected.name)
      ) {
        return;
      }
      const regionMembers = region.members.map(m => m.iso_code3);
      regionOptions.push({
        label: region.wri_standard_name,
        value: region.iso_code3,
        iso: region.iso_code3,
        expandsTo: regionMembers,
        regionCountries: region.members
          .filter(m => m.ghg_sources.includes(sourceSelected.name))
          .map(country => ({
            label: country.wri_standard_name,
            iso: country.iso_code3
          })),
        groupId: 'regions'
      });
    });

    const countryOptions = [];
    const regionISOs = regionOptions.map(r => r.iso);

    options.forEach(d => {
      if (!regionISOs.includes(d.iso)) {
        countryOptions.push({
          ...d,
          value: d.iso,
          groupId: 'countries'
        });
      }
    });
    const sortedRegions = sortLabelByAlpha(regionOptions).sort(x =>
      (x.value === 'TOP' ? -1 : 0)
    );
    return sortedRegions.concat(sortLabelByAlpha(countryOptions));
  }
);

const getSectorOptions = createSelector(
  [getFieldOptions('sector')],
  options => {
    if (!options || isEmpty(options)) return null;
    const hasChildren = d => options.some(o => o.parentId === d.value);
    const aggregatesComesFirst = o => (o.groupId === 'totals' ? -1 : 0);

    const sectors = options
      .filter(s => !s.parentId)
      .map(d => ({
        label: d.label,
        value: d.value,
        expandsTo: d.aggregatedSectorIds,
        groupParent: hasChildren(d) ? String(d.value) : null,
        optGroup: isEmpty(d.aggregatedSectorIds) ? 'sectors' : 'totals'
      }))
      .sort(aggregatesComesFirst);

    const subsectors = options
      .filter(s => s.parentId)
      .map(d => ({
        label: d.label,
        value: d.value,
        group: String(d.parentId)
      }));
    return [...sectors, ...subsectors];
  }
);

const getGasOptions = createSelector([getFieldOptions('gas')], options => {
  if (!options) return [];
  const valueByLabel = g =>
    (options.find(opt => replaceSubscript(opt.label) === g) || {}).value;

  return options.map(o => ({
    ...o,
    expandsTo:
      GAS_AGGREGATES[o.label] &&
      GAS_AGGREGATES[o.label].map(valueByLabel).filter(v => v)
  }));
});

const CHART_TYPE_OPTIONS = [
  { label: 'Line chart', value: 'line' },
  { label: 'Stacked area Chart', value: 'area' },
  { label: '100% stacked area chart', value: 'percentage' }
];

const getChartTypeOptions = () => CHART_TYPE_OPTIONS;

export const getOptions = createStructuredSelector({
  sources: getSourceOptions,
  chartType: getChartTypeOptions,
  breakBy: getBreakByOptions,
  calculation: getFilteredCalculationOptions,
  regions: getRegionOptions,
  sectors: getSectorOptions,
  gases: getGasOptions
});

const getDefaults = createSelector(
  [getSourceSelected, getMeta],
  (sourceSelected, meta) => {
    if (!sourceSelected || !meta) return null;
    return getGhgEmissionDefaultSlugs(sourceSelected, meta);
  }
);

const isIncluded = (field, selectedValues, filter) => {
  const slugIncluded = selectedValues.includes(useSlug(filter.label));
  const valueOrIsoInclude =
    selectedValues.includes(String(filter.value)) ||
    selectedValues.includes(filter.iso_code3);

  return {
    location: valueOrIsoInclude,
    gas: slugIncluded,
    sector: slugIncluded
  }[field];
};

export const getFiltersSelected = field =>
  createSelector(
    [getOptions, getSelection(field), getDefaults],
    (options, selected, defaults) => {
      if (!options || !defaults) return null;
      const fieldOptions =
        field === 'location' ? options.regions : options[toPlural(field)];
      const defaultSelection =
        defaults && defaults[field] && String(defaults[field]);

      // empty filter selected deliberately
      if (selected === '') return [];
      const selection = selected || defaultSelection;
      let selectedFilters = [];
      if (selection) {
        const selectedValues = selection.split(',');
        selectedFilters = fieldOptions.filter(filter =>
          isIncluded(field, selectedValues, filter)
        );
      }
      return selectedFilters;
    }
  );

export const getChartTypeSelected = createSelector(
  [getChartTypeOptions, getSelection('chartType')],
  getOptionSelectedFunction('chartType')
);

export const getOptionsSelected = createStructuredSelector({
  sourcesSelected: getSourceSelected,
  regionsSelected: getFiltersSelected('location'),
  sectorsSelected: getFiltersSelected('sector'),
  gasesSelected: getFiltersSelected('gas'),
  breakBySelected: getBreakByOptionSelected,
  calculationSelected: getCalculationSelected,
  chartTypeSelected: getChartTypeSelected
});
