import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { GHG_TABLE_HEADER } from 'data/constants';
import { europeSlug } from 'app/data/european-countries';
import {
  getRegions,
  getCountries,
  getData,
  getDataZoomYears
} from './ghg-emissions-selectors-get';
import {
  getModelSelected,
  getMetricSelected,
  getCalculationSelected,
  getOptionsSelected,
  getOptions
} from './ghg-emissions-selectors-filters';
import {
  getUnit,
  getCalculationData,
  getChartDataFunction,
  getShouldExpandRegions,
  getSortedDataFunction,
  getYColumnOptionsFunction,
  getLegendDataSelectedFunction,
  getExpandedLegendSectorsSelected,
  getExpandedLegendGasesSelected,
  getExpandedLegendRegionsSelectedFunction
} from './ghg-emissions-selectors-data';

// Reused selectors without Others option

const getExpandedLegendRegionsSelected = createSelector(
  [getOptions, getOptionsSelected, getShouldExpandRegions, getData],
  getExpandedLegendRegionsSelectedFunction
);

const getLegendDataSelectedWithoutOthers = createSelector(
  [
    getModelSelected,
    getOptions,
    getOptionsSelected,
    getExpandedLegendRegionsSelected,
    getExpandedLegendSectorsSelected,
    getExpandedLegendGasesSelected
  ],
  getLegendDataSelectedFunction
);

const getYColumnOptionsWithoutOthers = createSelector(
  [getLegendDataSelectedWithoutOthers],
  getYColumnOptionsFunction
);
const getSortedDataWithoutOthers = createSelector(
  getData,
  getSortedDataFunction
);
const getChartDataWithoutOthers = createSelector(
  [
    getSortedDataWithoutOthers,
    getRegions,
    getModelSelected,
    getYColumnOptionsWithoutOthers,
    getMetricSelected,
    getCalculationData,
    getCalculationSelected,
    getDataZoomYears
  ],
  getChartDataFunction
);

// Table selectors

export const getTableData = createSelector(
  [
    getChartDataWithoutOthers,
    getMetricSelected,
    getModelSelected,
    getYColumnOptionsWithoutOthers,
    getDataZoomYears
  ],
  (data, metric, model, yColumnOptions, dataZoomSelectedYears) => {
    if (!data || !model || !data.length || !yColumnOptions) return null;
    const isAbsoluteValue = metric === 'ABSOLUTE_VALUE';
    const scale = isAbsoluteValue ? 1000000 : 1; // to convert tCO2e to MtCO2e if not gdp or population metric
    const scaleString = isAbsoluteValue ? 'Mt' : 't';
    const formatValue = value => value && Number((value / scale).toFixed(2));
    const unit = `${scaleString}${getUnit(metric)}`;
    const filteredYearValue = (d, c) => {
      if (dataZoomSelectedYears) {
        const { min, max } = dataZoomSelectedYears;
        if ((min && d.x < min) || (max && d.x > max)) {
          return {};
        }
      }
      return { [String(d.x)]: formatValue(d[c.value]) }; // year: value
    };
    return yColumnOptions.map(c => ({
      [GHG_TABLE_HEADER[model]]: c.label,
      unit,
      ...data.reduce(
        (acc, d) => ({
          ...acc,
          ...filteredYearValue(d, c)
        }),
        {}
      )
    }));
  }
);

export const getTitleLinks = createSelector(
  [getTableData, getModelSelected, getRegions, getCountries],
  (data, model, regions, countries) => {
    if (
      !data ||
      isEmpty(data) ||
      !regions ||
      !countries ||
      model !== 'regions'
    ) {
      return null;
    }
    const allRegions = regions
      .filter(r => r.iso_code3 === europeSlug)
      .concat(countries);
    const returnData = data.map(d => {
      const region = allRegions.find(
        r => r.wri_standard_name === d[GHG_TABLE_HEADER.regions]
      );
      return region && region.iso_code3
        ? [
          {
            columnName: GHG_TABLE_HEADER.regions,
            url: `/countries/${region.iso_code3}`
          }
        ]
        : [];
    });
    return returnData;
  }
);
