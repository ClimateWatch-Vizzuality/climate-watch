import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import uniqBy from 'lodash/uniqBy';
import groupBy from 'lodash/groupBy';
import { toPlural } from 'utils/ghg-emissions';
import {
  getYColumnValue,
  getThemeConfig,
  getTooltipConfig,
  setXAxisDomain,
  setYAxisDomain
} from 'utils/graphs';
import {
  CHART_COLORS_EXTENDED,
  DEFAULT_AXES_CONFIG,
  DATA_SCALE,
  METRIC_OPTIONS
} from 'data/constants';
import { getWBData } from './ghg-emissions-selectors-get';
import {
  sortData,
  getModelSelected,
  getMetricSelected,
  getOptionsSelected,
  getOptions
} from './ghg-emissions-selectors-filters';

export const onlyOneRegionSelected = createSelector(
  [getModelSelected, getOptionsSelected],
  (modelSelected, selectedOptions) => {
    const model = modelSelected && toPlural(modelSelected);
    if (
      !selectedOptions ||
      !model ||
      model !== 'regions' ||
      !selectedOptions.regionsSelected
    ) {
      return false;
    }
    const dataSelected = selectedOptions.regionsSelected;
    return dataSelected.length === 1 && dataSelected[0].groupId === 'regions';
  }
);

const getExpandedLegendRegionsSelected = createSelector(
  [
    getModelSelected,
    getOptions,
    getOptionsSelected,
    onlyOneRegionSelected,
    sortData
  ],
  (
    modelSelected,
    options,
    selectedOptions,
    shouldExpandIntoCountries,
    data
  ) => {
    const model = toPlural(modelSelected);
    if (
      !shouldExpandIntoCountries ||
      !selectedOptions ||
      !model ||
      model !== 'regions' ||
      !selectedOptions.regionsSelected ||
      !data
    ) {
      return null;
    }
    const dataSelected = selectedOptions.regionsSelected;
    if (!shouldExpandIntoCountries) return null;
    const countryOptions = dataSelected[0].members.map(iso =>
      options[model].find(o => o.iso === iso)
    );
    const groupedCountries = data && groupBy(data, 'iso_code3');
    const getLastValue = x => x.emissions[x.emissions.length - 1].value;

    const latestValuesHash = {};
    Object.keys(groupedCountries).forEach(c => {
      latestValuesHash[c] = groupedCountries[c].reduce(
        (acc, v) => acc + getLastValue(v),
        0
      );
    });
    const compare = (a, b) =>
      (latestValuesHash[a.iso] > latestValuesHash[b.iso] ? -1 : 1);
    const sortedCountries = countryOptions.sort(compare);
    const LEGEND_LIMIT = 10;
    if (data && sortedCountries.length > LEGEND_LIMIT) {
      const othersGroup =
        data && sortedCountries.slice(LEGEND_LIMIT, -1).filter(o => o);
      const othersOption = {
        iso: 'OTHERS',
        label: 'Others',
        value: othersGroup.map(o => o.iso).join(),
        members: othersGroup.map(o => o.iso),
        groupId: 'regions',
        hideData: true
      };
      const updatedOthers = othersGroup.map(o => ({
        ...o,
        hideLegend: true,
        legendColumn: 'Others'
      }));
      return (
        data && [
          ...sortedCountries.slice(0, LEGEND_LIMIT),
          othersOption,
          ...updatedOthers
        ]
      );
    }
    return sortedCountries;
  }
);

export const getLegendDataSelected = createSelector(
  [
    getModelSelected,
    getOptions,
    getOptionsSelected,
    getExpandedLegendRegionsSelected
  ],
  (modelSelected, options, selectedOptions, expandedLegendRegionsSelected) => {
    const model = toPlural(modelSelected);
    const selectedModel = `${model}Selected`;
    if (
      !selectedOptions ||
      !modelSelected ||
      !selectedOptions[selectedModel] ||
      !options
    ) {
      return null;
    }
    const dataSelected = selectedOptions[selectedModel];
    if (expandedLegendRegionsSelected) {
      return expandedLegendRegionsSelected.filter(c => c && !c.hideLegend);
    }
    return isArray(dataSelected) ? dataSelected : [dataSelected];
  }
);

const getYColumnOptions = createSelector(
  [getLegendDataSelected, getExpandedLegendRegionsSelected],
  (legendDataSelected, expandedLegendRegionsSelected) => {
    if (!legendDataSelected) return null;
    const dataSelected = expandedLegendRegionsSelected || legendDataSelected;
    const getYOption = columns =>
      columns &&
      columns.map(d => ({
        ...d,
        value: d && getYColumnValue(d.label)
      }));
    return uniqBy(getYOption(dataSelected), 'value');
  }
);

// Map the data from the API

const getDFilterValue = (d, modelSelected) =>
  (modelSelected === 'regions' ? d.location : d[modelSelected]);

const getCalculationData = createSelector([getWBData], data => {
  if (!data || isEmpty(data)) return null;
  const yearData = {};
  Object.keys(data).forEach(iso => {
    data[iso].forEach(d => {
      if (!yearData[d.year]) yearData[d.year] = {};
      yearData[d.year][iso] = { population: d.population, gdp: d.gdp };
    });
  });
  return yearData;
});

export const getMetricRatio = (selected, calculationData, x) => {
  if (!calculationData || !calculationData[x]) return 1;
  if (selected === METRIC_OPTIONS.PER_GDP.value) {
    // GDP is in dollars and we want to display it in million dollars
    return calculationData[x][0].gdp / 1000000;
  }
  if (selected === METRIC_OPTIONS.PER_CAPITA.value) {
    return calculationData[x][0].population;
  }
  return 1;
};

const calculateValue = (currentValue, value, metricData) => {
  const metricRatio = metricData || 1;
  const updatedValue =
    value || value === 0 ? value * DATA_SCALE / metricRatio : null;
  if (updatedValue && (currentValue || currentValue === 0)) {
    return updatedValue + currentValue;
  }
  return updatedValue || currentValue;
};

export const getChartData = createSelector(
  [
    sortData,
    getModelSelected,
    getYColumnOptions,
    getMetricSelected,
    getCalculationData
  ],
  (data, model, yColumnOptions, metric, calculationData) => {
    if (!data || !data.length || !model) return null;
    const yearValues = data[0].emissions.map(d => d.year);
    const shouldHaveMetricData =
      metric && metric !== METRIC_OPTIONS.ABSOLUTE_VALUE.value;
    let metricField = null;
    if (shouldHaveMetricData) {
      metricField =
        metric === METRIC_OPTIONS.PER_CAPITA.value ? 'population' : 'gdp';
    }
    const dataParsed = yearValues.map(x => {
      const yItems = {};
      data.forEach(d => {
        const columnObjects = yColumnOptions.filter(
          c =>
            c.label === getDFilterValue(d, model) ||
            (c.members && c.members.includes(d.iso_code3))
        );
        const yKeys = columnObjects.map(k => k.value);
        const yData = d.emissions.find(e => e.year === x);
        let metricData =
          metricField &&
          calculationData &&
          calculationData[x] &&
          calculationData[x][d.iso_code3] &&
          calculationData[x][d.iso_code3][metricField];
        // GDP is in dollars and we want to display it in million dollars
        if (metricField === 'gdp' && metricData) metricData /= 1000000;
        yKeys.forEach(key => {
          if (!shouldHaveMetricData || metricData) {
            yItems[key] = calculateValue(yItems[key], yData.value, metricData);
          }
        });
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
  return {
    x: setXAxisDomain(),
    y: setYAxisDomain()
  };
});

// variable that caches chart elements assigned color
// to avoid element color changing when the chart is updated
let colorThemeCache = {};

export const getChartConfig = createSelector(
  [getModelSelected, getYColumnOptions],
  (model, yColumns) => {
    if (!model || !yColumns) return null;
    colorThemeCache = getThemeConfig(
      yColumns,
      CHART_COLORS_EXTENDED,
      colorThemeCache
    );
    const tooltip = getTooltipConfig(yColumns.filter(c => c && !c.hideLegend));
    return {
      axes: {
        ...DEFAULT_AXES_CONFIG,
        yLeft: {
          ...DEFAULT_AXES_CONFIG.yLeft,
          suffix: 't'
        }
      },
      theme: colorThemeCache,
      tooltip,
      animation: false,
      columns: {
        x: [
          {
            label: 'year',
            value: 'x'
          }
        ],
        y: yColumns
      }
    };
  }
);

export const getLoading = createSelector(
  [getChartConfig, state => state.ghgEmissionsMeta, state => state.emissions],
  (chartConfig, meta, data) =>
    (meta && meta.loading) || (data && data.loading) || !chartConfig || false
);
