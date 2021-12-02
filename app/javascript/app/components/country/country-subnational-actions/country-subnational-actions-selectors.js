import mapValues from 'lodash/mapValues';
import { createSelector } from 'reselect';

const getCountryProfileIndicators = state =>
  state.countryProfileIndicators && state.countryProfileIndicators.data;

const getIso = state => state.iso || null;

export const getIndicators = createSelector(
  [getCountryProfileIndicators, getIso],
  (indicators, iso) => {
    if (!indicators) return {};

    return mapValues(indicators, indicator => {
      const values = indicator.values.filter(x => x.location === iso);
      return {
        ...indicator,
        value: values[0]?.value,
        values
      };
    });
  }
);
