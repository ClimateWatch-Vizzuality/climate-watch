import { createSelector } from 'reselect';
import sortBy from 'lodash/sortBy';

import { COMPARISON_2025_INDICATORS_ORDER, COMPARISON_2025_INDICATORS_LABELS } from 'data/constants';

const getIso = state => state.iso || null;
const getCountries = state => state.countries.data || null;
const getPreviousComparisonIndicators = state =>
  state.ndcsPreviousComparison && state.ndcsPreviousComparison.data;
const get2025ComparisonIndicators = state =>
  state.ndcs2025Comparison && state.ndcs2025Comparison.data;

const parseComparisonIndicators = (iso, indicators) => {
  if (!indicators) return null;
  const parsedIndicators = indicators
    .map(indicator => ({
      name: indicator?.name,
      value: indicator.locations[iso]?.value
    }))
    ?.filter(({ value }) => !!value);
  return parsedIndicators.length ? parsedIndicators : null;
};

const getCountry = createSelector([getCountries, getIso], (countries, iso) => {
  if (!countries || !iso) return null;
  return countries.find(country => country.iso_code3 === iso);
});

const getParsed2025Indicators = createSelector(
  [get2025ComparisonIndicators, getIso],
  (indicators, iso) => {
    // Unlike the previous indicators, there is no guarantee that these will
    // come ordered for display from the API. We'll order them first.
    const orderedIndicators = sortBy(indicators, indicator =>
      COMPARISON_2025_INDICATORS_ORDER.indexOf(indicator?.slug)
    );
    // We are overriding labels on the 2025 indicators. We'll re-label now
    // them before parsing them, as the parsing function is generic.
    const labeledIndicators = orderedIndicators.map((indicator) => ({
      ...indicator,
      name: COMPARISON_2025_INDICATORS_LABELS[indicator?.slug] || indicator?.slug
    }));
    return parseComparisonIndicators(iso, labeledIndicators);
  }
);

const getParsedPreviousIndicators = createSelector(
  [getPreviousComparisonIndicators, getIso],
  (indicators, iso) => parseComparisonIndicators(iso, indicators)
);

export const getCountryName = createSelector(
  [getCountry],
  country => (country && country.wri_standard_name) || null
);

export const getComparisonIndicators = createSelector(
  [getParsed2025Indicators, getParsedPreviousIndicators],
  (parsed2025Indicators, parsedPreviousIndicators) =>
    parsed2025Indicators ?? parsedPreviousIndicators
);
