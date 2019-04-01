import { createSelector } from 'reselect';
import { format } from 'd3-format';

const getSections = routeData => routeData.route.sections || null;

const getGhgEmissionsData = state =>
  (state.emissions && state.emissions.data) || null;

const AGRICULTURE_SECTOR = 'Agriculture';
const TOTAL_SECTOR = 'Total excluding LUCF';

export const getAnchorLinks = createSelector([getSections], sections =>
  sections.filter(route => route.anchor).map(route => ({
    label: route.label,
    path: route.path,
    hash: route.hash,
    component: route.component
  }))
);

const getWorldwideGhgEmissionsData = createSelector(
  [getGhgEmissionsData],
  data => {
    if (!data || !data.length) return null;
    const emissionsData = data.filter(({ iso_code3 }) => iso_code3 === 'WORLD');
    return emissionsData;
  }
);

export const getWorldwidePercentageAgricultureEmission = createSelector(
  [getWorldwideGhgEmissionsData],
  data => {
    if (!data || !data.length) return null;
    const agricultureEmissions = data.find(
      ({ sector }) => sector && sector === AGRICULTURE_SECTOR
    );
    const totalEmission = data.find(
      ({ sector }) => sector && sector === TOTAL_SECTOR
    );

    if (
      !agricultureEmissions ||
      !agricultureEmissions.emissions ||
      !totalEmission ||
      !totalEmission.emissions
    ) {
      return null;
    }
    const { emissions } = agricultureEmissions;
    const lastYear = Math.max(...emissions.map(({ year }) => year));
    const lastYearAgricultureEmission = emissions.find(
      ({ year }) => year === lastYear
    );
    const lastYearTotalEmission = totalEmission.emissions.find(
      ({ year }) => year === lastYear
    );

    return `${format('.2f')(
      lastYearAgricultureEmission.value * 100 / lastYearTotalEmission.value
    )}%`;
  }
);
