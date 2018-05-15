import { createSelector } from 'reselect';
import { truncateDecimals } from 'utils/utils';
import isEmpty from 'lodash/isEmpty';

const getLocations = state => state.locations || null;
const getSocioeconomicsData = state => state.socioeconomics.data || null;
export const getCountrySocioeconomics = createSelector(
  [getLocations, getSocioeconomicsData],
  (locations, socioeconomicsData) => {
    if (!locations || !locations.length || isEmpty(socioeconomicsData)) { return null; }
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

export default {
  getCountrySocioeconomics
};
