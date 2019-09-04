import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
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
  setYAxisDomain,
  sortEmissionsByValue
} from 'utils/graphs';
import {
  DATA_SCALE,
  DEFAULT_AXES_CONFIG,
  GHG_TABLE_HEADER,
  NEW_CHART_COLORS_BASIC,
  NEW_CHART_COLORS,
  NEW_CHART_COLORS_EXTENDED,
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

const getShouldExpand = filter =>
  createSelector(
    [getModelSelected, getOptionsSelected],
    (modelSelected, selectedOptions) => {
      const model = modelSelected && toPlural(modelSelected);
      const dataSelected = selectedOptions[`${filter}Selected`];

      if (!selectedOptions || !model || model !== filter || !dataSelected) {
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
    const sortedCountries = countryOptions.sort(byLatestYearEmission);

    if (data && sortedCountries.length > LEGEND_LIMIT) {
      const othersGroup =
        data && sortedCountries.slice(LEGEND_LIMIT, -1).filter(o => o);
      const othersOption = {
        iso: 'OTHERS',
        label: 'Others',
        value: 'OTHERS',
        expandsTo: othersGroup.map(o => o.iso),
        expandedOptionValue: expandedOption.iso,
        groupId: 'regions'
      };
      return data && [...sortedCountries.slice(0, LEGEND_LIMIT), othersOption];
    }

    return sortedCountries;
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

const getExpandedData = createSelector(
  [getData, getLegendDataSelected],
  (data, legendDataSelected) => {
    if (!legendDataSelected || !data || !data.length) return null;
    const othersOption = legendDataSelected.find(o => o.iso === 'OTHERS');
    if (!othersOption) return data;

    // could be WORLD or any other region
    const expandedRegionISOCode = othersOption.expandedOptionValue;
    const expandedRegionData = data.filter(
      d => d.iso_code3 === expandedRegionISOCode
    );

    let othersEmissionByYear = {};
    const regionBelongsToOthers = d =>
      othersOption.expandsTo.includes(d.iso_code3);

    const sumEmissionsByYear = dataCollection => {
      const result = {};

      dataCollection.forEach(d => {
        d.emissions.forEach(e => {
          result[e.year] = (result[e.year] || 0) + e.value;
        });
      });

      return result;
    };

    // if expanded region like for example WORLD has it's own data line
    // then use that Total value to calculate Others value
    if (expandedRegionData.length) {
      const expandedCountriesISOCodes = legendDataSelected
        .filter(o => o.iso !== 'OTHERS')
        .map(o => o.iso);
      const expandedCountriesEmissionByYear = sumEmissionsByYear(
        data.filter(d => expandedCountriesISOCodes.includes(d.iso_code3))
      );
      const regionDataEmissionsByYear = sumEmissionsByYear(expandedRegionData);

      Object.keys(regionDataEmissionsByYear).forEach(year => {
        othersEmissionByYear[year] =
          regionDataEmissionsByYear[year] -
          expandedCountriesEmissionByYear[year];
      });
    } else {
      othersEmissionByYear = sumEmissionsByYear(
        data.filter(regionBelongsToOthers)
      );
    }

    const othersData = {
      iso_code3: 'OTHERS',
      location: 'Others',
      emissions: Object.keys(othersEmissionByYear).map(year => ({
        year: Number(year),
        value: othersEmissionByYear[year]
      }))
    };

    return [...data.filter(d => !regionBelongsToOthers(d)), othersData];
  }
);

const getSortedData = createSelector(getExpandedData, data => {
  if (!data || isEmpty(data)) return null;
  return sortEmissionsByValue(data);
});

const getYColumnOptions = createSelector(
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
    getModelSelected,
    getYColumnOptions,
    getMetricSelected,
    getCalculationData
  ],
  (data, regions, model, yColumnOptions, metric, calculationData) => {
    if (!data || !data.length || !model || !calculationData || !regions) {
      return null;
    }
    const yearValues = data[0].emissions.map(d => d.year);
    const metricField = {
      PER_CAPITA: 'population',
      PER_GDP: 'gdp'
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

    const expandRegionToCountries = iso => {
      const region = regions.find(r => r.iso_code3 === iso);
      if (!region || !region.members) return iso;
      return flatMap(region.members, expandRegionToCountries);
    };
    const expandRegionsToCountries = isos =>
      uniq(flatMap(isos, expandRegionToCountries));

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
        const dataForColumn =
          groupedData[column.label] || expandedData(column) || [];
        const key = column.value;
        let totalValue = null;
        let totalMetric = null;

        dataForColumn.forEach(d => {
          if (!isBreakByRegions && memberOfRegionWithOwnData(d)) return;

          const yearEmissions = d.emissions.find(e => e.year === year);
          const metricRatio = shouldHaveMetricData
            ? getMetricData(year, d.iso_code3, column)
            : 1;

          if (yearEmissions && yearEmissions.value && metricRatio) {
            totalValue += yearEmissions.value;
            totalMetric = shouldHaveMetricData ? totalMetric + metricRatio : 1;
          }
        });

        if (totalValue !== null && totalMetric !== null) {
          yItems[key] = totalValue * (DATA_SCALE / totalMetric);
        } else {
          yItems[key] = null;
        }
      });

      return {
        x: year,
        ...yItems
      };
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

const getColorPalette = columns => {
  if (columns.length <= 10) return NEW_CHART_COLORS_BASIC;
  if (columns.length <= 20) return NEW_CHART_COLORS;
  return NEW_CHART_COLORS_EXTENDED;
};

const getUnit = metric => {
  let unit = DEFAULT_AXES_CONFIG.yLeft.unit;
  if (metric === 'PER_GDP') {
    unit = `${unit}/ million $ GDP`;
  } else if (metric === 'PER_CAPITA') {
    unit = `${unit} per capita`;
  }
  return unit;
};

export const getChartConfig = createSelector(
  [getModelSelected, getMetricSelected, getYColumnOptions],
  (model, metric, yColumns) => {
    if (!model || !yColumns) return null;
    const colorPalette = getColorPalette(yColumns);
    colorThemeCache = getThemeConfig(yColumns, colorPalette, colorThemeCache);
    const tooltip = getTooltipConfig(yColumns.filter(c => c && !c.hideLegend));
    const unit = getUnit(metric);
    return {
      axes: {
        ...DEFAULT_AXES_CONFIG,
        yLeft: {
          ...DEFAULT_AXES_CONFIG.yLeft,
          unit,
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

export const getTableData = createSelector(
  [getChartData, getMetricSelected, getModelSelected, getYColumnOptions],
  (data, metric, model, yColumnOptions) => {
    if (!data || !model || !data.length || !yColumnOptions) return null;

    const isAbsoluteValue = metric === 'ABSOLUTE_VALUE';
    const scale = isAbsoluteValue ? 1000000 : 1; // to convert tCO2e to MtCO2e if not gdp or population metric
    const scaleString = isAbsoluteValue ? 'Mt' : 't';
    const formatValue = value => value && Number((value / scale).toFixed(2));
    const unit = `${scaleString}${getUnit(metric)}`;

    const pivot = yColumnOptions.map(c => ({
      [GHG_TABLE_HEADER[model]]: c.label,
      unit,
      ...data.reduce(
        (acc, d) => ({
          ...acc,
          [String(d.x)]: formatValue(d[c.value]) // year: value
        }),
        {}
      )
    }));

    return pivot;
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
