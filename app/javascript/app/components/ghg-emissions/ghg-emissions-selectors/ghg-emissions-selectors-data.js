import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import sortBy from 'lodash/sortBy';
import castArray from 'lodash/castArray';
import flatMap from 'lodash/flatMap';
import uniqBy from 'lodash/uniqBy';
import uniq from 'lodash/uniq';
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
  DATA_SCALE,
  DEFAULT_AXES_CONFIG,
  CHART_COLORS,
  CHART_COLORS_EXTENDED,
  CHART_COLORS_EXTRA,
  OTHER_COLOR,
  GHG_CALCULATION_OPTIONS
} from 'data/constants';
import {
  getWBData,
  getData,
  getRegions,
  getDataZoomYears
} from './ghg-emissions-selectors-get';
import {
  getModelSelected,
  getMetricSelected,
  getCalculationSelected,
  getOptionsSelected,
  getIsRegionAggregated,
  getOptions
} from './ghg-emissions-selectors-filters';

import {
  getMetricData,
  getRegionsWithOwnData
} from './ghg-emissions-selectors-data-utils';

const getShouldExpand = filter =>
  createSelector(
    [getModelSelected, getOptionsSelected, getIsRegionAggregated],
    (modelSelected, selectedOptions, isRegionAggregated) => {
      const model = modelSelected && toPlural(modelSelected);
      const dataSelected = selectedOptions[`${filter}Selected`];

      if (
        isRegionAggregated ||
        !selectedOptions ||
        !model ||
        model !== filter ||
        !dataSelected
      ) {
        return false;
      }

      return !!(
        dataSelected.length === 1 &&
        dataSelected[0].expandsTo &&
        dataSelected[0].expandsTo.length
      );
    }
  );

const getShouldExpandRegions = getShouldExpand('regions');
const getShouldExpandGases = getShouldExpand('gases');
const getShouldExpandSectors = getShouldExpand('sectors');

const getExpandedLegendRegionsSelected = createSelector(
  [getOptions, getOptionsSelected, getShouldExpandRegions, getData],
  (options, selectedOptions, shouldExpandRegions, data) => {
    if (!shouldExpandRegions || !data) return null;

    const dataSelected = selectedOptions.regionsSelected;
    const expandedOption = dataSelected[0];
    const countryOptions = expandedOption.expandsTo.map(iso =>
      options.regions.find(o => o.iso === iso)
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
    const byLatestYearEmission = (a, b) =>
      (latestValuesHash[a.iso] > latestValuesHash[b.iso] ? -1 : 1);
    return countryOptions.sort(byLatestYearEmission);
  }
);

const getExpandedLegendSectorsSelected = createSelector(
  [getModelSelected, getOptions, getOptionsSelected, getShouldExpandSectors],
  (modelSelected, options, selectedOptions, shouldExpandSectors) => {
    const model = toPlural(modelSelected);
    if (!shouldExpandSectors) return null;

    const selectedSector = selectedOptions.sectorsSelected[0];
    const sectorOptions = selectedSector.expandsTo.map(id =>
      options[model].find(o => o.value === id)
    );

    return sectorOptions;
  }
);

const getExpandedLegendGasesSelected = createSelector(
  [getModelSelected, getOptions, getOptionsSelected, getShouldExpandGases],
  (modelSelected, options, selectedOptions, shouldExpandGases) => {
    const model = toPlural(modelSelected);
    if (!shouldExpandGases) return null;

    const selectedGas = selectedOptions.gasesSelected[0];
    const gasOptions = selectedGas.expandsTo.map(id =>
      options[model].find(o => o.value === id)
    );

    return gasOptions;
  }
);

const getLegendDataOptions = createSelector(
  [getModelSelected, getOptions],
  (modelSelected, options) => {
    if (!options || !modelSelected || !options[toPlural(modelSelected)]) {
      return null;
    }
    return options[toPlural(modelSelected)];
  }
);

const getLegendDataSelected = createSelector(
  [
    getModelSelected,
    getOptions,
    getOptionsSelected,
    getExpandedLegendRegionsSelected,
    getExpandedLegendSectorsSelected,
    getExpandedLegendGasesSelected
  ],
  (
    modelSelected,
    options,
    selectedOptions,
    expandedLegendRegionsSelected,
    expandedLegendSectorsSelected,
    expandedLegendGasesSelected
  ) => {
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

    let dataSelected = selectedOptions[selectedModel];

    if (expandedLegendRegionsSelected) {
      dataSelected = expandedLegendRegionsSelected;
    } else if (expandedLegendSectorsSelected) {
      dataSelected = expandedLegendSectorsSelected;
    } else if (expandedLegendGasesSelected) {
      dataSelected = expandedLegendGasesSelected;
    }

    return castArray(dataSelected).filter(c => c && !c.hideLegend);
  }
);

export const getYColumnOptions = createSelector(
  [getLegendDataSelected],
  legendDataSelected => {
    if (!legendDataSelected) return null;
    const getYOption = columns =>
      columns &&
      columns.map(d => ({
        ...d,
        value: d && getYColumnValue(d.label)
      }));
    return uniqBy(getYOption(legendDataSelected), 'value');
  }
);

export const getCalculationData = createSelector([getWBData], data => {
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

export const getChartData = createSelector(
  [
    getData,
    getRegions,
    getModelSelected,
    getYColumnOptions,
    getCalculationData,
    getCalculationSelected,
    getDataZoomYears,
    getMetricSelected
  ],
  (
    data,
    regions,
    model,
    yColumnOptions,
    calculationData,
    calculationSelected,
    dataZoomYears,
    metric
  ) => {
    if (
      !data ||
      !data.length ||
      !model ||
      !calculationData ||
      !regions ||
      !calculationSelected
    ) {
      return null;
    }
    const yearValues = data[0].emissions.map(d => d.year);
    const metricField = {
      [GHG_CALCULATION_OPTIONS.PER_CAPITA.value]: 'population',
      [GHG_CALCULATION_OPTIONS.PER_GDP.value]: 'gdp'
    }[metric];
    const shouldHaveMetricData = !!metricField;

    const regionsWithOwnData = getRegionsWithOwnData(regions, data);
    const regionWithOwnDataMembers = uniq(
      flatMap(regionsWithOwnData, r => r.members.map(m => m.iso_code3))
    );
    const memberOfRegionWithOwnData = d =>
      regionWithOwnDataMembers.includes(d.iso_code3);

    const isBreakByRegions = model === 'regions';
    const groupByKey = isBreakByRegions ? 'location' : model;
    const groupedData = groupBy(data, groupByKey);

    const expandedData = column => {
      if (!column.expandsTo) return null;

      return flatMap(column.expandsTo, e =>
        data.filter(d => d.iso_code3 === e)
      ).filter(d => d);
    };

    const dataParsed = [];
    const yItems = {};
    const accumulatedValues = {};
    const previousYearValues = {};

    const getItemValue = (totalValue, key, totalMetric, year) => {
      let scaledValue = totalValue ? totalValue * DATA_SCALE : null;
      if (
        calculationSelected.value === GHG_CALCULATION_OPTIONS.CUMULATIVE.value
      ) {
        if (scaledValue) {
          if (accumulatedValues[key]) {
            if (
              !dataZoomYears ||
              !dataZoomYears.min ||
              year > dataZoomYears.min
            ) {
              accumulatedValues[key] += scaledValue;
            }
          } else {
            accumulatedValues[key] = scaledValue;
          }
        }
        scaledValue = accumulatedValues[key] || null;
      }

      if (
        calculationSelected.value ===
        GHG_CALCULATION_OPTIONS.PERCENTAGE_CHANGE.value
      ) {
        const currentYearValue = scaledValue || 0;
        if (scaledValue) {
          const previousValue = previousYearValues[key];
          scaledValue = previousValue
            ? ((scaledValue - previousYearValues[key]) * 100) /
              previousYearValues[key]
            : 'n/a';
        }
        previousYearValues[key] = currentYearValue;
      }

      if (scaledValue !== null && totalMetric !== null) {
        return scaledValue / totalMetric;
      }
      return null;
    };

    yearValues.forEach(year => {
      yColumnOptions.forEach(column => {
        const dataForColumn =
          groupedData[column.label] || expandedData(column) || [];
        const key = column.value;
        let totalValue = null;
        let totalMetric = null;

        dataForColumn.forEach(d => {
          if (!isBreakByRegions && memberOfRegionWithOwnData(d)) return;

          const yearEmissions = d.emissions.find(e => e.year === year);
          const metricRatio = shouldHaveMetricData
            ? getMetricData(year, column, metricField, calculationData, regions)
            : 1;

          if (yearEmissions && yearEmissions.value && metricRatio) {
            totalValue += yearEmissions.value;
            totalMetric = shouldHaveMetricData ? totalMetric + metricRatio : 1;
          }
        });

        yItems[key] = getItemValue(totalValue, key, totalMetric, year);
      });

      dataParsed.push({
        x: year,
        ...yItems
      });
    });

    // if there is no value for any legend item
    // remove those element from the start and the end of chart
    // leave those in the middle
    const trimWithNoData = dataToTrim => {
      const indexesToString = dataToTrim
        .map((d, idx) => (Object.keys(d).length > 1 ? idx : '_'))
        .join(',')
        .replace(/_,/g, '')
        .trim();
      const middleIndexes = indexesToString.split(',');
      const firstNotEmptyIndex = Number(middleIndexes[0]);
      const lastNotEmptyIndex = Number(middleIndexes[middleIndexes.length - 1]);

      return dataToTrim.filter(
        (_d, idx) => idx >= firstNotEmptyIndex && idx <= lastNotEmptyIndex
      );
    };
    return trimWithNoData(dataParsed);
  }
);

const LEGEND_LIMIT = 10;

export const getSortedYColumnOptions = createSelector(
  [getChartData, getOptionsSelected, getYColumnOptions],
  (data, selectedOptions, yFullOptions) => {
    if (!data || isEmpty(data)) return null;
    const lastYearData = data[data.length - 1];
    if (!lastYearData) return null;
    const yOptions = omit(lastYearData, 'x');
    let sortedOptions = sortBy(
      Object.keys(yOptions),
      key => -yOptions[key]
    ).map(key => yFullOptions.find(o => o.value === key));
    if (sortedOptions.length > LEGEND_LIMIT) {
      const dataSelected = selectedOptions.regionsSelected;
      const expandedOption = dataSelected[0];

      const othersGroup = sortedOptions.slice(-sortedOptions.length + 10, -1);
      const othersOption = {
        iso: 'OTHERS',
        label: 'Others',
        value: 'yOthers',
        expandsTo: othersGroup.map(o => o.iso),
        expandedOptionValue: expandedOption.iso,
        groupId: 'regions'
      };
      sortedOptions = [...sortedOptions.slice(0, 10), othersOption];
    }
    return sortedOptions;
  }
);

const getLegendOptionsWithOthers = (legendDataOptions, yColumnOptions) => {
  if (!yColumnOptions) return legendDataOptions;
  const otherOption = yColumnOptions.find(o => o.iso === 'OTHERS');
  if (!otherOption) return legendDataOptions;
  return [...legendDataOptions, otherOption];
};

export const getLegendDataOptionsWithOthers = createSelector(
  [getLegendDataOptions, getSortedYColumnOptions],
  getLegendOptionsWithOthers
);

export const getLegendDataSelectedWithOthers = createSelector(
  [getLegendDataSelected, getSortedYColumnOptions],
  getLegendOptionsWithOthers
);

export const getSortedChartDataWithOthers = createSelector(
  [getChartData, getSortedYColumnOptions, getCalculationSelected],
  (data, sortedOptions, selectedCalculation) => {
    if (!data || isEmpty(data)) return null;
    const hasOthers = sortedOptions.find(o => o.iso === 'OTHERS');
    if (!hasOthers) return data;

    const yearValuesOptions = sortedOptions.map(o => o.value);
    return data.map(yearValues => {
      const valuesToDisplay = {};
      let othersValue = 0;
      let othersCount = 0;
      const year = yearValues.x;
      Object.keys(omit(yearValues, 'x')).forEach(columnKey => {
        if (yearValuesOptions.includes(columnKey)) {
          valuesToDisplay[columnKey] = yearValues[columnKey];
        } else {
          const regionValue = yearValues[columnKey];
          if (regionValue) {
            othersValue += yearValues[columnKey];
            othersCount += 1;
          }
        }
      });
      if (
        [
          GHG_CALCULATION_OPTIONS.PER_CAPITA.value,
          GHG_CALCULATION_OPTIONS.PER_GDP.value,
          GHG_CALCULATION_OPTIONS.PERCENTAGE_CHANGE.value
        ].includes(selectedCalculation.value)
      ) {
        // In this cases we want the mean, not the total
        othersValue /= othersCount;
      }
      return { x: year, ...valuesToDisplay, yOthers: othersValue };
    });
  }
);

export const getChartDomain = createSelector(
  [getSortedChartDataWithOthers],
  data => {
    if (!data) return null;
    return {
      x: setXAxisDomain(),
      y: setYAxisDomain()
    };
  }
);

// variable that caches chart elements assigned color
// to avoid element color changing when the chart is updated
let colorThemeCache = {
  yOthers: { stroke: OTHER_COLOR, fill: OTHER_COLOR }
};

const getColorPalette = columns => {
  if (columns.length <= 10) return CHART_COLORS;
  if (columns.length <= 18) return CHART_COLORS_EXTENDED;
  return CHART_COLORS_EXTRA;
};

export const getUnit = metric => {
  let unit = DEFAULT_AXES_CONFIG.yLeft.unit;
  if (metric === GHG_CALCULATION_OPTIONS.PERCENTAGE_CHANGE.value) {
    return '%';
  }
  if (metric === GHG_CALCULATION_OPTIONS.PER_GDP.value) {
    unit = `${unit}/ million $ GDP`;
  } else if (metric === GHG_CALCULATION_OPTIONS.PER_CAPITA.value) {
    unit = `${unit} per capita`;
  }
  return unit;
};

export const getChartConfig = createSelector(
  [
    getModelSelected,
    getMetricSelected,
    getSortedYColumnOptions,
    getCalculationSelected
  ],
  (model, metric, yColumns, calculationSelected) => {
    if (!model || !yColumns) return null;
    const colorPalette = getColorPalette(yColumns);
    const isPercentageChangeCalculation =
      calculationSelected.value ===
      GHG_CALCULATION_OPTIONS.PERCENTAGE_CHANGE.value;
    colorThemeCache = getThemeConfig(yColumns, colorPalette, colorThemeCache);
    const tooltip = getTooltipConfig(yColumns.filter(c => c && !c.hideLegend));
    const unit = getUnit(metric);
    return {
      axes: {
        ...DEFAULT_AXES_CONFIG,
        yLeft: {
          ...DEFAULT_AXES_CONFIG.yLeft,
          unit,
          suffix: isPercentageChangeCalculation ? '' : 't'
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

export const getDataZoomData = createSelector(
  [getSortedChartDataWithOthers],
  data => {
    if (!data) return null;
    const t = data.map(d => {
      const updatedD = {};
      updatedD.x = d.x;
      const intermediateD = { ...d };
      delete intermediateD.x;
      updatedD.total = Object.values(intermediateD).reduce(
        (acc, value) => acc + value,
        0
      );
      return updatedD;
    });
    return t;
  }
);

export const getLoading = createSelector(
  [getChartConfig, state => state.ghgEmissionsMeta, state => state.emissions],
  (chartConfig, meta, data) =>
    (meta && meta.loading) || (data && data.loading) || !chartConfig || false
);

export const getHideRemoveOptions = createSelector(
  [getShouldExpandRegions, getShouldExpandSectors, getShouldExpandGases],
  (shouldExpandRegions, shouldExpandSectors, shouldExpandGases) =>
    shouldExpandRegions || shouldExpandSectors || shouldExpandGases
);
