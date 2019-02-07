import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';
import isEqual from 'lodash/isEqual';
import { getGhgEmissionDefaults, toPlural } from 'utils/ghg-emissions';
import { sortEmissionsByValue, sortLabelByAlpha } from 'utils/graphs';
import { TOP_EMITTERS_OPTION, METRIC_OPTIONS } from 'data/constants';
import {
  getData,
  getMeta,
  getRegions,
  getSources,
  getSelection
} from './ghg-emissions-selectors-get';

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
  (sources, selected) => {
    if (!sources) return null;
    if (!selected) return sources[0];
    return sources.find(source => String(source.value) === selected);
  }
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
  (breaks, selected) => {
    if (!breaks) return null;
    if (!selected) {
      const defaultBreak = breaks.find(b => b.value === 'location');
      return defaultBreak || breaks[0];
    }
    return breaks.find(category => category.value === selected);
  }
);

const getBreakBySelected = createSelector(
  getBreakByOptionSelected,
  breakBySelected => {
    if (!breakBySelected) return null;
    const breakByArray = breakBySelected.value.split('-');
    return { modelSelected: breakByArray[0], metricSelected: breakByArray[1] };
  }
);

export const getModelSelected = createSelector(
  getBreakBySelected,
  breakBySelected => (breakBySelected && breakBySelected.modelSelected) || null
);
export const getMetricSelected = createSelector(
  getBreakBySelected,
  breakBySelected => (breakBySelected && breakBySelected.metricSelected) || null
);

export const sortData = createSelector(getData, data => {
  if (!data || isEmpty(data)) return null;
  return sortEmissionsByValue(data);
});

const getRegionsOptions = createSelector([getRegions], regions => {
  if (!regions) return null;
  const mappedRegions = [TOP_EMITTERS_OPTION];
  regions.forEach(region => {
    const regionMembers = region.members.map(m => m.iso_code3);
    if (region.iso_code3 !== 'WORLD') {
      mappedRegions.push({
        label: region.wri_standard_name,
        value: region.iso_code3,
        iso: region.iso_code3,
        members: regionMembers,
        groupId: 'regions'
      });
    }
  });
  return mappedRegions;
});

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
  createSelector(
    [getRegionsOptions, filterOptionsBySource(field)],
    (regions, filteredOptions) => {
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
        const sortedRegions = sortLabelByAlpha(regions).sort(
          x => (x.value === 'TOP' ? -1 : 0)
        );
        return sortedRegions.concat(sortLabelByAlpha(countries));
      }

      return sortLabelByAlpha(fieldOptions);
    }
  );

const getDefaultOptions = createSelector(
  [getSourceSelected, getMeta],
  (sourceSelected, meta) => {
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
  }
);

const getSectorOptions = createSelector(
  [getFieldOptions('sector')],
  options => {
    if (!options || isEmpty(options)) return null;
    const hasChildren = d => options.some(o => o.parentId === d.value);
    const sectors = options.filter(s => !s.parentId).map(d => ({
      label: d.label,
      value: d.value,
      groupParent: hasChildren(d) && String(d.value)
    }));

    const subsectors = options.filter(s => s.parentId).map(d => ({
      label: d.label,
      value: d.value,
      group: String(d.parentId)
    }));
    return [...sectors, ...subsectors];
  }
);

const countriesSelectedFromRegions = regionsSelected => {
  let regionCountriesSelected = [];
  regionsSelected.forEach(r => {
    if (r.members) {
      regionCountriesSelected = regionCountriesSelected.concat(r.members);
    } else regionCountriesSelected.push(r.iso);
  });
  return regionCountriesSelected;
};

const CHART_TYPE_OPTIONS = [
  { label: 'line', value: 'line' },
  { label: 'area', value: 'area' },
  { label: 'percentage', value: 'percentage' }
];

export const getOptions = createStructuredSelector({
  sources: getSourceOptions,
  chartType: () => CHART_TYPE_OPTIONS,
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
        options &&
        (field === 'location' ? options.regions : options[toPlural(field)]);
      if (!defaults) return null;
      if (!selected || !fieldOptions || isEmpty(fieldOptions)) {
        return defaults[field];
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

export const getLegendDataOptions = createSelector(
  [getModelSelected, getOptions],
  (modelSelected, options) => {
    if (!options || !modelSelected || !options[toPlural(modelSelected)]) {
      return null;
    }
    return options[toPlural(modelSelected)];
  }
);

export const getDisableAccumulatedCharts = createSelector(
  [
    getOptions,
    getSelection('location'),
    getFiltersSelected('gas'),
    getFiltersSelected('sector')
  ],
  (options, locationSelected, gasSelected, sectorsSelected) => {
    const { regions: locationOptions } = options || {};
    const conflicts = {};
    if (sectorsSelected && sectorsSelected.length > 1) {
      const parentIds = [];
      sectorsSelected.forEach(s => s.group && parentIds.push(s.group));
      if (sectorsSelected.some(s => parentIds.includes(String(s.value)))) { conflicts.sector = true; }
    }
    if (
      gasSelected &&
      gasSelected.length > 1 &&
      gasSelected.some(g => g.label === 'All GHG')
    ) { conflicts.gas = true; }
    if (locationOptions && locationOptions.length && locationSelected) {
      const selectedLocations = locationSelected.split(',');
      const locationOptionsSelected = locationOptions.filter(location =>
        selectedLocations.includes(location.iso)
      );
      const countriesSelected = countriesSelectedFromRegions(
        locationOptionsSelected
      );
      if (!isEqual(countriesSelected, uniq(countriesSelected))) { conflicts.region = true; }
    }
    return conflicts;
  }
);

const getChartTypeSelected = createSelector(
  [
    () => CHART_TYPE_OPTIONS,
    getSelection('chartType'),
    getDisableAccumulatedCharts
  ],
  (options, selected, disableAccumulatedCharts) => {
    if (!selected || !isEmpty(disableAccumulatedCharts)) return options[0];
    return options.find(type => type.value === selected);
  }
);

export const getOptionsSelected = createStructuredSelector({
  sourcesSelected: getSourceSelected,
  chartTypeSelected: getChartTypeSelected,
  breakBySelected: getBreakByOptionSelected,
  regionsSelected: getFiltersSelected('location'),
  sectorsSelected: getFiltersSelected('sector'),
  gasesSelected: getFiltersSelected('gas')
});
