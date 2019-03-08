import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
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
import { getWBData, getData, getRegions } from './ghg-emissions-selectors-get';
import {
  getModelSelected,
  getMetricSelected,
  getOptionsSelected,
  getOptions
} from './ghg-emissions-selectors-filters';

const LEGEND_LIMIT = 10;

const getShouldExpandRegions = createSelector(
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
  [getOptions, getOptionsSelected, getShouldExpandRegions, getData],
  (options, selectedOptions, shouldExpandRegions, data) => {
    if (!shouldExpandRegions || !data) return null;

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

const getShouldExpandSectors = createSelector(
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
  [getData, getLegendDataSelected],
  (data, legendDataSelected) => {
    if (!legendDataSelected || !data || !data.length) return null;
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

const getSortedData = createSelector(getExpandedData, data => {
  if (!data || isEmpty(data)) return null;
  return sortEmissionsByValue(data);
});

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

// some regions expands to underlying countries but also have
// their own aggregated data
const getRegionsWithOwnData = (regions, data) => {
  if (!regions || isEmpty(data)) return [];

  const regionsISOs = regions.map(r => r.iso_code3);
  const regionsISOsWithOwnData = uniq(
    data.filter(d => regionsISOs.includes(d.iso_code3)).map(d => d.iso_code3)
  );

  return regions.filter(r => regionsISOsWithOwnData.includes(r.iso_code3));
};

export const getChartData = createSelector(
  [
    getSortedData,
    getRegions,
    getShouldExpandRegions,
    getModelSelected,
    getYColumnOptions,
    getMetricSelected,
    getCalculationData
  ],
  (data, regions, shouldExpandRegions, model, yColumnOptions, metric, calculationData) => {
    if (!data || !data.length || !model || !calculationData || !regions) return null;
    const yearValues = data[0].emissions.map(d => d.year);
    const shouldHaveMetricData = metric && metric !== METRIC_OPTIONS.ABSOLUTE_VALUE.value;
    let metricField = null;
    if (shouldHaveMetricData) {
      metricField = metric === METRIC_OPTIONS.PER_CAPITA.value ? 'population' : 'gdp';
    }

    const regionsWithOwnData = getRegionsWithOwnData(regions, data);
    const regionWithOwnDataMembers = uniq(
      flatMap(regionsWithOwnData, r => r.members.map(m => m.iso_code3))
    );
    const memberOfRegionWithOwnData = d => regionWithOwnDataMembers.includes(d.iso_code3);

    const isBreakByRegions = model === 'regions';
    const groupByKey = isBreakByRegions ? 'location' : model;
    const groupedData = groupBy(data, groupByKey);

    const expandedData = column => {
      if (!column.expandsTo) return null;

      return flatMap(column.expandsTo, e => data.filter(d => d.iso_code3 === e)).filter(d => d);
    };

    const expandRegionToCountries = iso => {
      const region = regions.find(r => r.iso_code3 === iso);
      if (!region || !region.members) return iso;
      return flatMap(region.members, expandRegionToCountries);
    };
    const expandRegionsToCountries = isos => uniq(flatMap(isos, expandRegionToCountries));

    const getMetricData = (year, region, column) => {
      const getMetricForYearAndRegion = (y, r) =>
        metricField &&
        calculationData &&
        calculationData[y] &&
        calculationData[y][r] &&
        calculationData[y][r][metricField];
      let metricData = getMetricForYearAndRegion(year, region);

      // if no metric data for expandable column then use expanded regions to
      // calculate metric data
      if (!metricData && column.expandsTo && column.expandsTo.length) {
        const expandedCountries = expandRegionsToCountries(column.expandsTo);
        metricData = expandedCountries.reduce(
          (acc, iso) => acc + (getMetricForYearAndRegion(year, iso) || 0),
          0
        );
      }

      // GDP is in dollars and we want to display it in million dollars
      if (metricField === 'gdp' && metricData) metricData /= 1000000;

      return metricData;
    };

    const dataParsed = yearValues.map(year => {
      const yItems = {};

      yColumnOptions.forEach(column => {
        const dataForColumn = groupedData[column.label] || expandedData(column) || [];

        dataForColumn.forEach(d => {
          if (!isBreakByRegions && memberOfRegionWithOwnData(d)) return;

          const yearEmissions = d.emissions.find(e => e.year === year);
          const key = column.value;
          const metricData = shouldHaveMetricData && getMetricData(year, d.iso_code3, column);

          if (yearEmissions) {
            yItems[key] = calculateValue(yItems[key], yearEmissions.value, metricData);
          }
        });
      });

      const item = {
        x: year,
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
  [getShouldExpandRegions, getShouldExpandSectors],
  (shouldExpandRegions, shouldExpandSectors) => shouldExpandRegions || shouldExpandSectors
);
