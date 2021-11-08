import { createSelector } from 'reselect';
import { INDICATOR_SLUGS } from 'data/constants';
import sortBy from 'lodash/sortBy';

const getIso = (state, props) => (props && props.iso) || null;
const getIndicators =
  (state => state.ndcs && state.ndcs.data && state.ndcs.data.indicators) ||
  null;

export const getEmissionsIndicator = createSelector(
  [getIndicators],
  indicators => {
    if (!indicators) return null;
    return indicators.find(i => i.slug === INDICATOR_SLUGS.emissions) || null;
  }
);

export const getEmissions = createSelector(
  [getIso, getEmissionsIndicator],
  (iso, indicator) => {
    if (!indicator || !iso) return null;
    const colors = ['#045480', '#0877B3', '#02A0CA', '#02B4D2', '#89DDEA'];
    const locations = Object.entries(indicator.locations).map(
      ([emissionsIso, values]) => ({
        iso: emissionsIso,
        percentage: parseFloat(values.value),
        ...(emissionsIso === iso ? { current: true } : {})
      })
    );
    return sortBy(locations, 'percentage')
      .reverse()
      .map((location, i) => ({
        ...location,
        color: colors[i] || '#cccdcf' // gray2 as others
      }));
  }
);
