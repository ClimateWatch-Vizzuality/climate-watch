import { createSelector } from 'reselect';
import isArray from 'lodash/isArray';
import intersection from 'lodash/intersection';
import { europeSlug, europeanCountries } from 'app/data/european-countries';

const getIndicators = state =>
  (state.ndcs && state.ndcs.data.indicators) || null;
const getLSECountriesData = state =>
  (state.lse && state.lse.data && state.lse.data.countries) || null;
const getSlug = (state, { slug }) => slug || null;
const getAnswerLabel = (state, { answerLabel }) => answerLabel || null;
const getSource = (state, { source }) => source || null;
const getCountriesDocuments = state => state.countriesDocuments.data || null;

export const getTotalCountriesNumber = state =>
  (state.countries && state.countries.data.length) || null;

const getFirstNDCSubmittedIsos = createSelector(
  [getSource, getCountriesDocuments, getAnswerLabel],
  (source, countriesDocuments, answerLabel) => {
    if (!source || source !== 'countriesDocuments' || !countriesDocuments) {
      return null;
    }
    return Object.keys(countriesDocuments).filter(iso =>
      countriesDocuments[iso].some(
        doc => doc.slug === answerLabel && doc.submission_date
      )
    );
  }
);

const getLSEIsos = createSelector(
  [getSource, getLSECountriesData],
  (source, lse) => {
    if (!source || source !== 'lse' || !lse) return null;
    return lse;
  }
);

const getPositiveAnswerIsos = createSelector(
  [
    getIndicators,
    getSlug,
    getAnswerLabel,
    getFirstNDCSubmittedIsos,
    getLSEIsos
  ],
  (indicators, slug, answerLabel, firstNDCSubmittedIsos, lseIsos) => {
    if (firstNDCSubmittedIsos) return firstNDCSubmittedIsos;
    if (lseIsos) return lseIsos;
    if (!indicators || !slug || !answerLabel) return null;
    const indicator = indicators.find(i => i.slug === slug);
    if (!indicator) return null;
    const moreThanOneTrueAnswer = isArray(answerLabel);
    return Object.keys(indicator.locations).filter(k =>
      (moreThanOneTrueAnswer
        ? answerLabel.includes(indicator.locations[k].value)
        : indicator.locations[k].value === answerLabel)
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

    const europeanLocationIsos = Object.keys(
      emissionsIndicator.locations
    ).filter(iso => europeanCountries.includes(iso));

    const emissionPercentages = emissionsIndicator.locations;
    let summedPercentage = 0;
    positiveAnswerIsos.forEach(iso => {
      if (emissionPercentages[iso]) {
        // To avoid double counting in EUU
        if (iso === europeSlug) {
          const EUTotal = parseFloat(emissionPercentages[europeSlug].value);
          const europeanLocationIsosInAnswer = intersection(
            europeanLocationIsos,
            positiveAnswerIsos
          );
          const europeanLocationsValue = europeanLocationIsosInAnswer.reduce(
            (acc, i) => acc + parseFloat(emissionPercentages[i].value),
            0
          );
          summedPercentage += EUTotal - europeanLocationsValue;
        } else {
          summedPercentage += parseFloat(emissionPercentages[iso].value);
        }
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
