import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
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
  DATA_SCALE
} from 'data/constants';

const BREAY_BY_OPTIONS = [
  {
    label: 'Gas',
    value: 'gas'
  },
  {
    label: 'Sector',
    value: 'sector'
  },
  {
    label: 'Regions',
    value: 'location'
  }
];

// meta data for selectors
const getMeta = state => state.meta || null;
const getSources = state => (state.meta && state.meta.data_source) || null;
const getRegions = state => state.regions || null;
const getVersions = state => (state.meta && state.meta.gwp) || null;

// values from search
const getSearch = state => state.search || null;
const getSourceSelection = state => state.search.source || null;
const getVersionSelection = state => state.search.version || null;
const getBreakSelection = state => state.search.breakBy || null;
const getFilterSelection = state => state.search.filter;

// data for the graph
const getData = state => state.data || [];

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
  [getSourceOptions, getSourceSelection],
  (sources, selected) => {
    if (!sources) return null;
    if (!selected) {
      const defaultSource = sources.find(s => s.label === 'UNFCCC');
      return defaultSource || sources[0];
    }
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
  [getVersionOptions, getVersionSelection],
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
export const getBreaksByOptions = () => BREAY_BY_OPTIONS;

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

export const getBreakSelected = createSelector(
  [getBreaksByOptions, getBreakSelection],
  (breaks, selected) => {
    if (!breaks) return null;
    if (!selected) {
      const defaultBreak = breaks.find(b => b.value === 'location');
      return defaultBreak || breaks[0];
    }
    return breaks.find(category => category.value === selected);
  }
);

// Get data and filter and sort by emissions value
export const filterAndSortData = createSelector(
  [
    getData,
    getSourceSelected,
    getVersionSelected,
    getBreakSelected,
    getAllowedSectors
  ],
  (data, source, version, breakBy, sectorsAllowed) => {
    if (!data || isEmpty(data)) return null;
    const breakByValue = breakBy.value;
    const dataBySource =
      source.label === 'UNFCCC' && breakByValue !== 'sector'
        ? data.filter(
          d =>
            d.sector.trim() ===
              DEFAULT_EMISSIONS_SELECTIONS[source.label].sector[version.label]
        )
        : data;
    const dataBySector =
      breakByValue === 'sector'
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

// Filters selector
export const getFilterOptions = createSelector(
  [
    getMeta,
    getBreakSelected,
    getRegionsOptions,
    filterAndSortData,
    getAllowedSectors
  ],
  (meta, breakSelected, regions, data) => {
    if (isEmpty(meta) || isEmpty(data) || !breakSelected || !regions) {
      return [];
    }
    const breakByValue = breakSelected.value;
    const filterOptions = Object.keys(groupBy(data, breakByValue));
    const filtersSelected = meta[breakByValue].filter(
      m => filterOptions.indexOf(m.label) > -1
    );
    if (breakByValue === 'location') {
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

export const getFiltersSelected = createSelector(
  [getFilterOptions, getFilterSelection, getBreakSelected],
  (filters, selected, breakBy) => {
    if (!filters || selected === '') return [];
    if (!selected && breakBy.value !== 'location') return filters;
    let selectedFilters = [];
    if (breakBy.value === 'location' && !selected) {
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

export const getActiveFilterRegion = createSelector(
  [getFiltersSelected],
  filters => {
    if (!filters) return null;
    return filters.find(f => f.groupId === 'regions');
  }
);

// Map the data from the API
export const filterData = createSelector(
  [filterAndSortData, getFiltersSelected, getBreakSelected],
  (data, filters, breakBy) => {
    if (!data || !data.length || !filters || !filters.length) return null;
    const filterValues = filters.map(filter => filter.label);
    return data.filter(d => filterValues.indexOf(d[breakBy.value]) > -1);
  }
);

export const getChartData = createSelector(
  [filterData, getBreakSelected, getFiltersSelected],
  (data, breakBy, filters) => {
    if (!data || !data.length || !breakBy || !filters) return null;
    const xValues = data[0].emissions.map(d => d.year);
    const dataParsed = xValues.map(x => {
      const yItems = {};
      data.forEach(d => {
        const yKey = getYColumnValue(d[breakBy.value]);
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
  [filterData, getBreakSelected],
  (data, breakBy) => {
    if (!data || !breakBy) return null;
    const yColumns = data.map(d => ({
      label: d[breakBy.value],
      value: getYColumnValue(d[breakBy.value])
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
  [getSourceSelected, getBreakSelected, getSelectorDefaults],
  (sourceSelected, breakSelected, selectorDefaults) => {
    if (!sourceSelected || !breakSelected) return null;
    const filter = {};
    switch (breakSelected.value) {
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

export default {
  getSourceOptions,
  getSourceSelected,
  getBreaksByOptions,
  getBreakSelected,
  getFilterOptions,
  getFiltersSelected,
  getProviderFilters,
  getActiveFilterRegion
};
