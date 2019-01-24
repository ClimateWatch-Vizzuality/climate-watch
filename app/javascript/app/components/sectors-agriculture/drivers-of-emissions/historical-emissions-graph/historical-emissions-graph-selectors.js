import { createSelector, createStructuredSelector } from 'reselect';
import qs from 'query-string';
import { uniqBy, has } from 'lodash';
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

const getSourceSelection = state =>
  (state.location && state.location.search) || null;
const getCountries = state => state.countries || null;
const getRegions = state => state.regions || null;
const getAgricultureEmissionsData = state =>
  (state.agricultureEmissions && state.agricultureEmissions.data) || null;
const getAgricultureEmissionsLoading = state =>
  (state.agricultureEmissions && state.agricultureEmissions.loading) || false;
const getGhgEmissionsData = state =>
  (state.ghgEmissions && state.ghgEmissions.data) || null;
const getGhgEmissionsLoading = state =>
  (state.ghgEmissions && state.ghgEmissions.loading) || false;
const getGhgSources = state =>
  (has(state, 'ghgEmissionsMeta.meta.data_source') &&
    state.ghgEmissionsMeta.meta.data_source) ||
  null;
const getGhgGas = state =>
  (has(state, 'ghgEmissionsMeta.meta.gas') &&
    state.ghgEmissionsMeta.meta.gas) ||
  null;

const API_SCALE = 0.001; // converting from Gigagrams to Megatonnes ( 1 Gg = 0.001 Mt)
const AGRICULTURE_COLOR = '#0677B3';

/**  LOCATIONS SELECTORS */
const getCountriesOptions = createSelector([getCountries], countries => {
  if (!countries) return null;
  return countries.map(d => ({
    label: d.wri_standard_name,
    value: d.iso_code3
  }));
});

const getRegionsOptions = createSelector([getRegions], regions => {
  if (!regions) return null;
  return regions.map(d => ({
    label: d.wri_standard_name,
    value: d.iso_code3
  }));
});

const getLocationsOptions = createSelector(
  [getCountriesOptions, getRegionsOptions],
  (countries, regions) => {
    if (!countries || !countries.length || !regions || !regions.length) {
      return [];
    }
    return [...countries, ...regions];
  }
);

const getGhgEmissionGas = createSelector([getGhgGas], gases => {
  if (!gases) return null;
  const defaultGas = gases.find(s => s.label === 'All GHG');
  return defaultGas || gases[0];
});

const getGhgEmissionSource = createSelector([getGhgSources], sources => {
  if (!sources) return null;
  const defaultSource = sources.find(s => s.label === 'CAIT');
  return defaultSource || sources[0];
});

const getEmissionCountrySelected = createSelector(
  [getSourceSelection, getLocationsOptions],
  (selectedEmissionOption, countriesOptions) => {
    if (!countriesOptions) return null;
    const defaultCountry = countriesOptions.find(
      ({ value }) => value === 'WORLD'
    );
    if (!selectedEmissionOption) {
      return defaultCountry || countriesOptions[0];
    }
    const { emissionCountry } = qs.parse(selectedEmissionOption);
    const selectedCountry = countriesOptions.find(
      ({ value }) => value === emissionCountry
    );
    return selectedCountry || defaultCountry;
  }
);

/** LINE CHART SELECTORS */
const getAgricultureEmissionTypes = createSelector(
  [getAgricultureEmissionsData],
  data => {
    if (!data) return null;
    const emissionTypes = data
      .map(({ emission_subcategory: { category_name, category_id } }) => ({
        label: category_name,
        value: `${category_id}`
      }))
      .filter(({ label }) => label);
    return uniqBy(emissionTypes, 'value');
  }
);

const getEmissionTypeSelected = createSelector(
  [getSourceSelection, getAgricultureEmissionTypes],
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

const getAgricultureSubsectorsData = createSelector(
  [getAgricultureEmissionsData, getEmissionTypeSelected],
  (data, emissionType) => {
    if (!data || !emissionType) return null;
    return data.filter(
      ({ emission_subcategory: { category_id } }) =>
        `${category_id}` === emissionType.value
    );
  }
);

const getChartData = createSelector([getAgricultureSubsectorsData], data => {
  if (!data || !data.length) return null;
  const xValues = Object.keys(data[0].values).map(key => parseInt(key, 10));
  const dataParsed = xValues.map(x => {
    const yItems = {};
    data.forEach(d => {
      const yKey = getYColumnValue(d.emission_subcategory.name);
      const yData = d.values[x];
      yItems[yKey] = yData ? parseFloat(yData) * API_SCALE : undefined;
    });
    return { x, ...yItems };
  });
  return dataParsed;
});

const getChartDomain = createSelector([getChartData], data => {
  if (!data) return null;
  return { x: ['auto', 'auto'], y: [0, 'auto'] };
});

const getYColumns = createSelector([getAgricultureSubsectorsData], data => {
  if (!data || !data.length) return null;
  const yColumns = data
    .map(({ emission_subcategory: { name } }) => ({
      label: name,
      value: getYColumnValue(name)
    }))
    .filter(y => y !== 'x');
  const yUniqColumns = uniqBy(yColumns, 'value');
  return yUniqColumns;
});

let colorThemeCache = {};

const getChartConfig = createSelector(
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
      axes: {
        ...DEFAULT_AXES_CONFIG,
        yLeft: { ...DEFAULT_AXES_CONFIG.yLeft, unit: 'MtCO2e' }
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

const getFilterOptions = createSelector([getYColumns], yColumns => {
  if (!yColumns) return null;
  return yColumns.map(column => ({ ...column, groupId: 'subSectors' }));
});

/** PIE-CHART SELECTORS */
const getGhgEmissionsFilter = createSelector(
  [getEmissionCountrySelected, getGhgEmissionSource, getGhgEmissionGas],
  (selectedCountry, source, gas) => {
    if (!selectedCountry || !source || !gas) return null;
    return {
      location: selectedCountry.value,
      source: source.value,
      gas: gas.value
    };
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
  const sectorsEmissionsData = agricultureRow
    ? [
      agricultureRow,
      ...sectorEmissions.filter(({ name }) => name !== 'agriculture')
    ]
    : sectorEmissions;
  const { location, year } = sectorsLastYearEmission[0];

  return {
    year,
    location,
    emissionValue: agricultureRow && agricultureRow.formattedValue,
    emissionPercentage: agricultureRow && agricultureRow.formattedPercentage,
    data: sectorsEmissionsData
  };
});

const getPieChartConfig = createSelector([getPieChartData], pieChartData => {
  if (!pieChartData || !pieChartData.data || !pieChartData.data.length) {
    return null;
  }
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
    theme,
    innerRadius: 50,
    outerRadius: 90,
    hideLabel: true,
    hideLegend: true
  };

  return config;
});

const getPieChartPayload = createSelector(
  [getPieChartData, getPieChartConfig, getGhgEmissionsLoading],
  (pieChartData, config, loading) => {
    if (!pieChartData || !config) return null;

    const {
      location,
      year,
      emissionValue,
      emissionPercentage,
      data
    } = pieChartData;
    const color = AGRICULTURE_COLOR;

    return {
      location,
      year: `${year}`,
      emissionValue,
      emissionPercentage,
      data,
      config,
      color,
      loading
    };
  }
);

// TO DO
// const getButtonGroupConfig = createSelector();

export const getAllData = createStructuredSelector({
  data: getChartData,
  loading: getAgricultureEmissionsLoading,
  config: getChartConfig,
  domain: getChartDomain,
  filters: getFilterOptions,
  locations: getLocationsOptions,
  emissionsCountry: getEmissionCountrySelected,
  ghgEmissionsFilters: getGhgEmissionsFilter,
  pieChartData: getPieChartPayload,
  emissionTypes: getAgricultureEmissionTypes,
  emissionType: getEmissionTypeSelected
});
