import { createSelector } from 'reselect';
import { getTooltipConfig, getColumnValue, getPieChartThemeConfig } from 'utils/graphs';
import { GREY_CHART_COLORS, UNITS } from 'data/constants';
import { format } from 'd3-format';
import getIsoCode from './location-selectors';

const AGRICULTURE_COLOR = '#0677B3';
const TOTAL_EXCLUDING_LUCF = 'Total excluding LUCF';
const TOTAL_INCLUDING_LUCF = 'Total including LUCF';
const INCLUDED_SECTORS = [
  'Agriculture',
  'Energy',
  'Industrial Processes',
  'Waste' /** , 'Land-Use Change and Forestry' */
];

const getGhgEmissionsData = state => (state.emissions && state.emissions.data) || null;
const getGhgEmissionsLoading = state => (state.emissions && state.emissions.loading) || false;

const getGhgEmissionsDataByLocation = createSelector(
  [getGhgEmissionsData, getIsoCode],
  (data, isoCode) => {
    if (!data || !data.length || !isoCode) return null;
    const emissionsData = data.filter(({ iso_code3 }) => iso_code3 === isoCode);
    return emissionsData;
  }
);

const API_SCALE = 1000000; // GHG emission data MtCO2e, we convert to tCO2e

export const getPieChartData = createSelector([getGhgEmissionsDataByLocation], data => {
  if (!data || !data.length) return null;
  const lastYearEmissions = data.map(({ emissions, sector, location }) => {
    const lastYearEmission = emissions[emissions.length - 1];
    return { sector, location, ...lastYearEmission };
  });

  const totalIncludingLUCF = lastYearEmissions.find(
    ({ sector }) => sector && sector === TOTAL_INCLUDING_LUCF
  );
  const totalExcludingLUCF = lastYearEmissions.find(
    ({ sector }) => sector && sector === TOTAL_EXCLUDING_LUCF
  );

  const filteredEmissions = lastYearEmissions.filter(
    ({ sector, value }) => value > 0 && INCLUDED_SECTORS.includes(sector)
  ); // filter for negative emission for Forestry sector and total LUCF sectors

  if (!filteredEmissions || !totalIncludingLUCF || !totalExcludingLUCF) return null;

  const formatEmissionValue = value => {
    const formatted = `${format('.3s')(value * API_SCALE)}t${UNITS.CO2e}`;
    const onlyNumber = parseFloat(formatted);
    const rest = formatted.replace(onlyNumber, '');
    return `${onlyNumber} ${rest}`;
  };
  const formatPercentage = (value) => `${format('.2f')(value)}%`;
  const emissionObject = (value, total) => ({
    value,
    percentageValue: (value * 100) / total,
    get formattedValue() {
      return formatEmissionValue(this.value);
    },
    get formattedPercentage() {
      return formatPercentage(this.percentageValue);
    }
  });

  const sectorEmissions = filteredEmissions.map(({ sector, value }) => ({
    name: getColumnValue(sector).toLowerCase(),
    sector,
    ...emissionObject(value, totalExcludingLUCF.value)
  }));

  const agricultureRow = sectorEmissions.find(({ name }) => name === 'agriculture');

  if (!agricultureRow) return null;

  return {
    year: filteredEmissions[0] && String(filteredEmissions[0].year),
    location: filteredEmissions[0] && filteredEmissions[0].location,
    agricultureEmissions: {
      includingLUCF: emissionObject(agricultureRow.value, totalIncludingLUCF.value),
      excludingLUCF: emissionObject(agricultureRow.value, totalExcludingLUCF.value)
    },
    totalExcludingLUCF: formatEmissionValue(totalExcludingLUCF.value),
    totalIncludingLUCF: formatEmissionValue(totalIncludingLUCF.value),
    data: sectorEmissions
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
    innerRadius: '50%',
    hideLabel: true,
    hideLegend: true
  };

  return config;
});

export const getPieChartPayload = createSelector(
  [getPieChartData, getPieChartConfig, getGhgEmissionsLoading],
  (pieChartData, config, loading) => {
    if (!pieChartData || !config) return null;

    return {
      ...pieChartData,
      color: AGRICULTURE_COLOR,
      config,
      loading
    };
  }
);
