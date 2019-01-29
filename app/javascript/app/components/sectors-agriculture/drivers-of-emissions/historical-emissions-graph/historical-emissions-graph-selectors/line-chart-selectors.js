import { createSelector } from 'reselect';
import qs from 'query-string';
import { uniqBy } from 'lodash';
import {
  getYColumnValue,
  getThemeConfig,
  getTooltipConfig,
  setChartColors
} from 'utils/graphs';
import {
  CHART_COLORS,
  CHART_COLORS_EXTENDED,
  DEFAULT_AXES_CONFIG
} from 'data/constants';

const API_SCALE = 0.001; // converting from Gigagrams to Megatonnes ( 1 Gg = 0.001 Mt)

const getSourceSelection = state =>
  (state.location && state.location.search) || null;
const getAgricultureEmissionsData = state =>
  (state.agricultureEmissions && state.agricultureEmissions.data) || null;

/** LINE CHART SELECTORS */
export const getAgricultureEmissionTypes = createSelector(
  [getAgricultureEmissionsData],
  data => {
    if (!data) return null;
    const emissionTypes = data
      .map(({ emission_subcategory: { category_name, category_id } }) => ({
        label: category_name,
        value: `${category_id}`
      }))
      .filter(({ label }) => label);
    return uniqBy(emissionTypes, 'value');
  }
);

export const getEmissionTypeSelected = createSelector(
  [getSourceSelection, getAgricultureEmissionTypes],
  (selectedEmissionOption, emissionTypes) => {
    if (!emissionTypes) return null;
    if (!selectedEmissionOption) {
      const defaultEmissionType = emissionTypes.find(
        ({ value }) => value === 1
      );
      return defaultEmissionType || emissionTypes[0];
    }
    const { emissionType } = qs.parse(selectedEmissionOption);
    const selectedEmissionType = emissionTypes.find(
      ({ value }) => value === emissionType
    );
    return selectedEmissionType || emissionTypes[0];
  }
);

const filterByEmissionType = createSelector(
  [getAgricultureEmissionsData, getEmissionTypeSelected],
  (data, emissionType) => {
    if (!data || !emissionType) return null;
    return data.filter(
      ({ emission_subcategory: { category_id } }) =>
        `${category_id}` === emissionType.value
    );
  }
);

const getYColumns = createSelector([filterByEmissionType], data => {
  if (!data || !data.length) return null;
  const yColumns = data
    .map(({ emission_subcategory: { name } }) => ({
      label: name,
      value: getYColumnValue(name)
    }))
    .filter(y => y !== 'x');
  const yUniqColumns = uniqBy(yColumns, 'value');
  return yUniqColumns;
});

export const getFilterOptions = createSelector([getYColumns], yColumns => {
  if (!yColumns) return null;
  return yColumns.map(column => ({ ...column, groupId: 'subSectors' }));
});

export const getFiltersSelected = createSelector(
  [getSourceSelection, getFilterOptions],
  (search, filters) => {
    if (!filters || !filters.length) return null;
    if (!search) return filters;
    const { filter } = qs.parse(search);
    const filtersValues = filters.map(({ value }) => value);
    const subCategoriesSelected =
      (filter && filter.split(',')) || filtersValues;
    const filtersSelected = filters.filter(({ value }) =>
      subCategoriesSelected.includes(value)
    );
    return filtersSelected;
  }
);

// const getYColumnsSelected = createSelector(
//   [getFiltersSelected],
//   filtersSelected => {
//     if (!filtersSelected || !filtersSelected.length) return null;
//     return filtersSelected.map(({ value }) => value);
//   }
// );

const filterDataBySelectedIndicator = createSelector(
  [filterByEmissionType, getFiltersSelected],
  (data, filtersSelected) => {
    if (!data) return null;
    if (!filtersSelected) return data;
    const labels = filtersSelected.map(({ label }) => label);
    const result = data.filter(({ emission_subcategory: { name } }) =>
      labels.includes(name)
    );
    return result;
  }
);

export const getChartData = createSelector(
  [filterDataBySelectedIndicator],
  data => {
    if (!data || !data.length) return null;
    const xValues = Object.keys(data[0].values).map(key => parseInt(key, 10));
    const dataParsed = xValues.map(x => {
      const yItems = {};
      data.forEach(d => {
        const yKey = getYColumnValue(d.emission_subcategory.name);
        const yData = d.values[x];
        yItems[yKey] = yData ? parseFloat(yData) * API_SCALE : undefined;
      });
      return { x, ...yItems };
    });
    const arr = [];
    dataParsed.forEach(d => {
      const arrayOfYValues = Object.values(d)
        .map(z => z)
        .splice(1); // remove 'x' property
      if (!arrayOfYValues.every(value => !value)) arr.push(d);
    });
    return arr;
  }
);

export const getChartDomain = createSelector([getChartData], data => {
  if (!data) return null;
  return { x: ['auto', 'auto'], y: ['auto', 'auto'] };
});

let colorThemeCache = {};

export const getChartConfig = createSelector(
  [getChartData, getFiltersSelected],
  (data, yColumns) => {
    if (!data || !yColumns) return null;

    const yColumnsChecked = yColumns;
    const chartColors = setChartColors(
      yColumnsChecked.length,
      CHART_COLORS,
      CHART_COLORS_EXTENDED
    );
    const theme = getThemeConfig(yColumnsChecked, chartColors);
    colorThemeCache = { ...theme, ...colorThemeCache };
    const tooltip = getTooltipConfig(yColumnsChecked);
    return {
      axes: {
        ...DEFAULT_AXES_CONFIG,
        yLeft: { ...DEFAULT_AXES_CONFIG.yLeft, unit: 'MtCO2e' }
      },
      theme: colorThemeCache,
      tooltip,
      columns: {
        x: [{ label: 'emission', value: 'x' }],
        y: yColumns
      }
    };
  }
);
