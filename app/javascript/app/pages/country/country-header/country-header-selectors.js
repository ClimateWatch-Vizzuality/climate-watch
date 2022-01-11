/* eslint-disable no-confusing-arrow */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createSelector } from 'reselect';
import { truncateDecimals } from 'utils/utils';
import { INDICATOR_SLUGS } from 'data/constants';
import isEmpty from 'lodash/isEmpty';
import styles from './country-header-styles.scss';

const getCountries = state => state.countries.data || null;
const getIso = state => state.iso;
const getSocioeconomicsData = state => state.socioeconomics;
const getIndicators =
  (state => state.ndcs && state.ndcs.data && state.ndcs.data.indicators) ||
  null;

const getCountryIndicators = state =>
  state.countryProfileIndicators.data || null;

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
  [
    getIso,
    getEmissionsIndicator,
    getCountryName,
    getData,
    getCountryIndicators
  ],
  (iso, indicator, countryName, data, countryIndicators) => {
    if (!indicator || !countryIndicators || !iso || !data) return null;
    const isoData = indicator.locations[iso];
    const emissionsData = data[0];
    const emissionIndicator = countryIndicators.emissions_total;
    const emissionValue =
      emissionIndicator &&
      emissionIndicator.values[0] &&
      emissionIndicator.values[0].value;
    const { year: lastYear } = emissionsData
      ? emissionsData.emissions[emissionsData.emissions.length - 1]
      : {};
    const percentage = isoData && isoData.value;
    return ReactDOMServer.renderToString(
      <div className={styles.introDescription}>
        In {lastYear}, {countryName} emmited
        <span className={styles.bold}>
          {' '}
          {emissionValue && Math.round(emissionValue * 100) / 100} million
          tonnes
        </span>{' '}
        of CO2 equivalent representing{' '}
        <span className={styles.bold}>{percentage} of global emissions</span>
      </div>
    );
  }
);

export const getLegacyDescriptionText = createSelector(
  [getSocioeconomicsData, getIso],
  (socioeconomicsData, iso) => {
    if (!socioeconomicsData || !socioeconomicsData.data) return null;
    const { data } = socioeconomicsData;
    const isoData = data[iso];
    if (!isoData) return null;
    const gdpPerCapitaLocale =
      isoData.gdp_per_capita &&
      truncateDecimals(isoData.gdp_per_capita, 0).toLocaleString();
    const populationLocale =
      isoData.population && isoData.population.toLocaleString();
    const populationGrowthLocale = (
      Math.round(isoData.population_growth * 100) / 100
    ).toLocaleString();

    let text = '';
    if (gdpPerCapitaLocale && isoData.gdp_per_capita_rank) {
      text += `GDP per capita (${isoData.gdp_per_capita_year}) - USD
      ${gdpPerCapitaLocale} (ranked ${isoData.gdp_per_capita_rank} globally)
      <br/>`;
    }
    if (populationLocale && populationGrowthLocale) {
      text += `Population (${isoData.population_year}) - ${populationLocale}
      (${populationGrowthLocale}% annual growth)`;
    }
    return text;
  }
);

export const getMaximumCountries = createSelector([getCountries], countries =>
  countries ? countries.length : null
);
export const getCardData = createSelector(
  [getCountryIndicators, getMaximumCountries],
  (countryIndicators, maximumCountries) => {
    const placeholder = [
      {
        slug: 'emissions_total'
      },
      {
        slug: 'emissions_capita'
      },
      {
        slug: 'emissions_gdp'
      },
      {
        slug: 'vulnerability'
      },
      {
        slug: 'population',
        decimals: 6
      },
      {
        slug: 'gdp_capita'
      }
    ];

    if (!countryIndicators) {
      return placeholder;
    }

    return placeholder.map(p => {
      const countryIndicator = countryIndicators[p.slug];
      const rankCountryIndicator = countryIndicators[`${p.slug}_rank`];

      if (!countryIndicator || !rankCountryIndicator) {
        return { slug: p.slug };
      }
      let value =
        countryIndicator.values[0] && countryIndicator.values[0].value;

      if (p.decimals) {
        value /= 10 ** p.decimals;
      }
      const rankValue =
        rankCountryIndicator.values[0] && rankCountryIndicator.values[0].value;
      return {
        slug: p.slug,
        title: countryIndicator.name,
        value: (Math.round(value * 100) / 100).toLocaleString(),
        worldPositionPercentage:
          rankValue && (rankValue * 100) / maximumCountries
      };
    });
  }
);
