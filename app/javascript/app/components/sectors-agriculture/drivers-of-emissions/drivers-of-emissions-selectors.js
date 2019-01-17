import { createSelector, createStructuredSelector } from 'reselect';
import qs from 'query-string';
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

import {
  emissionTabs,
  HISTORICAL_EMISSIONS,
  AGRICULTURE_SUBSECTORS
} from './drivers-of-emissions-data';

const getSourceSelection = state =>
  (state.location && state.location.search) || null;
const getData = state => state.data || null;
const getCountriesData = state => state.countriesData || null;

export const getAgricultureSubsectorsData = createSelector(
  [getData],
  data => data.filter(({ emission_subcategory: { short_name } }) =>
    AGRICULTURE_SUBSECTORS.includes(short_name)
  )
);

export const getChartData = createSelector([getAgricultureSubsectorsData], data => {
  if (!data || !data.length) return null;
  const xValues = Object.keys(data[0].values).map(key => parseInt(key, 10));
  const dataParsed = xValues.map(x => {
    const yItems = {};
    data.forEach(d => {
      const yKey = getYColumnValue(d.emission_subcategory.name);
      const yData = d.values[x];
      yItems[yKey] = yData ? parseFloat(yData) : 0;
    });
    return { x, ...yItems };
  });
  return dataParsed;
});

export const getChartDomain = createSelector([getChartData], data => {
  if (!data) return null;
  return { x: ['auto', 'auto'], y: [0, 'auto'] };
});

const getYColumns = createSelector([getAgricultureSubsectorsData], data => {
  if (!data || !data.length) return null;
  return data
    .map(({ emission_subcategory: { name } }) => ({
      label: name,
      value: getYColumnValue(name)
    }))
    .filter(y => y !== 'x');
});

export const getEmissionsTabSelected = createSelector(
  [getSourceSelection],
  selectedEmissionOption => {
    if (!selectedEmissionOption) {
      const defaultSource = emissionTabs.find(
        ({ value }) => value === HISTORICAL_EMISSIONS
      );
      return defaultSource || emissionTabs[0];
    }
    const { tab } = qs.parse(selectedEmissionOption);
    const selectedTab = emissionTabs.find(({ value }) => value === tab);
    return selectedTab ? selectedTab.value : emissionTabs[0];
  }
);

let colorThemeCache = {};

export const getChartConfig = createSelector(
  [getChartData, getYColumns],
  (data, yColumns) => {
    if (!data) return null;
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
      axes: DEFAULT_AXES_CONFIG,
      theme: colorThemeCache,
      tooltip,
      columns: {
        x: [{ label: 'emission', value: 'x' }],
        y: yColumns
      }
    };
  }
);

export const getCountriesOptions = createSelector(
  [getCountriesData],
  countries => {
    if (!countries) return null;
    return countries.map(d => ({
      label: d.wri_standard_name,
      value: d.iso_code3
    }));
  }
);

export const getEmissionCountrySelected = createSelector(
  [getSourceSelection, getCountriesOptions],
  (selectedEmissionOption, countriesOptions) => {
    if (!countriesOptions || !selectedEmissionOption) return null;
    if (!selectedEmissionOption) {
      const defaultCountry = countriesOptions.find(
        ({ value }) => value === 'AFG'
      );
      return defaultCountry || countriesOptions[0];
    }
    const { emissionsCountry } = qs.parse(selectedEmissionOption);
    const selectedCountry = countriesOptions.find(
      ({ value }) => value === emissionsCountry
    );
    return selectedCountry || countriesOptions[0];
  }
);

export const getFilterOptions = createSelector([getYColumns], yColumns => {
  if (!yColumns) return null;
  return yColumns.map(column => ({ ...column, groupId: 'subSectors' }));
});

// export const getPieChartData = createSelector(
//   [getChartData],
//   (data) => ({
//     name: 'Location name',
//     year: 1923,
//     data: [
//       { name: 'Location name', value: 2400 },
//       { name: 'Group B', value: 4567 },
//       { name: 'Group C', value: 1398 },
//       { name: 'Group D', value: 9800 },
//       { name: 'Group E', value: 3908 },
//       { name: 'Group F', value: 4800 }
//     ]
//   })
// );

export const getAllData = createStructuredSelector({
  activeTab: getEmissionsTabSelected,
  data: getChartData,
  config: getChartConfig,
  domain: getChartDomain,
  // pieChartData: getPieChartData,
  filters: getFilterOptions,
  countries: getCountriesOptions,
  emissionsCountry: getEmissionCountrySelected
});
