import { createSelector } from 'reselect';
import upperFirst from 'lodash/upperFirst';
import omit from 'lodash/omit';
import camelCase from 'lodash/camelCase';

const getData = state => state.data || [];
const getMetadata = state => state.meta || {};
const getRegions = state => state.regions || [];
const getSourceSelection = state => parseInt(state.search.source, 10) || null;
const getBreakSelection = state => state.search.breakBy || null;
const getFilterSelection = state => state.search.filter || null;
const getMetaFiltered = meta => omit(meta, 'data_source');

const lineColors = [
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

export const getSourceOptions = createSelector(
  getMetadata,
  meta => meta.data_source || []
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

function sortLabelByAlpha(array) {
  return array.sort((a, b) => {
    if (a.label < b.label) return -1;
    if (a.label > b.label) return 1;
    return 0;
  });
}

export const getBreaksByOptions = createSelector(getMetadata, meta => {
  const breakByOptions = sortLabelByAlpha(
    Object.keys(getMetaFiltered(meta)).map(other => ({
      label: upperFirst(other),
      value: other,
      id: other
    }))
  );
  const regionBreak = {
    label: 'Regions',
    value: 'location'
  };
  return [regionBreak, ...breakByOptions];
});

export const getBreakSelected = createSelector(
  [getBreaksByOptions, getBreakSelection],
  (breaks, selected) => {
    if (breaks.length > 0) {
      if (selected) {
        const filtered = breaks.filter(category => category.value === selected);
        return filtered.length > 0 ? filtered[0] : breaks[0];
      }
      return breaks[0];
    }
    return {};
  }
);

export const getFilterOptions = createSelector(
  [getBreakSelected, getFilters],
  (breakSelected, filters) => filters[breakSelected.value] || []
);

export const getFiltersSelected = createSelector(
  [getFilterOptions, getFilterSelection],
  (filters, selected) => {
    if (filters.length > 0) {
      if (selected) {
        const selectedFilters = [];
        selected.split(',').forEach(filter => {
          selectedFilters.push(
            filters.find(
              filterOption => filterOption.value === parseInt(filter, 10)
            )
          );
        });
        return selectedFilters;
      }
      return filters;
    }
    return [];
  }
);

export const getChartData = createSelector(
  [getData, getBreakSelected],
  (data, breakBy) => {
    if (!data || !data.length) return [];

    const xValues = data[0].emissions.length
      ? data[0].emissions.map(d => d.year)
      : [];
    const dataParsed = xValues.map(x => {
      const yItems = {};
      data.forEach(d => {
        const yKey = getYColumnValue(d[breakBy.value]);
        const yData = d.emissions.find(e => e.year === x);
        yItems[yKey] = yData.value * 1000000;
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

function getThemeConfig(columns) {
  const theme = {};
  columns.forEach((column, index) => {
    theme[column.value] = {
      stroke: lineColors[index],
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
