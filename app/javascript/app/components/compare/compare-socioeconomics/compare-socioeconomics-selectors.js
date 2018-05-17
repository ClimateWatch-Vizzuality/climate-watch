import { createSelector } from 'reselect';
import { truncateDecimals } from 'utils/utils';
import isEmpty from 'lodash/isEmpty';

const getCountriesData = state => state.countriesData || null;
const getLocations = state => state.locations || null;
const getSocioeconomicsData = state => state.socioeconomics.data || null;
export const getCountrySocioeconomics = createSelector(
  [getLocations, getSocioeconomicsData],
  (locations, socioeconomicsData) => {
    if (!locations || !locations.length || isEmpty(socioeconomicsData)) {
      return null;
    }
    return locations.map(location => {
      const locationData = socioeconomicsData[location];
      if (!locationData) return null;
      const gdpPerCapitaLocale =
        locationData.gdp_per_capita &&
        truncateDecimals(locationData.gdp_per_capita, 0).toLocaleString();
      const populationLocale =
        locationData.population && locationData.population.toLocaleString();
      const populationGrowthLocale = (Math.round(
        locationData.population_growth * 100
      ) / 100).toLocaleString();

      return {
        gdpPerCapitaLocale,
        gdp_per_capita_rank: locationData.gdp_per_capita_rank,
        gdp_per_capita_year: locationData.gdp_per_capita_year,
        populationLocale,
        populationGrowthLocale,
        population_year: locationData.population_year
      };
    });
  }
);

export const getLocationNames = createSelector(
  [getLocations, getCountriesData],
  (locations, countries) => {
    if (!locations || !locations.length || !countries || !countries.length) { return null; }
    return locations.map(location => {
      const country = countries.find(c => location === c.iso_code3);
      return country.wri_standard_name || null;
    });
  }
);

export default {
  getCountrySocioeconomics,
  getLocationNames
};
