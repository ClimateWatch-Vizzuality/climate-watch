import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const getCountries = state => state.countries.data;
const getIso = state => state.iso;
const getSocioeconomics = state =>
  (isEmpty(state.socioeconomics.data) ? null : state.socioeconomics.data);

const getCountryByIso = (countries = [], iso) =>
  countries.find(country => country.iso_code3 === iso);

export const getCountry = createSelector(
  [getCountries, getIso],
  getCountryByIso
);

export const getCountryName = createSelector(
  [getCountry],
  (country = {}) => country.wri_standard_name || ''
);

export const getAnchorLinks = createSelector(
  [
    state => state.route.sections || [],
    state => state.iso,
    state => state.location.search
  ],
  (sections, iso, search) =>
    sections.filter(section => section.anchor).map(section => ({
      label: section.label,
      path: `/countries/${iso}`,
      hash: section.hash,
      search
    }))
);

export const getCountryDescription = createSelector(
  [getSocioeconomics, getIso],
  (socioeconomics, iso) => {
    const countrySocioeconomics = socioeconomics && socioeconomics[iso];
    if (!countrySocioeconomics) return null;
    return countrySocioeconomics[countrySocioeconomics.length - 1];
  }
);

export const getDescriptionText = createSelector(
  [getCountryDescription],
  description => {
    if (!description) return null;
    return `GDP per capita (${description.year}) - USD
      ${description.gdp_per_capita} (${description.gdp_per_capita_rank}% of the global average.
      <br/>
      Population (${description.year}) - ${description.population} million
      (${description.population_growth}% annual growth)`;
  }
);

export default {
  getCountryName,
  getCountryDescription,
  getAnchorLinks
};
