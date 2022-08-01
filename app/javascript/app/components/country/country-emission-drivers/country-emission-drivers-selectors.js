/* eslint-disable no-confusing-arrow */
import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import pickBy from 'lodash/pickBy';
import sortBy from 'lodash/sortBy';
import qs from 'query-string';
import { CHART_NAMED_EXTENDED_COLORS } from 'app/styles/constants';

const getIso = state => state.iso || null;
export const getCountryIndicators = state =>
  state.countryProfileIndicators.data || null;
const getCountries = state => state.countriesData || null;

export const getMaximumCountries = createSelector([getCountries], countries =>
  countries ? countries.length : null
);
export const getLoading = state =>
  state.countriesData.loading ||
  state.countryProfileIndicators.loading ||
  !state.iso;

const getCountry = createSelector([getCountries, getIso], (countries, iso) => {
  if (!countries || !iso) return null;
  return countries.find(country => country.iso_code3 === iso);
});

export const getCountryName = createSelector(
  [getCountry],
  country => (country && country.wri_standard_name) || null
);

export const getQueryIsos = search => {
  if (!search) return null;
  const query = qs.parse(search);
  if (!query.locations) return null;
  return query.locations.split(',').map(val => {
    if (val) return val;
    return null;
  });
};

export const getHazards = createSelector(
  [getCountryIndicators],
  countryIndicators => {
    if (!countryIndicators || isEmpty(countryIndicators)) return null;
    return pickBy(countryIndicators, i => i.slug.startsWith('hazard'));
  }
);

export const getHazardsLegend = createSelector(
  [getHazards, getIso],
  (hazards, iso) => {
    if (!hazards) {
      return null;
    }
    const percentage = (value, total) => (value * 100) / total;
    const getValue = key => {
      const keyValues =
        hazards[key].values && hazards[key].values.find(v => v.iso === iso);
      return keyValues && +keyValues.value;
    };
    const totalValue = Object.keys(hazards).reduce((acc, key) => {
      const value = getValue(key);
      return acc + (value ? +value : 0);
    }, 0);
    const legendItems = Object.keys(hazards)
      .map((key, i) => ({
        id: hazards[key].slug,
        name: hazards[key].name,
        value: Math.round(percentage(getValue(key), totalValue) * 100) / 100,
        color: Object.values(CHART_NAMED_EXTENDED_COLORS)[i]
      }))
      .filter(i => i.value !== 0);

    return legendItems;
  }
);

export const getElectricityChart = createSelector(
  [getCountryIndicators, getIso],
  (countryIndicators, iso) => {
    if (!countryIndicators || !countryIndicators.electricity_consumption) {
      return null;
    }
    const { values } = countryIndicators.electricity_consumption;
    const countryValues = values.filter(v => v.location === iso);
    const config = {
      axes: {
        xBottom: { name: 'Year', unit: 'date', format: 'YYYY' },
        yLeft: {
          name: 'Emissions',
          unit: 'Electricity consumption (kWh, billions)',
          format: 'number'
        }
      },
      theme: {
        yElectricity: { stroke: '#228D94', fill: '#228D94' }
      },
      tooltip: {
        yElectricity: { label: 'Electricity' }
      },
      animation: false,
      columns: {
        x: [{ label: 'year', value: 'x' }],
        y: [{ label: 'Electricity', value: 'yElectricity' }]
      }
    };
    const plainValues = countryValues.map(v => v.value);
    const years = countryValues.map(v => v.year);
    const domain = {
      x: [Math.min(...years), Math.max(...years)],
      y: [Math.min(...plainValues), Math.max(...plainValues)]
    };
    const data = sortBy(
      countryValues.map(v => ({
        x: v.year,
        yElectricity: v.value
      })),
      'x'
    );
    return {
      config,
      data,
      domain
    };
  }
);

export const getSectionData = createSelector(
  [getCountryIndicators, getElectricityChart],
  (countryIndicators, electricityChart) => {
    const hasCountryIndicators = !isEmpty(countryIndicators);
    if (!countryIndicators || !hasCountryIndicators) return null;

    return {
      cards: {
        share_re: {
          slug: 'share_re',
          type: 'RANK',
          title: countryIndicators.share_re.name,
          data: [countryIndicators.share_re, countryIndicators.share_re_rank],
          metadata: countryIndicators.share_re.metadata_source
        },
        share_coal: {
          slug: 'share_coal',
          type: 'RANK',
          title: countryIndicators.share_coal.name,
          data: [
            countryIndicators.share_coal,
            countryIndicators.share_coal_rank
          ],
          metadata: countryIndicators.share_coal.metadata_source
        },
        food_intensity: {
          slug: 'food_intensity',
          type: 'RANK',
          title:
            countryIndicators.food_intensity &&
            countryIndicators.food_intensity.name,
          data: [
            countryIndicators.food_intensity,
            countryIndicators.food_intensity_rank
          ],
          metadata: countryIndicators.food_intensity.metadata_source
        },
        tree_cover_loss: {
          slug: 'tree_cover_loss',
          type: 'RANK',
          title:
            countryIndicators.tree_cover_loss &&
            countryIndicators.tree_cover_loss.name,
          data: [
            countryIndicators.tree_cover_loss,
            countryIndicators.tree_cover_loss_rank
          ],
          metadata: countryIndicators.tree_cover_loss.metadata_source
        }
      },
      electricity: {
        type: 'CHART',
        title: countryIndicators.electricity_consumption.name,
        slug: 'electricity_consumption',
        data: [
          electricityChart,
          countryIndicators.electricity_consumption_rank
        ],
        metadata: countryIndicators.electricity_consumption.metadata_source
      }
    };
  }
);
