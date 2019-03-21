import { createSelector } from 'reselect';
import {
  getTooltipConfig,
  getColumnValue,
  getPieChartThemeConfig
} from 'utils/graphs';
import { GREY_CHART_COLORS } from 'data/constants';
import { format } from 'd3-format';

const AGRICULTURE_COLOR = '#0677B3';
const AGGREGATED_SECTORS = ['Total excluding LUCF', 'Total including LUCF'];

const getGhgEmissionsData = state =>
  (state.ghgEmissions && state.ghgEmissions.data) || null;
const getGhgEmissionsLoading = state =>
  (state.ghgEmissions && state.ghgEmissions.loading) || false;

/** PIE-CHART SELECTORS */
export const getPieChartData = createSelector([getGhgEmissionsData], data => {
  if (!data || !data.length) return null;
  const sectorsLastYearEmission = data
    .map(({ emissions, sector, location }) => {
      const lastYearEmission = emissions[emissions.length - 1];
      return { sector, location, ...lastYearEmission };
    })
    .filter(
      ({ sector, value }) => value > 0 && !AGGREGATED_SECTORS.includes(sector)
    ); // filter for negative emission for Forestry sector and total LUCF sectors

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

  return {
    year: sectorsLastYearEmission[0] && sectorsLastYearEmission[0].year,
    location: sectorsLastYearEmission[0] && sectorsLastYearEmission[0].location,
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
    innerRadius: '50%',
    hideLabel: true,
    hideLegend: true
  };

  return config;
});

export default createSelector(
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
