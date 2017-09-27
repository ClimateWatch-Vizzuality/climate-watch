import { createSelector } from 'reselect';
import upperFirst from 'lodash/upperFirst';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import camelCase from 'lodash/camelCase';

const getMetadata = state => state.meta || {};
const getRegions = state => state.regions || [];
const getSourceSelection = state => parseInt(state.search.source, 10) || null;
const getBreakSelection = state => state.search.breakBy || null;
const getFilterSelection = state => state.search.filter || null;
const getMetaFiltered = meta => omit(meta, 'data_source');

// TODO: currently data (specifically PIK) contains an extra value 'gwp' which is vairable for all selectors
// This data needs to be separated, for now we are just rendering one version to prevent child flattening
const getData = state =>
  (state.data ? state.data.filter(d => d.gwp === 'AR2') : []);

// constants needed for data parsing
const DATA_LIMIT = 10;

const colors = [
  '#2D9290',
  '#B25BD0',
  '#7EA759',
  '#FF0D3A',
  '#687AB7',
  '#BC6332',
  '#F97DA1',
  '#00971D',
  '#F1933B',
  '#938126'
];

const breakByOptions = [
  {
    label: 'Sector',
    value: 'sector'
  },
  {
    label: 'Regions',
    value: 'location'
  },
  {
    label: 'Gas',
    value: 'gas'
  }
];

const axesConfig = {
  xBottom: {
    name: 'Year',
    unit: 'date',
    format: 'YYYY'
  },
  yLeft: {
    name: 'Emissions',
    unit: 'CO2e',
    format: 'number'
  }
};

const parseRegions = regions =>
  regions.map(region => ({
    label: region.wri_standard_name,
    value: region.iso_code3
  }));

export const getFilters = createSelector(
  [getMetadata, getRegions],
  (meta, regions) => ({
    ...getMetaFiltered(meta),
    location: parseRegions(regions)
  })
);

function sortLabelByAlpha(array) {
  return array.sort((a, b) => {
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;
    return 0;
  });
}

export const getSourceOptions = createSelector(
  getMetadata,
  meta => meta.data_sources || []
);

export const getSourceSelected = createSelector(
  [getSourceOptions, getSourceSelection],
  (sources, selected) => {
    if (sources.length > 0) {
      if (selected) {
        const filtered = sources.filter(
          category => category.value === selected
        );
        return filtered.length > 0 ? filtered[0] : sources[0];
      }
      return sources[0];
    }
    return {};
  }
);

export const getBreaksByOptions = createSelector(() => breakByOptions);

export const getBreakSelected = createSelector(
  [getBreakSelection],
  selected => {
    if (breakByOptions.length > 0) {
      if (selected) {
        const filtered = breakByOptions.filter(
          category => category.value === selected
        );
        return filtered.length > 0 ? filtered[0] : breakByOptions[0];
      }
      return breakByOptions[0];
    }
    return {};
  }
);

export const getFilterOptions = createSelector(
  [getSourceSelected, getBreakSelected, getMetadata],
  (sourceSelected, breakSelected, meta) => {
    if (!sourceSelected || !breakSelected || isEmpty(meta)) return [];
    const breakByValue = breakSelected.value;
    const activeSourceData = meta.data_sources.find(
      source => source.value === sourceSelected.value
    );
    const activeFilterKeys = activeSourceData[breakByValue];
    let filtersData = [];
    switch (breakByValue) {
      case 'gas':
        filtersData = meta.gases;
        break;
      case 'location':
        filtersData = meta.locations;
        break;
      case 'sector':
        filtersData = meta.sectors;
        break;
      default:
        break;
    }
    const filters = filtersData.filter(
      filter => activeFilterKeys.indexOf(filter.value) > -1
    );
    return sortLabelByAlpha(filters);
  }
);

export const getFiltersSelected = createSelector(
  [getFilterOptions, getFilterSelection],
  (filters, selected) => {
    if (filters.length > 0) {
      const sortedFilters = sortLabelByAlpha(filters);
      const selectedFilters = [];
      const selectedValues = selected
        ? selected.split(',')
        : sortedFilters.map(filter => filter.value);
      selectedValues.forEach((filter, index) => {
        if (index < DATA_LIMIT) {
          const filterData = sortedFilters.find(
            filterOption => filterOption.value === parseInt(filter, 10)
          );
          selectedFilters.push({
            ...filterData,
            column: getYColumnValue(filterData.label)
          });
        }
      });
      return selectedFilters;
    }
    return [];
  }
);

export const getChartData = createSelector(
  [getData, getBreakSelected, getFiltersSelected],
  (data, breakBy, filters) => {
    if (!data || !data.length || !breakBy || !filters) return [];
    const activeFiltersLabels = filters.map(filter => filter.label);
    const xValues = data[0].emissions.length
      ? data[0].emissions.map(d => d.year)
      : [];
    const dataParsed = xValues.map(x => {
      const yItems = {};
      data.forEach(d => {
        // console.log(d);
        if (activeFiltersLabels.indexOf(d[breakBy.value]) > -1) {
          const yKey = getYColumnValue(d[breakBy.value]);
          const yData = d.emissions.find(e => e.year === x);
          yItems[yKey] = yData.value * 1000000;
        }
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

function getThemeConfig(columns) {
  const theme = {};
  columns.forEach((column, index) => {
    theme[column.value] = {
      stroke: colors[index % 10],
      strokeWidth: 5
    };
  });
  return theme;
}

function getTooltipConfig(columns) {
  const tooltip = {};
  columns.forEach(column => {
    tooltip[column.value] = { label: column.label };
  });
  return tooltip;
}

function getYColumnValue(column) {
  return `y${upperFirst(camelCase(column))}`;
}

export const getChartConfig = createSelector(
  [getData, getBreakSelected],
  (data, breakBy) => {
    const yColumns = data.map(d => ({
      label: d[breakBy.value],
      value: getYColumnValue(d[breakBy.value])
    }));
    const theme = getThemeConfig(yColumns);
    const tooltip = getTooltipConfig(yColumns);
    return {
      axes: axesConfig,
      theme,
      tooltip,
      columns: {
        x: [{ label: 'year', value: 'x' }],
        y: yColumns
      }
    };
  }
);

export default {
  getSourceOptions,
  getSourceSelected,
  getBreaksByOptions,
  getBreakSelected,
  getFilterOptions,
  getFiltersSelected
};
