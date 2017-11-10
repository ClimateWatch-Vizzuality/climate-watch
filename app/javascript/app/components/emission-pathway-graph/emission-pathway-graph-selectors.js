import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import uniqBy from 'lodash/uniqBy';
import groupBy from 'lodash/groupBy';
import {
  getYColumnValue,
  getThemeConfig,
  getTooltipConfig
} from 'utils/graphs';

// constants needed for data parsing
const COLORS = [
  '#2D9290',
  '#B25BD0',
  '#7EA759',
  '#FF0D3A',
  '#687AB7',
  '#BC6332',
  '#F97DA1',
  '#00971D',
  '#F1933B',
  '#938126',
  '#2D9290',
  '#B25BD0',
  '#7EA759'
];

const AXES_CONFIG = {
  xBottom: {
    name: 'Year',
    unit: 'date',
    format: 'YYYY'
  },
  yLeft: {
    name: 'Emissions',
    unit: 'CO<sub>2</sub>e',
    format: 'number'
  }
};

// meta data for selectors
const getLocations = state => state.locations || null;
const getLocation = state => state.location || null;
const getScenario = state => state.scenario || '31,32,33';

// data for the graph
const getData = state => state.data || null;

export const getLocationsOptions = createSelector([getLocations], locations => {
  if (!locations) return null;
  return locations.map(l => ({
    label: l.name,
    value: l.iso_code,
    id: l.id
  }));
});

export const getLocationSelected = createSelector(
  [getLocationsOptions, getLocation],
  (locations, locationSelected) => {
    if (!locations) return null;
    if (!locationSelected) return locations[0];
    return locations.find(l => locationSelected === l.value);
  }
);

// Map the data from the API
export const getScenarioSelected = createSelector(
  [getScenario],
  locationSelected => {
    if (!locationSelected) return null;
    return locationSelected;
  }
);

// Map the data from the API
export const filterData = createSelector([getData], data => {
  if (!data || isEmpty(data)) return null;
  return data;
});

export const getChartData = createSelector([filterData], data => {
  if (!data) return null;
  const groupByYear = groupBy(data, 'year');
  const xValues = Object.keys(groupByYear);
  const dataMapped = [];
  xValues.forEach(x => {
    const yValues = {};
    const groupedByScenario = groupBy(groupByYear[x], 'scenario_id');
    Object.keys(groupedByScenario).forEach(i => {
      yValues[`y${i}`] = parseInt(groupedByScenario[i][0].value, 10);
    });
    dataMapped.push({
      x,
      ...yValues
    });
  });
  return dataMapped;
});

export const getChartConfig = createSelector([filterData], data => {
  if (!data) return null;
  const yColumns = data.map(d => ({
    label: d.scenario_id,
    value: getYColumnValue(d.scenario_id)
  }));
  const yColumnsChecked = uniqBy(yColumns, 'value');
  const theme = getThemeConfig(yColumnsChecked, COLORS);
  const tooltip = getTooltipConfig(yColumnsChecked);
  return {
    axes: AXES_CONFIG,
    theme,
    tooltip,
    columns: {
      x: [{ label: 'year', value: 'x' }],
      y: yColumnsChecked
    }
  };
});

export default {
  getChartData,
  getChartConfig,
  getLocationsOptions,
  getLocationSelected
};
