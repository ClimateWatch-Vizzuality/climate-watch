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
  setYAxisDomain,
  sortEmissionsByValue
} from 'utils/graphs';
import {
  CHART_COLORS_EXTENDED,
  DATA_SCALE,
  DEFAULT_AXES_CONFIG,
  METRIC_OPTIONS,
  OTHER_COLOR
} from 'data/constants';
import { getWBData, getData } from './ghg-emissions-selectors-get';
import {
  getModelSelected,
  getMetricSelected,
  getOptionsSelected,
  getOptions
} from './ghg-emissions-selectors-filters';

const LEGEND_LIMIT = 10;

const sortData = createSelector(getData, data => {
  if (!data || isEmpty(data)) return null;
  return sortEmissionsByValue(data);
});

const onlyOneRegionSelected = createSelector(
  [getModelSelected, getOptionsSelected],
  (modelSelected, selectedOptions) => {
    const model = modelSelected && toPlural(modelSelected);
    if (!selectedOptions || !model || model !== 'regions' || !selectedOptions.regionsSelected) {
      return false;
    }
    const dataSelected = selectedOptions.regionsSelected;
    return dataSelected.length === 1 && dataSelected[0].groupId === 'regions';
  }
);

const getExpandedLegendRegionsSelected = createSelector(
  [getOptions, getOptionsSelected, onlyOneRegionSelected, sortData],
  (options, selectedOptions, shouldExpandIntoCountries, data) => {
    if (!shouldExpandIntoCountries || !data) return null;

    const dataSelected = selectedOptions.regionsSelected;
    const countryOptions = dataSelected[0].expandsTo.map(iso =>
      options.regions.find(o => o.iso === iso)
    );
    const groupedCountries = data && groupBy(data, 'iso_code3');
    const getLastValue = x => x.emissions[x.emissions.length - 1].value;

    const latestValuesHash = {};
    Object.keys(groupedCountries).forEach(c => {
      latestValuesHash[c] = groupedCountries[c].reduce((acc, v) => acc + getLastValue(v), 0);
    });
    const byLatestYearEmission = (a, b) =>
      (latestValuesHash[a.iso] > latestValuesHash[b.iso] ? -1 : 1);
    const sortedCountries = countryOptions.sort(byLatestYearEmission);

    if (data && sortedCountries.length > LEGEND_LIMIT) {
      const othersGroup = data && sortedCountries.slice(LEGEND_LIMIT, -1).filter(o => o);
      const othersOption = {
        iso: 'OTHERS',
        label: 'Others',
        value: 'OTHERS',
        expandsTo: othersGroup.map(o => o.iso),
        groupId: 'regions'
      };
      return data && [...sortedCountries.slice(0, LEGEND_LIMIT), othersOption];
    }

    return sortedCountries;
  }
);

const onlyOneAggregatedSectorSelected = createSelector(
  [getModelSelected, getOptionsSelected],
  (modelSelected, selectedOptions) => {
    const model = modelSelected && toPlural(modelSelected);
    if (!selectedOptions || !model || model !== 'sectors' || !selectedOptions.sectorsSelected) {
      return false;
    }

    const dataSelected = selectedOptions.sectorsSelected;
    return dataSelected.length === 1 && dataSelected[0].groupId === 'aggregations';
  }
);

const getExpandedLegendSectorsSelected = createSelector(
  [getModelSelected, getOptions, getOptionsSelected, onlyOneAggregatedSectorSelected],
  (modelSelected, options, selectedOptions, shouldExpandIntoSectors) => {
    const model = toPlural(modelSelected);
    if (!shouldExpandIntoSectors) return null;

    const selectedSector = selectedOptions.sectorsSelected[0];
    const sectorOptions = selectedSector.expandsTo.map(id =>
      options[model].find(o => o.value === id)
    );

    return sectorOptions;
  }
);

export const getLegendDataOptions = createSelector(
  [getModelSelected, getOptions],
  (modelSelected, options) => {
    if (!options || !modelSelected || !options[toPlural(modelSelected)]) {
      return null;
    }
    return options[toPlural(modelSelected)];
  }
);

export const getLegendDataSelected = createSelector(
  [
    getModelSelected,
    getOptions,
    getOptionsSelected,
    getExpandedLegendRegionsSelected,
    getExpandedLegendSectorsSelected
  ],
  (
    modelSelected,
    options,
    selectedOptions,
    expandedLegendRegionsSelected,
    expandedLegendSectorsSelected
  ) => {
    const model = toPlural(modelSelected);
    const selectedModel = `${model}Selected`;
    if (!selectedOptions || !modelSelected || !selectedOptions[selectedModel] || !options) {
      return null;
    }
    const dataSelected = selectedOptions[selectedModel];
    if (expandedLegendRegionsSelected) {
      return expandedLegendRegionsSelected.filter(c => c && !c.hideLegend);
    }
    if (expandedLegendSectorsSelected) {
      return expandedLegendSectorsSelected;
    }
    return isArray(dataSelected) ? dataSelected : [dataSelected];
  }
);

const getExpandedData = createSelector(
  [sortData, getLegendDataSelected],
  (data, legendDataSelected) => {
    if (!legendDataSelected || !data) return null;
    const othersOption = legendDataSelected.find(o => o.iso === 'OTHERS');
    if (!othersOption) return data;

    const othEmByYear = {};
    const regionBelongsToOthers = d => othersOption.expandsTo.includes(d.iso_code3);

    data.forEach(d => {
      if (regionBelongsToOthers(d)) {
        d.emissions.forEach(e => {
          othEmByYear[e.year] = (othEmByYear[e.year] || 0) + e.value;
        });
      }
    });

    const othersData = {
      iso_code3: 'OTHERS',
      location: 'Others',
      emissions: Object.keys(othEmByYear).map(year => ({
        year: Number(year),
        value: othEmByYear[year]
      }))
    };

    return [...data.filter(d => !regionBelongsToOthers(d)), othersData];
  }
);

const getYColumnOptions = createSelector([getLegendDataSelected], legendDataSelected => {
  if (!legendDataSelected) return null;
  const getYOption = columns =>
    columns &&
    columns.map(d => ({
      ...d,
      value: d && getYColumnValue(d.label)
    }));
  return uniqBy(getYOption(legendDataSelected), 'value');
});

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

const calculateValue = (currentValue, value, metricData) => {
  const metricRatio = metricData || 1;
  const updatedValue = value || value === 0 ? value * DATA_SCALE / metricRatio : null;
  if (updatedValue && (currentValue || currentValue === 0)) {
    return updatedValue + currentValue;
  }
  return updatedValue || currentValue;
};

export const getChartData = createSelector(
  [getExpandedData, getModelSelected, getYColumnOptions, getMetricSelected, getCalculationData],
  (data, model, yColumnOptions, metric, calculationData) => {
    if (!data || !data.length || !model) return null;
    const yearValues = data[0].emissions.map(d => d.year);
    const shouldHaveMetricData = metric && metric !== METRIC_OPTIONS.ABSOLUTE_VALUE.value;
    let metricField = null;
    if (shouldHaveMetricData) {
      metricField = metric === METRIC_OPTIONS.PER_CAPITA.value ? 'population' : 'gdp';
    }
    const dataParsed = yearValues.map(x => {
      const yItems = {};
      data.forEach(d => {
        const columnObjects = yColumnOptions.filter(
          c =>
            c.label === getDFilterValue(d, model) ||
            (c.expandsTo && c.expandsTo.includes(d.iso_code3))
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
let colorThemeCache = {
  yOthers: { stroke: OTHER_COLOR, fill: OTHER_COLOR }
};

export const getChartConfig = createSelector(
  [getModelSelected, getYColumnOptions],
  (model, yColumns) => {
    if (!model || !yColumns) return null;
    colorThemeCache = getThemeConfig(yColumns, CHART_COLORS_EXTENDED, colorThemeCache);
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

export const getHideRemoveOptions = createSelector(
  [onlyOneRegionSelected, onlyOneAggregatedSectorSelected],
  (oneRegionSelected, oneAggregatedSectorSelected) =>
    oneRegionSelected || oneAggregatedSectorSelected
);
