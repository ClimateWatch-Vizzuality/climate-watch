import { createSelector } from 'reselect';
import qs from 'query-string';
import { uniqBy, sortBy, isEmpty, intersection } from 'lodash';
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
import { getEmissionCountrySelected } from './ghg-metadata-selectors';
import { metrics } from '../historical-emissions-graph-data';

const API_SCALE = 0.001; // converting from Gigagrams to Megatonnes ( 1 Gg = 0.001 Mt)

const getSourceSelection = state =>
  (state.location && state.location.search) || null;
const getAgricultureEmissionsData = state =>
  (state.agricultureEmissions && state.agricultureEmissions.data) || null;
const getWbCountryData = state =>
  (state.wbCountryData && state.wbCountryData.data) || null;

export const getMetricSelected = createSelector(
  [getSourceSelection],
  sourceSelection => {
    if (!sourceSelection) return metrics[0];
    const { emissionMetric } = qs.parse(sourceSelection);
    const selectedEmissionMetric = metrics.find(
      ({ value }) => value === emissionMetric
    );
    return selectedEmissionMetric || metrics[0];
  }
);

export const getMetricData = createSelector(
  [getMetricSelected],
  metricSelected => {
    if (!metricSelected) return null;
    if (metricSelected.value === 'total') {
      return {
        value: metricSelected.value,
        unit: 'MtC02e',
        scale: 1
      };
    }
    if (metricSelected.value === 'population') {
      return {
        value: metricSelected.value,
        unit: 'tC02e',
        scale: 1000000
      };
    }
    if (metricSelected.value === 'gdp') {
      return {
        value: metricSelected.value,
        unit: 'tC02e',
        scale: 1000000
      };
    }
    return null;
  }
);

const getCountryMetricData = createSelector(
  [getWbCountryData, getMetricData, getEmissionCountrySelected],
  (data, metric, country) => {
    if (!data || !metric || !country) return null;
    const countryMetric = data[country.value];
    const metricData = {};
    if (countryMetric) {
      countryMetric.forEach(d => {
        metricData[d.year] = d[metric.value];
      });
    }
    return { value: metric.value, data: metricData };
  }
);

export const getEmissionTypes = createSelector(
  [getAgricultureEmissionsData],
  data => {
    if (!data || !data.length) return null;
    const totalLabel = 'Total';
    const emissionTypes = data.map(
      ({ emission_subcategory: { category_name, category_id } }) => ({
        label: category_name || totalLabel,
        value: `${category_id}`
      })
    );
    const uniqEmissionTypes = uniqBy(emissionTypes, 'value');
    const totalOption = uniqEmissionTypes.find(
      ({ label }) => label === totalLabel
    );
    const sortedEmissionTypes = sortBy(
      uniqEmissionTypes.filter(({ label }) => label !== totalLabel),
      ['label']
    );
    return [totalOption, ...sortedEmissionTypes];
  }
);

export const getEmissionTypeSelected = createSelector(
  [getSourceSelection, getEmissionTypes],
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

export const getFilterOptions = createSelector([filterByEmissionType], data => {
  if (!data || !data.length) return null;
  const yColumns = data
    .map(({ emission_subcategory: { name } }) => ({
      label: name,
      value: getYColumnValue(name),
      groupId: 'subSectors'
    }))
    .filter(y => y !== 'x');
  const yUniqColumns = uniqBy(yColumns, 'value');
  return yUniqColumns;
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
  [filterDataBySelectedIndicator, getCountryMetricData, getMetricData],
  (data, countryMetric, metric) => {
    if (!data || !data.length || !countryMetric || !metric) return null;
    if (countryMetric.value !== 'total' && isEmpty(countryMetric.data)) { return null; }

    let xValues = Object.keys(data[0].values).map(key => parseInt(key, 10));
    if (countryMetric.value !== 'total') {
      const metricValues = Object.keys(countryMetric.data).map(key =>
        parseInt(key, 10)
      );
      xValues = intersection(xValues, metricValues);
    }
    const dataParsed = xValues.map(x => {
      const yItems = {};
      data.forEach(d => {
        const yKey = getYColumnValue(d.emission_subcategory.name);
        const yData = d.values[x];
        // console.log(`year: ${x}, value: ${yData}, countryMetric.data: ${(countryMetric.data[x] || 1)}, metric.scale: ${metric.scale}`);
        yItems[yKey] = yData
          ? parseFloat(yData) *
            API_SCALE /
            (countryMetric.data[x] || 1) *
            metric.scale
          : undefined;
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
  [getChartData, getFiltersSelected, getMetricData],
  (data, yColumns, metric) => {
    if (!data || !yColumns || !metric) return null;
    const chartColors = setChartColors(
      yColumns.length,
      CHART_COLORS,
      CHART_COLORS_EXTENDED
    );
    const theme = getThemeConfig(yColumns, chartColors);
    colorThemeCache = { ...theme, ...colorThemeCache };
    const tooltip = getTooltipConfig(yColumns);
    // const unit = metric === 'total' ? 'MtCO2e' : 'tCO2e';
    return {
      axes: {
        ...DEFAULT_AXES_CONFIG,
        yLeft: { ...DEFAULT_AXES_CONFIG.yLeft, unit: metric.unit }
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
