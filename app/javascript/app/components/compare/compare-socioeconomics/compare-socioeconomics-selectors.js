import { createSelector } from 'reselect';
import { truncateDecimals } from 'utils/utils';

const getSocioeconomicsData = state => state.socioeconomics || null;
export const getCountrySocioeconomics = createSelector(
  [getSocioeconomicsData],
  socioeconomicsData => {
    if (!socioeconomicsData) return null;
    const gdpPerCapitaLocale =
      socioeconomicsData.gdp_per_capita &&
      truncateDecimals(socioeconomicsData.gdp_per_capita, 0).toLocaleString();
    const populationLocale =
      socioeconomicsData.population &&
      socioeconomicsData.population.toLocaleString();
    const populationGrowthLocale = (Math.round(
      socioeconomicsData.population_growth * 100
    ) / 100).toLocaleString();

    let text = '';
    if (gdpPerCapitaLocale && socioeconomicsData.gdp_per_capita_rank) {
      text += `GDP per capita (${socioeconomicsData.gdp_per_capita_year}) - USD
      ${gdpPerCapitaLocale} (ranked ${socioeconomicsData.gdp_per_capita_rank} globally)
      <br/>`;
    }
    if (populationLocale && populationGrowthLocale) {
      text += `Population (${socioeconomicsData.population_year}) - ${populationLocale}
      (${populationGrowthLocale}% annual growth)`;
    }
    return [text];
  }
);

export default {
  getCountrySocioeconomics
};
