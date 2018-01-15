import { createSelector } from 'reselect';
import { truncateDecimals } from 'utils/utils';

const getCountries = state => state.countries.data || null;
const getIso = state => state.iso;
const getSocioeconomicsData = state => state.socioeconomics;

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
  [getSocioeconomicsData],
  socioeconomicsData => {
    if (!socioeconomicsData) return null;
    return socioeconomicsData[socioeconomicsData.length - 1];
  }
);

export const getDescriptionText = createSelector(
  [getCountryDescription],
  description => {
    if (!description) return null;
    const gdpPerCapitaLocale =
      description.gdp_per_capita &&
      truncateDecimals(description.gdp_per_capita).toLocaleString();
    const populationLocale =
      description.population && description.population.toLocaleString();
    const populationGrowthLocale = (Math.round(
      description.population_growth * 100
    ) / 100).toLocaleString();

    let text = '';
    if (gdpPerCapitaLocale && description.gdp_per_capita_rank) {
      text += `GDP per capita (${description.year}) - USD
      ${gdpPerCapitaLocale} (ranked ${description.gdp_per_capita_rank} globally).
      <br/>`;
    }
    if (populationLocale && populationGrowthLocale) {
      text += `Population (${description.year}) - ${populationLocale}
      (${populationGrowthLocale}% annual growth)`;
    }
    return text;
  }
);

export default {
  getCountryName,
  getCountryDescription,
  getAnchorLinks
};
