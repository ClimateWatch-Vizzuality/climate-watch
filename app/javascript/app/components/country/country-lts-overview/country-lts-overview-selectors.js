import { createSelector } from 'reselect';

const getIndicatorsContentOverview = state =>
  (state.ltsContentOverview.data && state.ltsContentOverview.data.locations) ||
  null;
const getIso = (state, { iso }) => iso || null;

const getIndicators = createSelector(
  [getIndicatorsContentOverview, getIso],
  (ltsContentOverviewLocations, iso) => {
    if (!ltsContentOverviewLocations || !iso) return null;
    return (
      (ltsContentOverviewLocations[iso] &&
        ltsContentOverviewLocations[iso].values) ||
      null
    );
  }
);

export const getCardsData = createSelector(
  [getIndicators, getIso],
  (indicators, iso) => {
    if (!indicators || !indicators.length || !iso) return null;
    return indicators.reduce((acc, nextIndicator) => {
      const { slug, name, value } = nextIndicator;
      return {
        ...acc,
        [slug]: {
          title: name,
          value
        }
      };
    }, {});
  }
);

export default {
  getCardsData
};
