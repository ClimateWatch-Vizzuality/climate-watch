import { createSelector } from 'reselect';

const getIndicators = state =>
  (state.ndcs && state.ndcs.data.indicators) || null;
const getSlug = (state, { slug }) => slug || null;
const getAnswerLabel = (state, { answerLabel }) => answerLabel || null;

export const getTotalCountriesNumber = state =>
  (state.countries && state.countries.data.length) || null;

const getPositiveAnswerIsos = createSelector(
  [getIndicators, getSlug, getAnswerLabel],
  (indicators, slug, answerLabel) => {
    if (!indicators || !slug || !answerLabel) return null;
    const indicator = indicators.find(i => i.slug === slug);
    if (!indicator) return null;
    return Object.keys(indicator.locations).filter(
      k => indicator.locations[k].value === answerLabel
    );
  }
);

export const getEmissionsPercentage = createSelector(
  [getIndicators, getPositiveAnswerIsos],
  (indicators, positiveAnswerIsos) => {
    if (!indicators || !positiveAnswerIsos) {
      return null;
    }
    const emissionsIndicator = indicators.find(i => i.slug === 'ndce_ghg');
    if (!emissionsIndicator) return null;

    const emissionPercentages = emissionsIndicator.locations;
    let summedPercentage = 0;
    positiveAnswerIsos.forEach(iso => {
      if (emissionPercentages[iso]) {
        summedPercentage += parseFloat(emissionPercentages[iso].value);
      }
    });
    return summedPercentage;
  }
);

export const getQuestionStats = createSelector(
  [getTotalCountriesNumber, getPositiveAnswerIsos, getEmissionsPercentage],
  (maxPartiesNumber, positiveAnswerIsos, emissionPercentage) => {
    if (!positiveAnswerIsos) return null;
    return {
      answerNumber: positiveAnswerIsos.length,
      maxPartiesNumber,
      emissionPercentage
    };
  }
);
