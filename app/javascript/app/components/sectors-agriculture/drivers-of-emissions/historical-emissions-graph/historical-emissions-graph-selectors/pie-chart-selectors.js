import { createSelector } from 'reselect';
import {
  getTooltipConfig,
  getColumnValue,
  getPieChartThemeConfig
} from 'utils/graphs';
import { GREY_CHART_COLORS } from 'data/constants';
import { format } from 'd3-format';
import { getEmissionCountrySelected } from './ghg-metadata-selectors';

const AGRICULTURE_COLOR = '#0677B3';
const TOTAL_EMISSION = 'Total excluding LUCF';
const INCLUDED_SECTORS = [
  'Agriculture',
  'Energy',
  'Industrial Processes',
  'Waste' /** , 'Land-Use Change and Forestry' */
];

const getGhgEmissionsData = state =>
  (state.ghgEmissions && state.ghgEmissions.data) || null;
const getGhgEmissionsLoading = state =>
  (state.ghgEmissions && state.ghgEmissions.loading) || false;

/** PIE-CHART SELECTORS */
export const getGhgEmissionsDataByLocation = createSelector(
  [getGhgEmissionsData, getEmissionCountrySelected],
  (data, location) => {
    if (!data || !data.length || !location) return null;
    const emissionsData = data.filter(
      ({ iso_code3 }) => iso_code3 === location.value
    );
    return emissionsData;
  }
);

export const getPieChartData = createSelector(
  [getGhgEmissionsDataByLocation],
  data => {
    if (!data || !data.length) return null;
    const lastYearEmissions = data.map(({ emissions, sector, location }) => {
      const lastYearEmission = emissions[emissions.length - 1];
      return { sector, location, ...lastYearEmission };
    });

    const totalLastYearEmission = lastYearEmissions.find(
      ({ sector }) => sector && sector === TOTAL_EMISSION
    ).value;

    const filteredEmissions = lastYearEmissions.filter(
      ({ sector, value }) => value > 0 && INCLUDED_SECTORS.includes(sector)
    ); // filter for negative emission for Forestry sector and total LUCF sectors

    if (!filteredEmissions) return null;

    const sectorEmissions = filteredEmissions.map(({ sector, value }) => ({
      name: getColumnValue(sector).toLowerCase(),
      value,
      sector,
      formattedValue: `${format('.2s')(value)}`,
      formattedPercentage: `${format('.2f')(
        value * 100 / totalLastYearEmission
      )}%`,
      percentageValue: value * 100 / totalLastYearEmission
    }));

    const agricultureRow = sectorEmissions.find(
      ({ name }) => name === 'agriculture'
    );

    if (!agricultureRow) return null;

    const sectorsEmissionsData = agricultureRow
      ? [
        agricultureRow,
        ...sectorEmissions.filter(({ name }) => name !== 'agriculture')
      ]
      : sectorEmissions;

    return {
      year: filteredEmissions[0] && filteredEmissions[0].year,
      location: filteredEmissions[0] && filteredEmissions[0].location,
      emissionValue: agricultureRow && agricultureRow.formattedValue,
      emissionPercentage: agricultureRow && agricultureRow.formattedPercentage,
      data: sectorsEmissionsData
    };
  }
);

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
