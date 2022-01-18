/* eslint-disable no-confusing-arrow */
import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { CHART_NAMED_EXTENDED_COLORS } from 'app/styles/constants';

const getCountryIndicators = state =>
  state.countryProfileIndicators.data || null;

export const getSectionData = createSelector(
  [getCountryIndicators],
  countryIndicators => {
    const hasCountryIndicators = !isEmpty(countryIndicators);
    if (!countryIndicators || !hasCountryIndicators) return null;
    const employment = [
      { name: 'Oil and gas technologies', value: 900 },
      { name: 'All renewable', value: 843.23 }
    ];
    const employmentMax = Math.max(...employment.map(e => e.value));
    const costs = [{ name: 'costs', value: 220 }];
    const costsMax = Math.max(...costs.map(e => e.value));
    const colors = Object.values(CHART_NAMED_EXTENDED_COLORS);
    return {
      employment: employment.map((e, i) => ({
        ...e,
        percentage: e.value && (e.value / employmentMax) * 100,
        color: colors[i]
      })),
      costs: costs.map((e, i) => ({
        ...e,
        percentage: (e.value / costsMax) * 100,
        color: colors[i]
      }))
    };
  }
);
