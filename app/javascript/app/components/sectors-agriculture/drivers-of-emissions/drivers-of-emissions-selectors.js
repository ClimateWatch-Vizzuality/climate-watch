import { createSelector, createStructuredSelector } from 'reselect';
import qs from 'query-string';
import {
  getYColumnValue,
  getThemeConfig,
  getTooltipConfig,
  setChartColors,
  getColumnValue,
  getPieChartThemeConfig
} from 'utils/graphs';
import {
  CHART_COLORS,
  CHART_COLORS_EXTENDED,
  GREY_CHART_COLORS,
  DEFAULT_AXES_CONFIG
} from 'data/constants';
import { format } from 'd3-format';
import {
  emissionTabs,
  HISTORICAL_EMISSIONS,
  AGRICULTURE_SUBSECTORS
} from './drivers-of-emissions-data';

const getSourceSelection = state =>
  (state.location && state.location.search) || null;
const getData = state => state.data || null;
const getCountriesData = state => state.countriesData || null;
const getGhgEmissionsData = state =>
  (state.ghgEmissions && state.ghgEmissions.data) || null;
const getGhgEmissionsLoading = state =>
  (state.ghgEmissions && state.ghgEmissions.loading) || false;

const GHG_DEFAULT_FILTER = {
  gas: 49,
  location: 'WORLD',
  source: 13
};

const AGRICULTURE_COLOR = '#0677B3';

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

/**  COUNTRIES SELECTORS */
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

/** LINE CHART SELECTORS */
export const getAgricultureSubsectorsData = createSelector([getData], data =>
  data.filter(({ emission_subcategory: { short_name } }) =>
    AGRICULTURE_SUBSECTORS.includes(short_name)
  )
);

export const getChartData = createSelector(
  [getAgricultureSubsectorsData],
  data => {
    if (!data || !data.length) return null;
    const xValues = Object.keys(data[0].values).map(key => parseInt(key, 10));
    const dataParsed = xValues.map(x => {
      const yItems = {};
      data.forEach(d => {
        const yKey = getYColumnValue(d.emission_subcategory.name);
        const yData = d.values[x];
        yItems[yKey] = yData ? parseFloat(yData) : undefined;
      });
      return { x, ...yItems };
    });
    return dataParsed;
  }
);

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

let colorThemeCache = {};

export const getChartConfig = createSelector(
  [getChartData, getYColumns],
  (data, yColumns) => {
    if (!data || !yColumns) return null;

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

export const getFilterOptions = createSelector([getYColumns], yColumns => {
  if (!yColumns) return null;
  return yColumns.map(column => ({ ...column, groupId: 'subSectors' }));
});

/** PIE-CHART SELECTORS */
export const getGhgEmissionsFilter = createSelector(
  [getEmissionCountrySelected],
  selectedCountry => {
    if (!selectedCountry) return GHG_DEFAULT_FILTER;
    return { ...GHG_DEFAULT_FILTER, location: selectedCountry.value };
  }
);

export const getPieChartData = createSelector([getGhgEmissionsData], data => {
  if (!data || !data.length) return null;

  const sectorsLastYearEmission = data
    .map(({ emissions, sector, location }) => {
      const lastYearEmission = emissions[emissions.length - 1];
      return { sector, location, ...lastYearEmission };
    })
    .filter(({ value }) => value > 0); // filter for negative emission for Forestry sector

  if (!sectorsLastYearEmission) return null;
  const totalEmission = sectorsLastYearEmission.reduce(
    (acc, emission) => acc + emission.value,
    0
  );

  const sectorEmissions = sectorsLastYearEmission.map(({ sector, value }) => ({
    name: getColumnValue(sector).toLowerCase(),
    value,
    sector,
    formattedValue: `${format('.2s')(value)}`,
    formattedPercentage: `${format('.2f')(value * 100 / totalEmission)}%`,
    percentageValue: value * 100 / totalEmission
  }));

  const agricultureRow = sectorEmissions.find(
    ({ name }) => name === 'agriculture'
  );
  const sectorsEmissionsData = [
    agricultureRow,
    ...sectorEmissions.filter(({ name }) => name !== 'agriculture')
  ];
  const { location, year } = sectorsLastYearEmission[0];

  return {
    year,
    location,
    data: sectorsEmissionsData
  };
});

export const getPieChartConfig = createSelector(
  [getPieChartData],
  pieChartData => {
    if (!pieChartData) return null;
    const { data } = pieChartData;
    const columns = data.map(({ sector }) => ({
      label: sector,
      value: getColumnValue(sector).toLowerCase()
    }));

    const tooltip = getTooltipConfig(columns);
    let theme = getPieChartThemeConfig(columns, GREY_CHART_COLORS);
    const agricultureTheme = {
      ...theme.agriculture,
      stroke: AGRICULTURE_COLOR
    };
    theme = { ...theme, agriculture: agricultureTheme };

    const config = {
      tooltip,
      animation: true,
      axes: {
        yLeft: {
          unit: 'MtCO2e',
          label: '2014'
        }
      },
      theme,
      innerRadius: 50,
      outerRadius: 90,
      hideLabel: true,
      hideLegend: true
    };

    return config;
  }
);

export const getPieChartPayload = createSelector(
  [getPieChartData, getPieChartConfig, getGhgEmissionsLoading],
  (pieChartData, config, loading) => {
    if (!pieChartData || !config) return null;

    const { location, year, data } = pieChartData;
    const color = AGRICULTURE_COLOR;

    return {
      location,
      year: `${year}`,
      data,
      config,
      color,
      loading
    };
  }
);

export const getAllData = createStructuredSelector({
  activeTab: getEmissionsTabSelected,
  data: getChartData,
  config: getChartConfig,
  domain: getChartDomain,
  filters: getFilterOptions,
  countries: getCountriesOptions,
  emissionsCountry: getEmissionCountrySelected,
  ghgEmissionsFilters: getGhgEmissionsFilter,
  pieChartData: getPieChartPayload
});
