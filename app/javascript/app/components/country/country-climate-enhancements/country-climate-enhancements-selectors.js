import { createSelector } from 'reselect';

const getIso = state => state.iso || null;
const getCountries = state => state.countries.data || null;
const getPreviousComparisonIndicators = state =>
  state.ndcsPreviousComparison && state.ndcsPreviousComparison.data;
const get2025ComparisonIndicators = state =>
  state.ndcs2025Comparison && state.ndcs2025Comparison.data;

const parseComparisonIndicators = (iso, indicators) => {
  if (!indicators) return null;
  const parsedIndicators = indicators.map(indicator => ({
    name: indicator?.name,
    value: indicator.locations[iso]?.value
  }))?.filter(({ value }) => !!value);
  return parsedIndicators.length ? parsedIndicators : null;
};

const getCountry = createSelector([getCountries, getIso], (countries, iso) => {
  if (!countries || !iso) return null;
  return countries.find(country => country.iso_code3 === iso);
});

const getParsed2025Indicators = createSelector(
  [get2025ComparisonIndicators, getIso],
  (indicators, iso) => parseComparisonIndicators(iso, indicators)
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
