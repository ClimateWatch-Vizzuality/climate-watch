import { createSelector } from 'reselect';
import qs from 'query-string';
import { uniqBy, sortBy, isEmpty, intersection, flatten, groupBy } from 'lodash';
import { getYColumnValue, getThemeConfig, getTooltipConfig, setChartColors } from 'utils/graphs';
import {
  AGRICULTURE_TOTAL_EMISSIONS,
  CHART_COLORS,
  CHART_COLORS_EXTENDED,
  DEFAULT_AXES_CONFIG,
  CALCULATION_OPTIONS,
  UNITS
} from 'data/constants';
import { getEmissionCountrySelected } from './location-selectors';

const getSourceSelection = state => (state.location && state.location.search) || null;

const getAgricultureEmissionsData = state =>
  (state.agricultureEmissions && state.agricultureEmissions.data) || null;

const getWbCountryData = state => (state.wbCountryData && state.wbCountryData.data) || null;

const getCountryMetricData = createSelector(
  [getWbCountryData, getEmissionCountrySelected],
  (data, country) => {
    if (isEmpty(data) || !country) return null;
    const countryMetric = data[country.value];
    const metricData = {};
    if (countryMetric) {
      countryMetric.forEach(d => {
        metricData[d.year] = { gdp: d.gdp, population: d.population };
      });
    } else {
      const members = country.members && country.members.map(isoCode3 => data[isoCode3]);
      if (!members) return {};
      const membersByYear = groupBy(flatten(members), 'year');
      const years = Object.keys(membersByYear);

      years.forEach(year => {
        const metricsData =
          membersByYear[year] &&
          membersByYear[year].reduce(
            (acc, member) => {
              if (member) {
                const gdp = acc.gdp + member.gdp;
                const population = acc.population + member.population;
                return { gdp, population };
              }
              return acc;
            },
            { gdp: 0, population: 0 }
          );

        metricData[year] = metricsData;
      });
    }
    return metricData;
  }
);

export const getEmissionTypes = createSelector([getAgricultureEmissionsData], data => {
  if (!data || !data.length) return null;
  const emissionTypes = data.map(({ emission_subcategory: { category_name, category_id } }) => ({
    label: category_name,
    value: `${category_id}`
  }));
  const uniqEmissionTypes = uniqBy(emissionTypes, 'value');
  const totalOption = uniqEmissionTypes.find(({ label }) => label === AGRICULTURE_TOTAL_EMISSIONS);
  const sortedEmissionTypes = sortBy(
    uniqEmissionTypes.filter(({ label }) => label !== AGRICULTURE_TOTAL_EMISSIONS),
    ['label']
  );
  return [totalOption, ...sortedEmissionTypes];
});

export const getEmissionTypeSelected = createSelector(
  [getSourceSelection, getEmissionTypes],
  (selectedEmissionOption, emissionTypes) => {
    if (!emissionTypes) return null;
    if (!selectedEmissionOption) {
      const defaultEmissionType = emissionTypes.find(({ value }) => value === 1);
      return defaultEmissionType || emissionTypes[0];
    }
    const { emissionType } = qs.parse(selectedEmissionOption);
    const selectedEmissionType = emissionTypes.find(({ value }) => value === emissionType);
    return selectedEmissionType || emissionTypes[0];
  }
);

export const getMetricOptions = createSelector(getEmissionTypeSelected, emissionType => {
  const allMetrics = Object.values(CALCULATION_OPTIONS);

  if (!emissionType) return allMetrics;

  if (emissionType && emissionType.label === 'Agriculture emissions intensity') {
    return [CALCULATION_OPTIONS.ABSOLUTE_VALUE];
  }

  return allMetrics;
});

export const getMetricSelected = createSelector(
  [getSourceSelection, getMetricOptions],
  (sourceSelection, metricOptions) => {
    if (!sourceSelection) return CALCULATION_OPTIONS.ABSOLUTE_VALUE;

    const { emissionMetric } = qs.parse(sourceSelection);
    const selectedEmissionMetric = metricOptions.find(({ value }) => value === emissionMetric);
    return selectedEmissionMetric || CALCULATION_OPTIONS.ABSOLUTE_VALUE;
  }
);

const filterByEmissionType = createSelector(
  [getAgricultureEmissionsData, getEmissionTypeSelected],
  (data, emissionType) => {
    if (!data || !emissionType) return null;
    return data.filter(
      ({ emission_subcategory: { category_id } }) => `${category_id}` === emissionType.value
    );
  }
);

const getEmissionCategoryUnit = createSelector([filterByEmissionType], data => {
  if (!data || !data.length) return null;

  return data[0].emission_subcategory.category_unit;
});

const getScale = createSelector(getEmissionCategoryUnit, unit => {
  if (!unit) return null;
  // gigagrams to tonnes 1Gg = 1000 tonnes
  if (unit.includes('gigagrams')) return 1000;
  return 1;
});

const getUnit = createSelector(getEmissionCategoryUnit, unit => {
  if (!unit) return null;
  if (unit.includes('gigagrams')) return UNITS.CO2e;
  return unit;
});

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
    const subCategoriesSelected = (filter && filter.split(',')) || filtersValues;
    const filtersSelected = filters.filter(({ value }) => subCategoriesSelected.includes(value));
    return filtersSelected;
  }
);

const filterDataBySelectedIndicator = createSelector(
  [filterByEmissionType, getFiltersSelected],
  (data, filtersSelected) => {
    if (!data) return null;
    if (!filtersSelected) return data;
    const labels = filtersSelected.map(({ label }) => label);
    const result = data.filter(({ emission_subcategory: { name } }) => labels.includes(name));
    return result;
  }
);

export const getMetricRatio = (selected, calculationData, x) => {
  if (!calculationData || !calculationData[x]) return 1;
  if (selected === CALCULATION_OPTIONS.PER_GDP.value) {
    // GDP is in dollars and we want to display it in million dollars
    return calculationData[x].gdp / 1000000;
  }
  if (selected === CALCULATION_OPTIONS.PER_CAPITA.value) {
    return calculationData[x].population;
  }
  return 1;
};

export const getChartData = createSelector(
  [filterDataBySelectedIndicator, getCountryMetricData, getMetricSelected, getScale],
  (data, countryMetric, metricSelected, scale) => {
    if (!data || !data.length || !countryMetric || !metricSelected) return null;
    if (
      metricSelected.value !== CALCULATION_OPTIONS.ABSOLUTE_VALUE.value &&
      isEmpty(countryMetric)
    ) {
      return null;
    } // set null when country/region doesn't have a metric data

    let xValues = Object.keys(data[0].values).map(key => parseInt(key, 10));
    if (metricSelected.value !== CALCULATION_OPTIONS.ABSOLUTE_VALUE.value) {
      // get array of common years for data and for metric
      const metricValues = Object.keys(countryMetric).map(key => parseInt(key, 10));
      xValues = intersection(xValues, metricValues);
    }
    const dataParsed = xValues.map(x => {
      const yItems = {};
      data.forEach(d => {
        const yKey = getYColumnValue(d.emission_subcategory.name);
        const yData = d.values[x];
        const calculationRatio = getMetricRatio(metricSelected.value, countryMetric, x);
        yItems[yKey] = yData ? parseFloat(yData) * (scale / calculationRatio) : undefined;
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

let colorThemeCache = {};

const getUnitForSelectedMetric = (unit, metric) => {
  if (metric === CALCULATION_OPTIONS.PER_CAPITA.value) {
    return `${unit} per Capita`;
  }
  if (metric === CALCULATION_OPTIONS.PER_GDP.value) {
    return `${unit} per million $ GDP`;
  }

  return unit;
};

export const getChartConfig = createSelector(
  [getChartData, getFiltersSelected, getMetricSelected, getUnit],
  (data, yColumns, metricSelected, unit) => {
    if (!data || !yColumns || !metricSelected || !unit) return null;
    const chartColors = setChartColors(yColumns.length, CHART_COLORS, CHART_COLORS_EXTENDED);
    const theme = getThemeConfig(yColumns, chartColors);
    colorThemeCache = { ...theme, ...colorThemeCache };
    const tooltip = getTooltipConfig(yColumns);
    const unitForMetric = getUnitForSelectedMetric(unit, metricSelected.value);

    return {
      axes: {
        ...DEFAULT_AXES_CONFIG,
        yLeft: {
          ...DEFAULT_AXES_CONFIG.yLeft,
          unit: unitForMetric,
          suffix: unit === UNITS.CO2e ? 't' : null
        }
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
