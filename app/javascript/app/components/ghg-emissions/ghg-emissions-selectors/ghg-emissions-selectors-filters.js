import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import uniq from 'lodash/uniq';
import isEqual from 'lodash/isEqual';
import { getGhgEmissionDefaults, toPlural } from 'utils/ghg-emissions';
import { sortEmissionsByValue, sortLabelByAlpha } from 'utils/graphs';
import {
  ALLOWED_SECTORS_BY_SOURCE,
  EXTRA_ALLOWED_SECTORS_BY_SOURCE_ONLY_GLOBAL,
  ALL_SELECTED,
  ALL_SELECTED_OPTION,
  TOP_EMITTERS_OPTION,
  METRIC_OPTIONS
} from 'data/constants';
import {
  getData,
  getMeta,
  getRegions,
  getSources,
  getVersions,
  getSelection
} from './ghg-emissions-selectors-get';

// Sources selectors
const getSourceOptions = createSelector(
  [getSources, getVersions, getData],
  (sources, versions, data) => {
    if (!sources || !versions || !data) return null;
    const sourceOptionsTemplate = [
      { source: 'CAIT', version: 'AR2' },
      { source: 'PIK', version: 'AR2' },
      { source: 'PIK', version: 'AR4' },
      { source: 'UNFCCC', version: 'AR2' },
      { source: 'UNFCCC', version: 'AR4' }
    ];

    return sourceOptionsTemplate.map(template => {
      const sourceValue = sources.find(
        sourceMeta => template.source === sourceMeta.label
      ).value;
      const versionValue = versions.find(
        versionMeta => template.version === versionMeta.label
      ).value;
      return {
        label: `${template.source}-${template.version}`,
        value: `${sourceValue}-${versionValue}`
      };
    });
  }
);

const getSourceSelected = createSelector(
  [getSourceOptions, getSelection('source')],
  (sources, selected) => {
    if (!sources) return null;
    if (!selected) return sources[0];
    return sources.find(source => source.value === selected);
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

const getAllowedSectors = createSelector([getSourceSelected], source => {
  if (!source) return null;
  const sourceLabel = source.label.split('-')[0];
  const versionLabel = source.label.split('-')[1];
  const allowedSectors = ALLOWED_SECTORS_BY_SOURCE[sourceLabel];
  if (sourceLabel === 'UNFCCC') {
    return allowedSectors[versionLabel];
  }
  const extraGlobalSectors =
    EXTRA_ALLOWED_SECTORS_BY_SOURCE_ONLY_GLOBAL[sourceLabel];
  return extraGlobalSectors
    ? allowedSectors.concat(extraGlobalSectors)
    : allowedSectors;
});

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
    if (isEmpty(meta)) return null;
    const fieldOptions = meta[field];
    const sourceValue = sourceSelected.value.split('-')[0];
    const sourceMeta = meta.data_source.find(
      s => String(s.value) === sourceValue
    );
    const allowedIds = sourceMeta[field];
    return fieldOptions.filter(o => allowedIds.includes(o.value));
  });

const getFieldOptions = field =>
  createSelector(
    [getMeta, getRegionsOptions, filterOptionsBySource(field)],
    (meta, regions, filteredOptions) => {
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
    const defaults = getGhgEmissionDefaults(
      sourceSelected.label.split('-')[0],
      meta
    );
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
  [getFieldOptions('sector'), getAllowedSectors, getMeta],
  (options, allowedOptions, meta) => {
    if (!options || isEmpty(options)) return null;
    const { sector: metaSectors } = meta;
    const allowedSectorLabels = [];
    options.forEach(o => {
      if (allowedOptions.includes(o.label)) {
        allowedSectorLabels.push(o.label);
      }
    });

    const sectors = metaSectors.filter(s => !s.parentId).map(d => ({
      label: d.label,
      value: d.value,
      groupParent: String(d.value)
    }));

    const subsectors = metaSectors.filter(s => s.parentId).map(d => ({
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

export const getDisableAccumulatedCharts = createSelector(
  [getFieldOptions('location'), getSelection('location')],
  (locationOptions, locationSelected) => {
    if (!locationOptions.length || !locationSelected) return false;
    const selectedLocations = locationSelected.split(',');
    const locationOptionsSelected = locationOptions.filter(location =>
      selectedLocations.includes(location.iso)
    );
    const countriesSelected = countriesSelectedFromRegions(
      locationOptionsSelected
    );
    return !isEqual(countriesSelected, uniq(countriesSelected));
  }
);

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
        if (selected === ALL_SELECTED) selectedFilters = [ALL_SELECTED_OPTION];
        else {
          const selectedValues = selected.split(',');
          selectedFilters = fieldOptions.filter(
            filter =>
              selectedValues.indexOf(String(filter.value)) !== -1 ||
              selectedValues.indexOf(filter.iso_code3) !== -1
          );
        }
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

const getChartTypeSelected = createSelector(
  [
    () => CHART_TYPE_OPTIONS,
    getSelection('chartType'),
    getDisableAccumulatedCharts
  ],
  (options, selected, disableAccumulatedCharts) => {
    if (!selected || disableAccumulatedCharts) return options[0];
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
