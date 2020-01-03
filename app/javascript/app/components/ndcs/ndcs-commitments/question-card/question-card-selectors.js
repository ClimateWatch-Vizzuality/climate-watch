import { createSelector } from 'reselect';

const getIndicators = state =>
  (state.ndcs && state.ndcs.data.indicators) || null;
const getSlug = (state, { slug }) => slug || null;
const getAnswerLabel = (state, { answerLabel }) => answerLabel || null;

export const getTotalCountriesNumber = state =>
  (state.countries && state.countries.data.length) || null;

export const getQuestionStats = createSelector(
  [getIndicators, getSlug, getAnswerLabel, getTotalCountriesNumber],
  (indicators, slug, answerLabel, maxPartiesNumber) => {
    if (!indicators || !slug || !answerLabel) return null;
    const indicator = indicators.find(i => i.slug === slug);
    if (!indicator) return null;
    const answerNumberLocations = Object.values(indicator.locations).filter(
      l => l.value === answerLabel
    );
    return {
      answerNumber: answerNumberLocations.length,
      maxPartiesNumber,
      emissionPercentage: 82
    };
  }
);
