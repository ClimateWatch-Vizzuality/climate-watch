import { createSelector, createStructuredSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import uniqBy from 'lodash/uniqBy';
import union from 'lodash/union';
import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';
import { getGhgEmissionDefaults } from 'utils/ghg-emissions';
import { generateLinkToDataExplorer } from 'utils/data-explorer';
import {
  getYColumnValue,
  getThemeConfig,
  getTooltipConfig,
  sortEmissionsByValue,
  sortLabelByAlpha,
  setChartColors,
  setXAxisDomain,
  setYAxisDomain
} from 'utils/graphs';
import {
  TOP_EMITTERS,
  CHART_COLORS,
  CHART_COLORS_EXTENDED,
  DEFAULT_AXES_CONFIG,
  ALLOWED_SECTORS_BY_SOURCE,
  EXTRA_ALLOWED_SECTORS_BY_SOURCE_ONLY_GLOBAL,
  DEFAULT_EMISSIONS_SELECTIONS,
  DATA_SCALE,
  METRIC_OPTIONS,
  ALL_SELECTED
} from 'data/constants';

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
    label: 'Regions - Per Capita',
    value: `regions-${METRIC_OPTIONS.PER_CAPITA.value}`
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

const groups = [
  {
    groupId: 'regions',
    title: 'Regions'
  },
  {
    groupId: 'countries',
    title: 'Countries'
  }
];

// meta data for selectors
const getData = ({ emissions }) => (emissions && emissions.data) || [];
const getMeta = ({ ghgEmissionsMeta }) =>
  (ghgEmissionsMeta && ghgEmissionsMeta.meta) || null;
const getRegions = ({ regions }) => (regions && regions.data) || null;
const getSources = createSelector(
  getMeta,
  meta => (meta && meta.data_source) || null
);
const getVersions = createSelector(getMeta, meta => (meta && meta.gwp) || null);

// values from search
const getSearch = (state, { search }) => search || null;
const getSelection = field =>
  createSelector(getSearch, search => (search && search[field]) || null);

// Sources selectors
export const getSourceOptions = createSelector(getSources, sources => {
  if (!sources) return null;
  return sources.map(d => ({
    label: d.label,
    value: d.value,
    source: d.source
  }));
});

export const getSourceSelected = createSelector(
  [getSourceOptions, getSelection('source')],
  (sources, selected) => {
    if (!sources) return null;
    if (!selected) return sources[0];
    return sources.find(category => category.value === parseInt(selected, 10));
  }
);

// Versions selectors
export const getVersionOptions = createSelector(
  [getVersions, getSources, getSourceSelected, getData],
  (versions, sources, sourceSelected, data) => {
    if (!sourceSelected || !versions || !data) return null;
    const versionsFromData = groupBy(data, 'gwp');
    return sortBy(
      Object.keys(versionsFromData).map(version => ({
        label: version,
        value: versions.find(versionMeta => version === versionMeta.label).value
      })),
      'label'
    );
  }
);

export const getVersionSelected = createSelector(
  [getVersionOptions, getSelection('version')],
  (versions, selected) => {
    if (!versions) return null;
    if (!selected) return versions[0];
    return (
      versions.find(version => version.value === parseInt(selected, 10)) ||
      versions[0]
    );
  }
);

// BreakBy selectors
export const getBreakByOptions = () => BREAK_BY_OPTIONS;

export const getAllowedSectors = createSelector(
  [getSourceSelected, getVersionSelected],
  (source, version) => {
    if (!source || !version) return null;
    if (source.label === 'UNFCCC') {
      return ALLOWED_SECTORS_BY_SOURCE[source.label][version.label];
    }
    return ALLOWED_SECTORS_BY_SOURCE[source.label].concat(
      EXTRA_ALLOWED_SECTORS_BY_SOURCE_ONLY_GLOBAL[source.label]
    );
  }
);

export const getBreakByOptionSelected = createSelector(
  [getBreakByOptions, getSelection('breakBy')],
  (breaks, selected) => {
    if (!breaks) return null;
    if (!selected) return breaks[0];
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

// Get data and filter and sort by emissions value
export const filterAndSortData = createSelector(
  [
    getData,
    getSourceSelected,
    getVersionSelected,
    getModelSelected,
    getAllowedSectors
  ],
  (data, source, version, model, sectorsAllowed) => {
    if (!data || isEmpty(data) || !source || !version) return null;
    const dataBySource =
      source.label === 'UNFCCC' && model !== 'sector'
        ? data.filter(
          d =>
            d.sector.trim() ===
              DEFAULT_EMISSIONS_SELECTIONS[source.label].sector[version.label]
        )
        : data;
    const dataBySector =
      model === 'sector'
        ? dataBySource.filter(d => sectorsAllowed.indexOf(d.sector.trim()) > -1)
        : dataBySource;
    return sortEmissionsByValue(
      dataBySector.filter(d => d.gwp === version.label)
    );
  }
);

// use filtered data to get top emitters for each region
export const getRegionsOptions = createSelector(
  [getRegions, filterAndSortData],
  (regions, data) => {
    if (!regions || !data) return null;
    const mappedRegions = [
      {
        label: 'Top Emitters',
        value: 'TOP',
        members: TOP_EMITTERS,
        iso: 'TOP',
        groupId: 'regions'
      }
    ];
    regions.forEach(region => {
      const regionMembers = region.members.map(m => m.iso_code3);
      const regionData = data.filter(
        d => regionMembers.indexOf(d.iso_code3) > -1
      );
      const regionIsos = regionData.map(m => m.iso_code3).slice(0, 10);
      if (region.iso_code3 !== 'WORLD') {
        mappedRegions.push({
          label: region.wri_standard_name,
          value: region.iso_code3,
          iso: region.iso_code3,
          members: regionIsos,
          groupId: 'regions'
        });
      }
    });
    return mappedRegions;
  }
);

export const getFieldOptions = field =>
  createSelector(
    [getMeta, getRegionsOptions, filterAndSortData],
    (meta, regions, data) => {
      if (isEmpty(meta) || isEmpty(data) || !regions) {
        return [];
      }
      const filterOptions = Object.keys(groupBy(data, field));
      const filtersSelected = meta[field].filter(
        m => filterOptions.indexOf(m.label) > -1
      );
      if (field === 'location') {
        const countries = filtersSelected.map(d => ({
          ...d,
          value: d.iso,
          groupId: 'countries'
        }));
        return sortLabelByAlpha(union(regions.concat(countries), 'iso'));
      }
      return sortLabelByAlpha(filtersSelected);
    }
  );

export const getFiltersSelected = field =>
  createSelector(
    [getFieldOptions(field), getSelection('filter')],
    (filters, selected) => {
      if (!filters || selected === '') return [];
      if (!selected && field !== 'location') return filters;
      let selectedFilters = [];
      if (field === 'location' && !selected) {
        const selectedValues = TOP_EMITTERS;
        selectedFilters = filters.filter(
          filter => selectedValues.indexOf(filter.value) > -1
        );
      } else {
        const selectedValues = selected.split(',');
        selectedFilters = filters.filter(
          filter => selectedValues.indexOf(`${filter.value}`) > -1
        );
      }
      return selectedFilters;
    }
  );

// get selector defaults
export const getSelectorDefaults = createSelector(
  [getSourceSelected, getMeta],
  (sourceSelected, meta) => {
    if (!sourceSelected || !meta) return null;
    return getGhgEmissionDefaults(sourceSelected.label, meta);
  }
);

const CHART_TYPE_OPTIONS = [
  { label: 'line', value: 'line' },
  { label: 'area', value: 'area' }
];

export const getChartTypeSelected = createSelector(
  [() => CHART_TYPE_OPTIONS, getSelection('chartType')],
  (options, selected) => {
    if (!selected) return options[0];
    return options.find(type => type.value === selected);
  }
);

const getOptions = createStructuredSelector({
  sources: getSourceOptions,
  versions: getVersionOptions,
  chartType: () => CHART_TYPE_OPTIONS,
  breakBy: getBreakByOptions,
  regions: getFieldOptions('location'),
  sectors: getFieldOptions('sector'),
  gases: getFieldOptions('gas')
});

const getOptionsSelected = createStructuredSelector({
  sourcesSelected: getSourceSelected,
  versionsSelected: getVersionSelected,
  chartTypeSelected: getChartTypeSelected,
  breakBySelected: getBreakByOptionSelected,
  regionsSelected: getFiltersSelected('location'),
  sectorsSelected: getFiltersSelected('sector'),
  gasesSelected: getFiltersSelected('gas')
});

// Map the data from the API
const filterData = createSelector(
  [filterAndSortData, getOptionsSelected],
  (data, filters) => {
    if (!data || !data.length || !filters || !filters.length) return null;
    // We have to filter the data for all the values

    // const filterValues = filters.map(filter => filter.label);
    // return data.filter(d => filterValues.indexOf(d[model]) > -1);
    return data;
  }
);

export const getChartData = createSelector(
  [filterData, getModelSelected, getOptionsSelected],
  (data, model, filters) => {
    // DATA: Filter by all options selected and not only model selected
    if (!data || !data.length || !model || !filters) return null;
    const xValues = data[0].emissions.map(d => d.year);
    const dataParsed = xValues.map(x => {
      const yItems = {};
      data.forEach(d => {
        const yKey = getYColumnValue(d[model]);
        const yData = d.emissions.find(e => e.year === x);
        yItems[yKey] = yData.value ? yData.value * DATA_SCALE : null;
      });
      const item = {
        x,
        ...yItems
      };
      return item;
    });
    return dataParsed;
  }
);

export const getChartDomain = createSelector([getChartData], data => {
  if (!data) return null;
  return { x: setXAxisDomain(), y: setYAxisDomain() };
});

// variable that caches chart elements assigned color
// to avoid element color changing when the chart is updated
let colorThemeCache = {};

export const getChartConfig = createSelector(
  [filterData, getModelSelected],
  (data, model) => {
    if (!data || !model) return null;
    const yColumns = data.map(d => ({
      label: d[model],
      value: getYColumnValue(d[model])
    }));
    const yColumnsChecked = uniqBy(yColumns, 'value');
    const chartColors = setChartColors(
      yColumnsChecked.length,
      CHART_COLORS,
      CHART_COLORS_EXTENDED
    );
    const theme = getThemeConfig(yColumnsChecked, chartColors);
    colorThemeCache = { ...theme, ...colorThemeCache };
    const tooltip = getTooltipConfig(yColumnsChecked);
    return {
      axes: DEFAULT_AXES_CONFIG,
      theme: colorThemeCache,
      tooltip,
      animation: false,
      columns: {
        x: [{ label: 'year', value: 'x' }],
        y: yColumnsChecked
      }
    };
  }
);

export const getProviderFilters = createSelector(
  [getSourceSelected, getModelSelected, getSelectorDefaults],
  (sourceSelected, model, selectorDefaults) => {
    if (!sourceSelected || !model) return null;
    const filter = {};
    switch (model) {
      case 'gas':
        filter.location = selectorDefaults.location;
        filter.sector = selectorDefaults.sector;
        break;
      case 'location':
        filter.gas = selectorDefaults.gas;
        filter.sector = selectorDefaults.sector;
        break;
      case 'sector':
        filter.gas = selectorDefaults.gas;
        filter.location = selectorDefaults.location;
        break;
      default:
        break;
    }

    return {
      ...filter,
      source: sourceSelected.value
    };
  }
);

export const getLinkToDataExplorer = createSelector([getSearch], search => {
  const section = 'historical-emissions';
  return generateLinkToDataExplorer(search, section);
});

const getLoading = createSelector(
  [getChartConfig, state => state.ghgEmissionsMeta, state => state.emissions],
  (chartConfig, meta, data) =>
    (meta && meta.loading) || (data && data.loading) || !chartConfig || false
);

const getLegendDataOptions = createSelector(
  [getModelSelected, getOptions],
  (modelSelected, options) => {
    if (!options || !modelSelected || !options[modelSelected]) return null;
    return options[modelSelected];
  }
);

const getLegendDataSelected = createSelector(
  [getModelSelected, getOptions, getOptionsSelected],
  (modelSelected, options, selectedOptions) => {
    if (
      !selectedOptions ||
      !modelSelected ||
      !selectedOptions[modelSelected] ||
      !options
    ) { return null; }

    const dataSelected = selectedOptions[modelSelected];
    if (!isArray(dataSelected)) {
      if (dataSelected.value === ALL_SELECTED) return options[modelSelected];
    }
    return isArray(dataSelected) ? dataSelected : [dataSelected];
  }
);

export const getGHGEmissions = createStructuredSelector({
  data: getChartData,
  domain: getChartDomain,
  config: getChartConfig,
  selectorDefaults: getSelectorDefaults,
  providerFilters: getProviderFilters,
  downloadLink: getLinkToDataExplorer,
  loading: getLoading,
  groups: () => groups,
  search: getSearch,
  options: getOptions,
  legendOptions: getLegendDataOptions,
  legendSelected: getLegendDataSelected,
  selected: getOptionsSelected
});
