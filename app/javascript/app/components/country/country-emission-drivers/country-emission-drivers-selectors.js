/* eslint-disable no-confusing-arrow */
import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import pickBy from 'lodash/pickBy';
import qs from 'query-string';
import { getLabels } from 'components/ndcs/shared/utils';
import { CHART_NAMED_EXTENDED_COLORS } from 'app/styles/constants';

const getIso = state => state.iso || null;
const getCountryIndicators = state =>
  state.countryProfileIndicators.data || null;
const getCountries = state => state.countriesData || null;

export const getMaximumCountries = createSelector([getCountries], countries =>
  countries ? countries.length : null
);

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

export const getHazardsLegend = createSelector([getHazards], hazards => {
  if (!hazards) {
    return null;
  }
  const percentage = (value, total) => (value * 100) / total;
  const getValue = key =>
    hazards[key].values &&
    hazards[key].values[0] &&
    +hazards[key].values[0].value;
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
});

export const getHazardsChart = createSelector(
  [getHazardsLegend, getHazards],
  (legend, hazards) => {
    if (!legend || !hazards) {
      return null;
    }

    const data = sortBy(
      legend.map(l => ({ name: l.name, value: +l.value })),
      'value'
    ).reverse();
    const config = {
      animation: true,
      innerRadius: 100,
      outerRadius: 120,
      hideLabel: true,
      hideLegend: true,
      innerHoverLabel: true,
      minAngle: 3,
      ...getLabels({ legend })
    };
    return {
      config,
      data
    };
  }
);

export const getSectionData = createSelector(
  [getCountryIndicators, getHazardsChart],
  (countryIndicators, hazards) => {
    const hasCountryIndicators = !isEmpty(countryIndicators);
    if (!countryIndicators || !hasCountryIndicators) return null;

    return {
      cards: {
        share_re: {
          slug: 'share_re',
          type: 'RANK',
          title: countryIndicators.share_re.name,
          data: [countryIndicators.share_re, countryIndicators.share_re_rank]
        },
        share_coal: {
          slug: 'share_coal',
          type: 'RANK',
          title: countryIndicators.share_coal.name,
          data: [
            countryIndicators.share_coal,
            countryIndicators.share_coal_rank
          ]
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
          ]
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
          ]
        }
      },
      electricity: {
        type: 'CHART',
        title: countryIndicators.electricity_consumption.name,
        slug: 'electricity_consumption',
        data: hazards
      }
    };
  }
);
