import { createSelector } from 'reselect';
import qs from 'query-string';
import { uniqBy, sortBy, isEmpty, intersection } from 'lodash';
import {
  getYColumnValue,
  getThemeConfig,
  getTooltipConfig,
  setChartColors,
  getMetricRatio
} from 'utils/graphs';
import {
  CHART_COLORS,
  CHART_COLORS_EXTENDED,
  DEFAULT_AXES_CONFIG,
  METRIC_OPTIONS
} from 'data/constants';
import { getEmissionCountrySelected } from './ghg-metadata-selectors';

const API_SCALE = 0.001; // converting from Gigagrams to Megatonnes ( 1 Gg = 0.001 Mt)
const TOTAL_SUBCATEGORY = {
  name: 'Total emissions',
  category_id: 'total',
  category_name: 'Agriculture Emissions: Total',
  short_name: 'total_emissions_agr_18'
};

const getSourceSelection = state =>
  (state.location && state.location.search) || null;

const getAgricultureEmissionsData = state => {
  if (state.agricultureEmissions) {
    return state.agricultureEmissions.data.map(e => {
      // fills data with the missing total emissions data
      if (e.emission_subcategory.short_name === TOTAL_SUBCATEGORY.short_name) {
        const emission_subcategory = {
          ...e.emission_subcategory,
          ...TOTAL_SUBCATEGORY
        };
        return { ...e, emission_subcategory };
      }
      return e;
    });
  }
  return null;
};

const getWbCountryData = state =>
  (state.wbCountryData && state.wbCountryData.data) || null;

export const getMetricSelected = createSelector(
  [getSourceSelection],
  sourceSelection => {
    if (!sourceSelection) return METRIC_OPTIONS.ABSOLUTE_VALUE;
    const { emissionMetric } = qs.parse(sourceSelection);
    const metricOptions = Object.values(METRIC_OPTIONS).map(option => option);
    const selectedEmissionMetric = metricOptions.find(
      ({ value }) => value === emissionMetric
    );
    return selectedEmissionMetric || METRIC_OPTIONS.ABSOLUTE_VALUE;
  }
);

const getCountryMetricData = createSelector(
  [getWbCountryData, getEmissionCountrySelected],
  (data, country) => {
    if (!data || !country) return null;
    const countryMetric = data[country.value];
    const metricData = {};
    if (countryMetric) {
      countryMetric.forEach(d => {
        metricData[d.year] = { gdp: d.gdp, population: d.population };
      });
    }
    return metricData;
  }
);

export const getEmissionTypes = createSelector(
  [getAgricultureEmissionsData],
  data => {
    if (!data || !data.length) return null;
    const emissionTypes = data.map(
      ({ emission_subcategory: { category_name, category_id } }) => ({
        label: category_name,
        value: `${category_id}`
      })
    );
    const uniqEmissionTypes = uniqBy(emissionTypes, 'value');
    const totalOption = uniqEmissionTypes.find(
      ({ label }) => label === TOTAL_SUBCATEGORY.category_name
    );
    const sortedEmissionTypes = sortBy(
      uniqEmissionTypes.filter(
        ({ label }) => label !== TOTAL_SUBCATEGORY.category_name
      ),
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
  [filterDataBySelectedIndicator, getCountryMetricData, getMetricSelected],
  (data, countryMetric, metricSelected) => {
    if (!data || !data.length || !countryMetric || !metricSelected) return null;
    if (
      metricSelected.value !== METRIC_OPTIONS.ABSOLUTE_VALUE.value &&
      isEmpty(countryMetric)
    ) {
      return null;
    } // set null when country/region doesn't have a metric data

    let xValues = Object.keys(data[0].values).map(key => parseInt(key, 10));
    if (metricSelected.value !== METRIC_OPTIONS.ABSOLUTE_VALUE.value) {
      // get array of common years for data and for metric
      const metricValues = Object.keys(countryMetric).map(key =>
        parseInt(key, 10)
      );
      xValues = intersection(xValues, metricValues);
    }
    const dataParsed = xValues.map(x => {
      const yItems = {};
      data.forEach(d => {
        const yKey = getYColumnValue(d.emission_subcategory.name);
        const yData = d.values[x];
        const calculationRatio = getMetricRatio(
          metricSelected.value,
          countryMetric,
          x
        );
        yItems[yKey] = yData
          ? parseFloat(yData) * API_SCALE / calculationRatio
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
  [getChartData, getFiltersSelected, getMetricSelected],
  (data, yColumns, metricSelected) => {
    if (!data || !yColumns || !metricSelected) return null;
    const chartColors = setChartColors(
      yColumns.length,
      CHART_COLORS,
      CHART_COLORS_EXTENDED
    );
    const theme = getThemeConfig(yColumns, chartColors);
    colorThemeCache = { ...theme, ...colorThemeCache };
    const tooltip = getTooltipConfig(yColumns);
    let unit = 'MtCO2e';
    if (metricSelected.value === 'population') {
      unit = 'tC02e per Capita'; // from MtC02 to tC02 ( 1 MtC02 = 1000000 tC02)
    }
    if (metricSelected.value === 'gdp') {
      unit = 'tC02e per million $ GDP'; // from MtC02 to tC02 ( 1 MtC02 = 1000000 tC02)
    }
    return {
      axes: {
        ...DEFAULT_AXES_CONFIG,
        yLeft: { ...DEFAULT_AXES_CONFIG.yLeft, unit }
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
