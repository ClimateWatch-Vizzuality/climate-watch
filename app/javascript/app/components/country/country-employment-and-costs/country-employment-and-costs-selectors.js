/* eslint-disable no-confusing-arrow */
import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
// import { CHART_NAMED_EXTENDED_COLORS } from 'app/styles/constants';

const getCountryIndicators = state =>
  state.countryProfileIndicators.data || null;

export const getSectionData = createSelector(
  [getCountryIndicators],
  countryIndicators => {
    const hasCountryIndicators = !isEmpty(countryIndicators);
    if (!countryIndicators || !hasCountryIndicators) return null;
    return {
      employment: {},
      costs: {}
    };
  }
);
