/* eslint-disable no-confusing-arrow */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createSelector } from 'reselect';
import { truncateDecimals } from 'utils/utils';
import { INDICATOR_SLUGS } from 'data/constants';
import isEmpty from 'lodash/isEmpty';
import styles from './country-header-styles.scss';

const getCountries = state => state.countries.data || null;
const getAdaptationData = state => state.adaptations.data || null;
const getIso = state => state.iso;
const getSocioeconomicsData = state => state.socioeconomics;
const getIndicators =
  (state => state.ndcs && state.ndcs.data && state.ndcs.data.indicators) ||
  null;

const getMeta = state =>
  (state.ghgEmissionsMeta && state.ghgEmissionsMeta.meta) || null;
const getData = state => (state.emissions && state.emissions.data) || null;

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

export const getEmissionsIndicator = createSelector(
  [getIndicators],
  indicators => {
    if (!indicators) return null;
    return indicators.find(i => i.slug === INDICATOR_SLUGS.emissions) || null;
  }
);

export const getEmissionProviderFilters = createSelector(
  [getMeta, getIso],
  (meta, iso) => {
    if (!meta || !iso || isEmpty(meta)) return null;
    const allGhgGas = meta.gas.find(g => g.label === 'All GHG');
    const CaitSource = meta.data_source.find(g => g.name === 'CAIT');
    const TotalExcludingLucfSector = meta.sector.find(
      g => g.label === 'Total including LUCF'
    );
    return {
      gas: allGhgGas && allGhgGas.value,
      location: iso,
      source: CaitSource && CaitSource.value,
      sector: TotalExcludingLucfSector && TotalExcludingLucfSector.value
    };
  }
);

export const getDescriptionText = createSelector(
  [getIso, getEmissionsIndicator, getCountryName, getData],
  (iso, indicator, countryName, data) => {
    if (!indicator || !iso || !data) return null;
    const isoData = indicator.locations[iso];
    const emissionsData = data[0];
    const { year: lastYear, value: emission } = emissionsData
      ? emissionsData.emissions[emissionsData.emissions.length - 1]
      : {};
    const percentage = isoData && isoData.value;
    return ReactDOMServer.renderToString(
      <div className={styles.introDescription}>
        In {lastYear}, {countryName} emmited
        <span className={styles.bold}>
          {' '}
          {emission && Math.round(emission * 100) / 100} million tonnes
        </span>{' '}
        of CO2 equivalent representing{' '}
        <span className={styles.bold}>{percentage} of global emissions</span>
      </div>
    );
  }
);

export const getLegacyDescriptionText = createSelector(
  [getSocioeconomicsData],
  socioeconomicsData => {
    if (!socioeconomicsData) return null;
    const gdpPerCapitaLocale =
      socioeconomicsData.gdp_per_capita &&
      truncateDecimals(socioeconomicsData.gdp_per_capita, 0).toLocaleString();
    const populationLocale =
      socioeconomicsData.population &&
      socioeconomicsData.population.toLocaleString();
    const populationGrowthLocale = (
      Math.round(socioeconomicsData.population_growth * 100) / 100
    ).toLocaleString();

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
    return text;
  }
);

export const getMaximumCountries = createSelector([getCountries], countries =>
  countries ? countries.length : null
);
export const getCardData = createSelector(
  [
    getSocioeconomicsData,
    getData,
    getMaximumCountries,
    getIso,
    getAdaptationData
  ],
  (socioeconomicsData, data, countriesNumber, iso, adaptationData) => {
    if (
      !socioeconomicsData ||
      !socioeconomicsData.data ||
      !socioeconomicsData.data[iso] ||
      !data ||
      !countriesNumber
    ) {
      // Just as a placeholder
      return [
        {
          slug: 'total-emissions'
        },
        {
          slug: 'emissions-per-capita'
        },
        {
          slug: 'emissions-per-gdp'
        },
        {
          slug: 'vulnerability'
        },
        {
          slug: 'population'
        },
        {
          slug: 'gdp-per-capita'
        }
      ];
    }

    const {
      population,
      gdp,
      gdp_per_capita,
      gdp_per_capita_rank,
      population_rank
    } = socioeconomicsData.data[iso];
    const vulnerabilityIndicator =
      adaptationData &&
      !isEmpty(adaptationData) &&
      adaptationData.find(a => a.slug === 'vulnerability');
    const countryVulnerability =
      vulnerabilityIndicator &&
      vulnerabilityIndicator.values &&
      vulnerabilityIndicator.values.find(v => v.location === iso);
    const { value: vulnerability, rank } = countryVulnerability || {};
    const gdpPerCapitaLocale = truncateDecimals(
      gdp_per_capita,
      0
    ).toLocaleString();
    const gdpPerCapitaRank =
      gdp_per_capita_rank && parseInt(gdp_per_capita_rank, 10);
    const emissionsData = data[0];
    const populationRank = population_rank && parseInt(population_rank, 10);
    const { value: emission } = emissionsData
      ? emissionsData.emissions[emissionsData.emissions.length - 1]
      : {};
    const temporaryWorldPosition = 1; // TODO
    const getWorldPositionPercentage = position =>
      (position * 100) / countriesNumber;
    return [
      {
        slug: 'total-emissions',
        title: 'Total Emissions (MtCO2e)',
        value: emission && Math.round(emission * 100) / 100,
        worldPositionPercentage: getWorldPositionPercentage(
          temporaryWorldPosition
        )
      },
      {
        slug: 'emissions-per-capita',
        title: 'Emissions per Capita (tCO2e/person)',
        value:
          emission &&
          population &&
          Math.round(((emission * 1000_000) / population) * 100) / 100,
        worldPositionPercentage: getWorldPositionPercentage(
          temporaryWorldPosition
        )
      },
      {
        slug: 'emissions-per-gdp',
        title: 'Emissions per GDP (CO2e/M$ GDP)',
        value:
          emission &&
          Math.round(((emission * 1000_000) / (gdp / 1000_000)) * 100) / 100,
        worldPositionPercentage: getWorldPositionPercentage(
          temporaryWorldPosition
        )
      },
      {
        slug: 'vulnerability',
        title: 'Vulnerability',
        value: countryVulnerability && Math.round(vulnerability * 100) / 100,
        worldPositionPercentage:
          countryVulnerability &&
          rank &&
          getWorldPositionPercentage(rank.absolute)
      },
      {
        slug: 'population',
        title: 'Population (millions)',
        value: Math.round((population / 1000_000) * 100) / 100,
        worldPositionPercentage: getWorldPositionPercentage(populationRank)
      },
      {
        slug: 'gdp-per-capita',
        title: 'GDP per capita (USD)',
        value: gdpPerCapitaLocale,
        worldPositionPercentage: getWorldPositionPercentage(gdpPerCapitaRank)
      }
    ];
  }
);
